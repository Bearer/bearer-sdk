import * as fs from 'fs'
import * as globby from 'globby'
import * as path from 'path'
import * as ts from 'typescript'

import { TranpilerOptions } from '../../src/index'
import { unitFixtureDirectory } from '../utils/location'

import { TranspilerFactory } from './transpiler'

const ROOT_DIRECTORY = path.join(__dirname, '..')
const buildSrcFolder = path.join(ROOT_DIRECTORY, '.build/src')

export function cleanBuildFolder() {
  const buildFolder = path.join(__dirname, '..', '.build/src')

  globby.sync(['**/*.tsx', '**/*.ts', '**/*.json'], { cwd: buildFolder }).forEach(file => {
    const filePath = path.join(buildFolder, file)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  })
}

export function runTransformers(code: string, transformers: ts.TransformerFactory<ts.SourceFile>[]) {
  const sourceFile = ts.createSourceFile('tmp.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)

  const transformed = ts.transform(sourceFile, transformers)

  const printer = ts.createPrinter(
    {
      newLine: ts.NewLineKind.LineFeed
    },
    {
      onEmitNode: transformed.emitNodeWithNotification,
      substituteNode: transformed.substituteNode
    }
  )
  const result = printer.printBundle(ts.createBundle(transformed.transformed))
  transformed.dispose()

  return result
}

export function runTransformersOn(
  itDescription: string,
  unitTestDirectory: string,
  transformers: ts.TransformerFactory<ts.SourceFile>[]
) {
  const srcDirectory = unitFixtureDirectory(unitTestDirectory)
  describe.each(fs.readdirSync(srcDirectory))('file: %s', file => {
    it(itDescription, done => {
      const filePath = path.join(srcDirectory, file)

      fs.readFile(filePath, 'utf8', (_e, postContent) => {
        const result = runTransformers(postContent, transformers)
        expect(result).toMatchSnapshot()
        done()
      })
    })
  })
}

export function runUnitOn(name: string, transpilerOptions: Partial<TranpilerOptions> = {}) {
  const srcDirectory = unitFixtureDirectory(name)

  beforeAll(() => {
    cleanBuildFolder()
    runTranspiler(`__fixtures__/unit/${name}`, transpilerOptions)
  })

  fs.readdirSync(srcDirectory).forEach(file => {
    describe(file.replace(/\.tsx?/, '').replace(/\-/g, ' '), () => {
      it('match snapshot', async done => {
        expect.assertions(1)
        const filePath = path.join(buildSrcFolder, file)
        fs.readFile(filePath, 'utf8', (_e, postContent) => {
          expect({
            postContent,
            file
          }).toMatchSnapshot()
          done()
        })
      })
    })
  })
}

export function runTranspiler(srcFolder: string, transpilerOptions: Partial<TranpilerOptions> = {}) {
  const transpiler = TranspilerFactory({
    srcFolder,
    ROOT_DIRECTORY,
    buildFolder: '.build',
    ...transpilerOptions
  })

  transpiler.run()
}
