import * as ts from 'typescript'
import * as Case from 'case'
import { Decorators } from './constants'
import { hasDecoratorNamed, decoratorNamed, getExpressionFromDecorator } from './decorator-helpers'
import { TransformerOptions } from '../types'

export default function RootComponentTransformer({  }: TransformerOptions = {}): ts.TransformerFactory<ts.SourceFile> {
  return _transformContext => {
    function visit(node: ts.Node): ts.Node {
      if (ts.isClassDeclaration(node) && hasDecoratorNamed(node, Decorators.RootComponent)) {
        const decorators = node.decorators.map(decorator => {
          if (decoratorNamed(decorator, Decorators.RootComponent)) {
            const nameExpression = getExpressionFromDecorator<ts.StringLiteral>(decorator, 'name')
            const name = nameExpression ? nameExpression.text : ''
            const groupExpression = getExpressionFromDecorator<ts.StringLiteral>(decorator, 'group')
            const group = groupExpression ? groupExpression.text : ''
            const tagComponent = [Case.kebab(group), name].join('-')
            const cssFileName = Case.pascal(group)
            return ts.updateDecorator(
              decorator,
              ts.createCall(ts.createIdentifier(Decorators.Component), undefined, [
                ts.createObjectLiteral(
                  [
                    ts.createPropertyAssignment('tag', ts.createStringLiteral(tagComponent)),
                    ts.createPropertyAssignment('styleUrl', ts.createStringLiteral(cssFileName + '.css')),
                    ts.createPropertyAssignment('shadow', ts.createTrue())
                  ],
                  true
                )
              ])
            )
          }
          return decorator
        })

        return ts.updateClassDeclaration(
          node,
          decorators,
          node.modifiers,
          node.name,
          node.typeParameters,
          node.heritageClauses,
          node.members
        )
      }
      return node
    }
    return tsSourceFile => {
      return ts.visitEachChild(tsSourceFile, visit, _transformContext)
    }
  }
}
