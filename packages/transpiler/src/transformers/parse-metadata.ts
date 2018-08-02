import * as ts from 'typescript'
import * as Case from 'case'
import { TransformerOptions } from '../types'
import { Decorators } from './constants'
import { hasDecoratorNamed, getExpressionFromDecorator, getDecoratorNamed } from './decorator-helpers'

export default function ParseMetadata({ metadata }: TransformerOptions = {}): ts.TransformerFactory<ts.SourceFile> {
  return _transformContext => {
    function visit(node: ts.Node): ts.Node {
      // Found Component
      if (ts.isClassDeclaration(node) && hasDecoratorNamed(node, Decorators.Component)) {
        const component = getDecoratorNamed(node, Decorators.Component)
        const tag = getExpressionFromDecorator<ts.StringLiteral>(component, 'tag')
        metadata.components.push({
          isRoot: false,
          initialTagName: tag ? tag.text : '',
          finalTagName: tag ? tag.text : ''
        })
        return node
      }

      // Found RootComponent
      if (ts.isClassDeclaration(node) && hasDecoratorNamed(node, Decorators.RootComponent)) {
        const component = getDecoratorNamed(node, Decorators.RootComponent)
        const nameExpression = getExpressionFromDecorator<ts.StringLiteral>(component, 'name')
        const name = nameExpression ? nameExpression.text : ''
        const groupExpression = getExpressionFromDecorator<ts.StringLiteral>(component, 'group')
        const group = groupExpression ? groupExpression.text : ''
        const tag = [Case.kebab(group), name].join('-')
        metadata.components.push({
          isRoot: true,
          initialTagName: tag,
          finalTagName: tag
        })
        return node
      }
      return node
    }
    return tsSourceFile => {
      return ts.visitEachChild(tsSourceFile, visit, _transformContext)
    }
  }
}
