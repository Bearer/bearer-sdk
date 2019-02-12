/*
 * Checks if class is decorated with @Component decorator
 * and injects the `@Prop() SCENARIO_ID: string;` into class definition
 *
 */
import * as ts from 'typescript'

import { Decorators, Env } from '../constants'
import { hasDecoratorNamed } from '../helpers/decorator-helpers'
import { TransformerOptions } from '../types'

import bearer from './bearer'

export function shouldProcessFile(tsSourceFile: ts.SourceFile): boolean {
  if (tsSourceFile.isDeclarationFile) {
    return false
  }
  return ts.forEachChild<boolean>(tsSourceFile, shouldInject)
}

export function shouldInject(node: ts.Node): boolean {
  return ts.isClassDeclaration(node) && hasDecoratorNamed(node, Decorators.Component)
}

export function retrieveScenarioId(): string {
  return process.env[Env.BEARER_SCENARIO_ID]
}
export default function componentTransformer({  }: TransformerOptions = {}): ts.TransformerFactory<ts.SourceFile> {
  return transformContext => {
    const scenarioId = retrieveScenarioId()

    function visit(node: ts.Node): ts.VisitResult<ts.Node> {
      // TODO: filter components which really need it
      if (shouldInject(node)) {
        return ts.visitEachChild(
          bearer.addBearerScenarioIdAccessor(node as ts.ClassDeclaration, scenarioId),
          visit,
          transformContext
        )
      }
      return ts.visitEachChild(node, visit, transformContext)
    }

    if (!scenarioId) {
      console.warn('[BEARER]', 'No scenario ID provided. Skipping scenario ID injection')
    }

    return tsSourceFile => {
      if (!scenarioId || !shouldProcessFile(tsSourceFile)) {
        return tsSourceFile
      }
      return visit(tsSourceFile) as ts.SourceFile
    }
  }
}
