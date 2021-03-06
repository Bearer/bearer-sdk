import * as ts from 'typescript'
import { JsonSchemaGenerator } from 'typescript-json-schema'

import { Component, Decorators } from '../constants'
import { hasDecoratorNamed } from '../helpers/decorator-helpers'
import { TComponentInputDefinition, TComponentOutputDefinition, TOuputFormat, TransformerOptions } from '../types'

import { eventName } from './event-name-scoping'

const UNSPECIFIED = 'unspecified'
import debug from '../logger'
const logger = debug.extend('gatherMetadata')

export default function gatherMetadata({
  metadata,
  generator
}: TransformerOptions & { generator: JsonSchemaGenerator }): ts.TransformerFactory<ts.SourceFile> {
  function propAsInput(tsProp: ts.PropertyDeclaration): TComponentInputDefinition {
    return {
      name: (tsProp.name as ts.Identifier).escapedText.toString(),
      type: tsProp.type.kind === ts.SyntaxKind.NumberKeyword ? 'number' : 'string',
      default: tsProp.initializer ? (tsProp.initializer as ts.Expression).getText() : undefined
    }
  }

  function getDefinition(type: ts.TypeNode): TOuputFormat {
    switch (type.kind) {
      case ts.SyntaxKind.TypeReference:
        try {
          return generator.getSchemaForSymbol(type.getText()) as any
        } catch (e) {
          // TODO: re-use type reference
          debug.extend('transpiler:gather-input-output-metadata')(e.toString())
          return { type: 'any' }
        }
      case ts.SyntaxKind.TypeLiteral: {
        const typeNode = type as ts.TypeLiteralNode
        return {
          type: 'object',
          properties: {
            ...typeNode.members.reduce((acc, m) => {
              const member = m as ts.PropertySignature
              const name = (member.name as ts.Identifier).escapedText.toString()
              return {
                ...acc,
                [name]: {
                  name,
                  description: name,
                  required: !member.questionToken,
                  schema: getDefinition(member.type)
                }
              }
            }, {})
          }
        }
      }
      case ts.SyntaxKind.NumberKeyword:
        return { type: 'number' }
      case ts.SyntaxKind.BooleanKeyword:
        return { type: 'boolean' }
      case ts.SyntaxKind.StringKeyword:
        return { type: 'string' }
      default: {
        return { type: 'object' } as any
      }
    }
  }

  function propInitializerAsJson(tsType: ts.TypeReferenceNode): TOuputFormat {
    if (!tsType || !tsType.typeArguments || !Boolean(tsType.typeArguments.length) || !generator) {
      return UNSPECIFIED
    }
    const typeArgument = tsType.typeArguments[0]

    return getDefinition(typeArgument)
  }

  // retrieven event name from call arguments or take prop name
  function eventAsOutput(tsProp: ts.PropertyDeclaration): TComponentOutputDefinition {
    return {
      name: (tsProp.name as ts.Identifier).escapedText.toString(),
      eventName: eventName((tsProp.name as ts.Identifier).escapedText.toString()),
      payloadFormat: propInitializerAsJson(tsProp.type as ts.TypeReferenceNode)
    }
  }

  function collectInputs(tsClass: ts.ClassDeclaration): TComponentInputDefinition[] {
    return tsClass.members
      .filter(member => ts.isPropertyDeclaration(member) && hasDecoratorNamed(member, Decorators.Prop))
      .map(propAsInput)
      .filter(prop => prop.name !== Component.bearerContext)
  }

  function collectOutputs(tsClass: ts.ClassDeclaration): TComponentOutputDefinition[] {
    return tsClass.members
      .filter(member => ts.isPropertyDeclaration(member) && hasDecoratorNamed(member, Decorators.Event))
      .map(eventAsOutput)
  }

  return _transformContext => {
    return tsSourceFile => {
      logger('processing %s', tsSourceFile.fileName)
      function visit(node: ts.Node): ts.Node {
        // Found Component
        logger('processing %s', tsSourceFile.fileName)
        if (ts.isClassDeclaration(node) && hasDecoratorNamed(node, Decorators.Component)) {
          const component = metadata.findComponentFrom(tsSourceFile)
          if (component && component.isRoot) {
            metadata.registerComponent({
              ...component,
              inputs: collectInputs(node),
              outputs: collectOutputs(node)
            })
          }
          return node
        }
        return ts.visitEachChild(node, visit, _transformContext)
      }
      return ts.visitEachChild(tsSourceFile, visit, _transformContext)
    }
  }
}
