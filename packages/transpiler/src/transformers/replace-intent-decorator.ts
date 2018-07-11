/*
 * Checks if class is decorated with @Component decorator
 * and injects the `@Prop() BEARER_ID: string;` into class definition
 * 
 */
import * as ts from 'typescript'
import decorator from './decorator-helpers'
import bearer from './bearer'

type TransformerOptions = {
  verbose?: true
}

function appendConstructor(node: ts.ClassDeclaration): ts.Node {
  if (classHasConstructor(node)) {
    return node
  }
  return ts.updateClassDeclaration(
    node,
    node.decorators,
    node.modifiers,
    node.name,
    node.typeParameters,
    node.heritageClauses,
    [
      ...node.members,
      ts.createConstructor(
        /* constructors */ undefined,
        /* modifiers */ undefined,
        /* parameters */ undefined,
        ts.createBlock([])
      )
    ]
  )
}

function removeIntentDecoratorFromClass(node: ts.ClassDeclaration): ts.Node {
  return ts.updateClassDeclaration(
    node,
    node.decorators,
    node.modifiers,
    node.name,
    node.typeParameters,
    node.heritageClauses,
    node.members.filter(
      member =>
        ts.isDecorator(member) &&
        decorator.name(member as ts.Decorator) === 'Intent'
    )
  )
}

function classHasConstructor(node: ts.Node): boolean {
  let has = false
  function visit(node: ts.Node) {
    if (ts.isConstructorTypeNode(node)) {
      has = true
    }
    ts.forEachChild(node, visit)
  }
  visit(node)
  return has
}

export default function ComponentTransformer({
  verbose
}: TransformerOptions = {}): ts.TransformerFactory<ts.SourceFile> {
  return transformContext => {
    function injectConstructorIfNeeded(node: ts.Node): ts.VisitResult<ts.Node> {
      switch (node.kind) {
        case ts.SyntaxKind.ClassDeclaration: {
          return appendConstructor(node as ts.ClassDeclaration)
        }
      }
      return ts.visitEachChild(
        node,
        injectConstructorIfNeeded,
        transformContext
      )
    }

    function visitRemoveIntentDecorators(
      node: ts.Node
    ): ts.VisitResult<ts.Node> {
      switch (node.kind) {
        case ts.SyntaxKind.ClassDeclaration: {
          return removeIntentDecoratorFromClass(node as ts.ClassDeclaration)
        }
      }
      return ts.visitEachChild(
        node,
        visitRemoveIntentDecorators,
        transformContext
      )
    }
    // create constructor if it does not exist
    // append Intent call within constructor
    // remove @Intent decorator from the sourcefile

    return tsSourceFile => {
      // const intents = gatherIntents(tsSourceFile)
      const withConstructorSourceFile = injectConstructorIfNeeded(tsSourceFile)

      const withoutDecorators = visitRemoveIntentDecorators(
        withConstructorSourceFile as ts.Node
      )

      return withoutDecorators as ts.SourceFile
    }
  }
}
