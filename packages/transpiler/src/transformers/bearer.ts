import * as ts from 'typescript'

// @Prop() BEARER_ID: string;
export function addBearerIdProp(
  classNode: ts.ClassDeclaration
): ts.ClassDeclaration {
  return ts.updateClassDeclaration(
    classNode,
    classNode.decorators,
    classNode.modifiers,
    classNode.name,
    classNode.typeParameters,
    classNode.heritageClauses,
    [
      ...classNode.members,
      ts.createProperty(
        [propDecorator()],
        undefined,
        'BEARER_ID',
        undefined,
        ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        undefined
      )
    ]
  )
}

// @Prop({ context: 'bearer' }) bearerContext: any
export function addBearerContextProp(
  classNode: ts.ClassDeclaration
): ts.ClassDeclaration {
  return ts.updateClassDeclaration(
    classNode,
    classNode.decorators,
    classNode.modifiers,
    classNode.name,
    classNode.typeParameters,
    classNode.heritageClauses,
    [
      ...classNode.members,
      ts.createProperty(
        [
          ts.createDecorator(
            ts.createCall(
              ts.createIdentifier('Prop') as ts.Expression,
              undefined,
              [
                ts.createObjectLiteral([
                  ts.createPropertyAssignment(
                    ts.createLiteral('context'),
                    ts.createLiteral('bearer')
                  )
                ])
              ]
            )
          )
        ],
        undefined,
        'bearerContext',
        undefined,
        ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
        undefined
      )
    ]
  )
}

// @Prop() setupId: string
export function addSetupIdProp(
  classNode: ts.ClassDeclaration
): ts.ClassDeclaration {
  return ts.updateClassDeclaration(
    classNode,
    classNode.decorators,
    classNode.modifiers,
    classNode.name,
    classNode.typeParameters,
    classNode.heritageClauses,
    [
      ...classNode.members,
      ts.createProperty(
        [
          ts.createDecorator(
            ts.createCall(
              ts.createIdentifier('Prop') as ts.Expression,
              undefined,
              undefined
            )
          )
        ],
        undefined,
        'setupId',
        undefined,
        ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        undefined
      )
    ]
  )
}

// TODO : append statement if componentDidLoad already exists
// componentDidLoad(){ this.bearer.setupId = this.setupId }
export function addComponentDidLoad(
  classNode: ts.ClassDeclaration
): ts.ClassDeclaration {
  const assignSetupId = ts.createStatement(
    ts.createAssignment(
      ts.createPropertyAccess(ts.createThis(), 'bearerContext.setupId'),
      ts.createPropertyAccess(ts.createThis(), 'setupId')
    )
  )
  const ifSetupIdPresent = ts.createIf(
    ts.createPropertyAccess(ts.createThis(), 'setupId'),
    ts.createBlock([assignSetupId])
  )
  return ts.updateClassDeclaration(
    classNode,
    classNode.decorators,
    classNode.modifiers,
    classNode.name,
    classNode.typeParameters,
    classNode.heritageClauses,
    [
      ...classNode.members,
      ts.createMethod(
        /* decorators */ undefined,
        /* modifiers */ undefined,
        /* asteriskToken */ undefined,
        'componentDidLoad',
        /* questionToken */ undefined,
        /* typeParameters */ undefined,
        /* parameters */ undefined,
        /* type */ undefined,
        ts.createBlock([ifSetupIdPresent])
      )
    ]
  )
}

function inImportClause(node: ts.ImportClause, libName: string): boolean {
  const inImport =
    node.namedBindings
      .getChildren()
      .filter(n => n.kind === ts.SyntaxKind.SyntaxList)
      .map(n =>
        n
          .getChildren()
          .filter(cn => cn.kind === ts.SyntaxKind.ImportSpecifier)
          .map(cn => cn.getText())
      )[0]
      .findIndex(v => v === libName) !== -1

  return inImport
}

export function hasImport(node: ts.Node, libName: string): boolean {
  let has = false
  function visit(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.ImportDeclaration) {
      let n = node as ts.ImportDeclaration
      has =
        has ||
        (coreImport(n) &&
          n.importClause &&
          inImportClause(n.importClause, libName))
    }
    ts.forEachChild(node, visit)
  }

  visit(node)

  return has
}

export function coreImport(node: ts.ImportDeclaration): boolean {
  return Boolean(
    node.moduleSpecifier
      .getText()
      .toString()
      .match(/@bearer\/core/)
  )
}

function propDecorator() {
  return ts.createDecorator(
    ts.createCall(
      ts.createIdentifier('Prop') as ts.Expression,
      undefined,
      undefined
    )
  )
}

export default {
  addBearerIdProp,
  addBearerContextProp,
  addSetupIdProp,
  addComponentDidLoad,
  hasImport,
  coreImport
}
