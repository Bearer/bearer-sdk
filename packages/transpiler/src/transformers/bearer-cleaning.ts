/*
 * Transformer boilerplate
 */
import * as ts from 'typescript'

import { Decorators, Types } from '../constants'
import { hasDecoratorNamed } from '../helpers/decorator-helpers'
import { getNodeName } from '../helpers/node-helpers'
import { TransformerOptions } from '../types'
import debug from '../logger'

const logger = debug.extend('cleaning')

const filteredImports = new Set([Decorators.Input, Decorators.Output, Decorators.RootComponent].map(v => v.toString()))
const renamedImport = { [Decorators.Function]: Decorators.BackendFunction }

export default function bearerCleaning(_options: TransformerOptions = {}): ts.TransformerFactory<ts.SourceFile> {
  return _transformContext => {
    function visit(tsNode: ts.Node): ts.VisitResult<ts.Node> {
      // returning null will remove the node
      switch (tsNode.kind) {
        case ts.SyntaxKind.PropertyDeclaration: {
          const prop = tsNode as ts.PropertyDeclaration
          if (hasDecoratorNamed(prop, Decorators.Input) || hasDecoratorNamed(prop, Decorators.Output)) {
            return null
          }
          if (hasDecoratorNamed(prop, Decorators.Event)) {
            return removeEventEmitterType(prop)
          }
          break
        }

        case ts.SyntaxKind.ImportSpecifier: {
          const importSpecifier = tsNode as ts.ImportSpecifier
          const name = getNodeName(importSpecifier)
          if (filteredImports.has(name)) {
            return null
          }
          if (renamedImport[name]) {
            // return ts.createIdentifier(renamedImport[name])
            return ts.createImportSpecifier(undefined, ts.createIdentifier(renamedImport[name]))
          }
          break
        }
        default:
      }
      return ts.visitEachChild(tsNode, visit, _transformContext)
    }

    return tsSourceFile => {
      logger('processing %s', tsSourceFile.fileName)
      return ts.visitEachChild(tsSourceFile, visit, _transformContext)
    }
  }
}

function removeEventEmitterType(property: ts.PropertyDeclaration): ts.PropertyDeclaration {
  if (!property.type) {
    return property
  }
  return ts.updateProperty(
    property,
    property.decorators,
    property.modifiers,
    property.name,
    property.questionToken,
    ts.createTypeReferenceNode(Types.EventEmitter, undefined),
    property.initializer
  )
}
