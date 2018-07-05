#!/usr/bin/env node

// import Transpiler from '../src/index'
import * as ts from 'typescript'
import * as fs from 'fs'

import ComponentTransformer from '../src/component-transformer'

type TransformerOptions = {
  verbose?: true
}

const resultFile = ts.createSourceFile(
  'tmp.ts',
  '',
  ts.ScriptTarget.Latest,
  /*setParentNodes*/ false,
  ts.ScriptKind.TS
)
const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed
})

function storeOutput({
  verbose
}: TransformerOptions = {}): ts.TransformerFactory<ts.SourceFile> {
  function log(...args) {
    if (verbose) {
      console.log.apply(this, args)
    }
  }
  return _transformContext => {
    return tsSourceFile => {
      const result = printer.printNode(
        ts.EmitHint.Unspecified,
        tsSourceFile,
        resultFile
      )
      log('myFile:', result)
      return tsSourceFile
    }
  }
}

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine
}

const configPath = ts.findConfigFile(
  /*searchPath*/ process.cwd(),
  ts.sys.fileExists,
  'tsconfig.json'
)

if (!configPath) {
  throw new Error("Could not find a valid 'tsconfig.json'.")
}

const createProgram = ts.createSemanticDiagnosticsBuilderProgram

const host = ts.createWatchCompilerHost(
  configPath,
  {},
  ts.sys,
  createProgram,
  reportDiagnostic,
  reportWatchStatusChanged
)

const origCreateProgram = host.createProgram

host.createProgram = (
  rootNames: ReadonlyArray<string>,
  options,
  host,
  oldProgram
) => {
  console.log("** We're about to create the program! **")
  return origCreateProgram(rootNames, options, host, oldProgram)
}
const origPostProgramCreate = host.afterProgramCreate

host.afterProgramCreate = program => {
  console.log('** We finished making the program! **')
  origPostProgramCreate!(program)
}

// `createWatchProgram` creates an initial program, watches files, and updates the program over time.
// // const tranpspiler = new Transpiler(options, program)

function reportDiagnostic(diagnostic: ts.Diagnostic) {
  console.error(
    'Error',
    diagnostic.code,
    ':',
    ts.flattenDiagnosticMessageText(
      diagnostic.messageText,
      formatHost.getNewLine()
    )
  )
}

var program = ts.createWatchProgram(host).getProgram()

function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
  console.info(ts.formatDiagnostic(diagnostic, formatHost))

  if (program) {
    program.emit(undefined, undefined, undefined, undefined, transformers)
  }
}

const transformers: ts.CustomTransformers = {
  before: [
    ComponentTransformer({ verbose: true }),
    storeOutput({ verbose: true })
  ],
  after: []
}
