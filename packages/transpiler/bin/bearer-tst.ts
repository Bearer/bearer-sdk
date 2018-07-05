#!/usr/bin/env node

import * as ts from 'typescript'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as chokidar from 'chokidar'

import ComponentTransformer from '../src/component-transformer'

const compilerOptions = ts.readConfigFile('tsconfig.json', ts.sys.readFile)
  .config
let host = ts.createCompilerHost(compilerOptions)

const SCREENS_DIRECTORY = path.join(process.cwd(), 'screens')
const SRC_DIRECTORY = path.join(SCREENS_DIRECTORY, 'src')
const BUILD_DIRECTORY = path.join(SCREENS_DIRECTORY, '.build')
const BUILD_SRC_DIRECTORY = path.join(BUILD_DIRECTORY, 'src')

fs.emptyDirSync(BUILD_SRC_DIRECTORY)

type TransformerOptions = {
  verbose?: true
}

const sourceCode = tsSourceFile => {
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

  return printer.printNode(ts.EmitHint.Unspecified, tsSourceFile, resultFile)
}

const config = ts.readConfigFile(
  path.join(BUILD_DIRECTORY, 'tsconfig.json'),
  ts.sys.readFile
)
const parsed = ts.parseJsonConfigFileContent(config, ts.sys, process.cwd())

function storeOutput({
  verbose
}: TransformerOptions = {}): ts.TransformerFactory<ts.SourceFile> {
  function log(...args) {
    if (verbose) {
      console.log.apply(this, args)
    }
  }
  return transformContext => {
    return tsSourceFile => {
      const { base, dir } = path.parse(tsSourceFile.fileName)
      let outPath = tsSourceFile.fileName
        .replace(SCREENS_DIRECTORY, BUILD_DIRECTORY)
        .replace(/js$/, 'ts')
        .replace(/jsx$/, 'tsx')

      fs.ensureFileSync(outPath)
      fs.writeFileSync(outPath, sourceCode(tsSourceFile))

      return tsSourceFile
    }
  }
}

const transformers: ts.CustomTransformers = {
  before: [
    // ComponentTransformer({ verbose: true }),
    storeOutput({ verbose: true })
  ],
  after: []
}

function watch(rootFileNames: string[], options: ts.CompilerOptions) {
  function callback(error) {
    if (error) {
      console.log('[BEARER]', 'error', error)
    }
  }

  console.log('[BEARER]', 'BUILD_DIRECTORY', SRC_DIRECTORY)
  chokidar
    .watch(SRC_DIRECTORY + '/**', {
      ignored: /\.tsx?$/,
      // ignored: /(^|[\/\\])\../,
      persistent: true,
      followSymlinks: false
    })
    .on('all', (event, filePath) => {
      const relativePath = filePath.replace(SRC_DIRECTORY, '')
      const targetPath = path.join(BUILD_SRC_DIRECTORY, relativePath)
      // Creating symlink
      if (event == 'add' || event == 'addDir') {
        console.log('creating symlink')
        fs.ensureSymlink(filePath, targetPath, callback)
      }

      // // Deleting symlink
      if (event == 'unlink') {
        console.log('deleting symlink')
        fs.unlink(targetPath, err => {
          if (err) throw err
          console.log(targetPath + ' was deleted')
        })
      }
    })
  const files: ts.MapLike<{ version: number }> = {}

  // initialize the list of files
  rootFileNames.forEach(fileName => {
    files[fileName] = { version: 0 }
  })

  // Create the language service host to allow the LS to communicate with the host
  const servicesHost: ts.LanguageServiceHost = {
    getScriptFileNames: () => rootFileNames,
    getScriptVersion: fileName =>
      files[fileName] && files[fileName].version.toString(),
    getScriptSnapshot: fileName => {
      if (!fs.existsSync(fileName)) {
        return undefined
      }

      return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString())
    },
    getCurrentDirectory: () => process.cwd(),
    getCompilationSettings: () => options,
    getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
    getCustomTransformers: () => transformers,
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory
  }

  // Create the language service files
  const services = ts.createLanguageService(
    servicesHost,
    ts.createDocumentRegistry()
  )

  // Now let's watch the files
  rootFileNames.forEach(fileName => {
    // First time around, emit all files
    emitFile(fileName)

    // Add a watch on the file to handle next change
    fs.watchFile(
      fileName,
      { persistent: true, interval: 250 },
      (curr, prev) => {
        // Check timestamp
        if (+curr.mtime <= +prev.mtime) {
          return
        }

        // Update the version to signal a change in the file
        files[fileName].version++

        // write the changes to disk
        emitFile(fileName)
      }
    )
  })

  function emitFile(fileName: string) {
    let output = services.getEmitOutput(fileName)

    if (!output.emitSkipped) {
      console.log(`Emitting ${fileName} like a pro`)
    } else {
      console.log(`Emitting ${fileName} failed`)
      logErrors(fileName)
    }
  }

  function logErrors(fileName: string) {
    let allDiagnostics = services
      .getCompilerOptionsDiagnostics()
      .concat(services.getSyntacticDiagnostics(fileName))
      .concat(services.getSemanticDiagnostics(fileName))

    allDiagnostics.forEach(diagnostic => {
      let message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n'
      )
      if (diagnostic.file) {
        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
          diagnostic.start!
        )
        console.log(
          `  Error ${diagnostic.file.fileName} (${line + 1},${character +
            1}): ${message}`
        )
      } else {
        console.log(`  Error: ${message}`)
      }
    })
  }
}

// Start the watcher
watch(parsed.fileNames, {
  module: ts.ModuleKind.CommonJS
})
