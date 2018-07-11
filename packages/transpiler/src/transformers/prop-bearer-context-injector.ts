/*
 * Checks if class is decorated with @Component decorator
 * and injects the `@Prop({ context: 'bearer' }) bearerContext: any` into class definition
 * 
 */
import * as ts from 'typescript'

import decorator from './decorator-helpers'
import bearer from './bearer'

type TransformerOptions = {
  verbose?: true
}

export default function ComponentTransformer({
  verbose
}: TransformerOptions = {}): ts.TransformerFactory<ts.SourceFile> {
  return transformContext => {
    function visit(node: ts.Node): ts.VisitResult<ts.Node> {
      switch (node.kind) {
        case ts.SyntaxKind.ClassDeclaration: {
          if (
            decorator.classDecoratedWithName(
              node as ts.ClassDeclaration,
              'Component'
            )
          ) {
            return ts.visitEachChild(
              bearer.addBearerContextProp(node as ts.ClassDeclaration),
              visit,
              transformContext
            )
          } else {
            return ts.visitEachChild(node, visit, transformContext)
          }
        }
      }
      return ts.visitEachChild(node, visit, transformContext)
    }

    return tsSourceFile => {
      return visit(tsSourceFile) as ts.SourceFile
    }
  }
}
