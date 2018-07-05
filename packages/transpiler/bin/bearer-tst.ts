#!/usr/bin/env node

import Transpiler from '../src/index'
import * as ts from 'typescript'

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
const program = ts.createWatchProgram(host)
console.log(ts.readConfigFile(configPath, ts.sys.readFile))
console.log(program.getProgram().getCompilerOptions())
// const tranpspiler = new Transpiler(options, program)

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

function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
  console.info(ts.formatDiagnostic(diagnostic, formatHost))
}

console.log(configPath)
