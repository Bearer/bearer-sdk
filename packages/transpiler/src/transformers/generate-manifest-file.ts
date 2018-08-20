import * as fs from 'fs'
import * as path from 'path'
import * as ts from 'typescript'
import * as vm from 'vm'

import {
  CompileSpec,
  FileTransformerOptions,
  RootComponent,
  SpecComponent
} from '../types'

export const MANIFEST_FILE = 'manifest.js'
export const SPEC_FILE = 'spec.ts'

const compilerOptions = { module: ts.ModuleKind.CommonJS }

const content: (obj: any) => string = obj =>
  `export const BEARER_MANIFEST = ${JSON.stringify(obj)}`

const compileSpec: (srcDir: string) => CompileSpec = srcDir => {
  const spec = ts.transpileModule(
    fs.readFileSync(path.join(srcDir, SPEC_FILE), 'utf8'),
    { compilerOptions }
  ).outputText

  const sandbox: { exports: { default: any } } = {
    exports: { default: null }
  }

  const context = vm.createContext(sandbox)
  const script = new vm.Script(spec)
  script.runInContext(context)

  return sandbox.exports.default
}

const previewRootComponentTags = (
  components: Array<SpecComponent>,
  rootComponents: Array<RootComponent>
) =>
  components.map(({ initialTagName }) => {
    const { finalTagName } = rootComponents.find(
      ({ initialTagName: tag }) => tag === initialTagName
    ) || { finalTagName: null }
    return finalTagName
  })

const stringifyManifest: (manifest: any, srcDir: string) => string = (
  manifest,
  srcDir
) => {
  const { components } = compileSpec(srcDir)
  const rootComponents = manifest.components.filter(({ isRoot }) => isRoot)
  const previewRootComponents = previewRootComponentTags(
    components,
    rootComponents
  )

  const toBeExported = {
    manifest,
    example: { previewRootComponents }
  }

  return ts.transpileModule(content(toBeExported), { compilerOptions })
    .outputText
}

export default function generateManifestFile(
  { metadata, outDir, srcDir }: FileTransformerOptions = { outDir, srcDir }
): ts.TransformerFactory<ts.SourceFile> {
  if (metadata) {
    fs.writeFileSync(
      path.join(outDir, MANIFEST_FILE),
      stringifyManifest(metadata, srcDir),
      'utf8'
    )
  }
  return _transformContext => {
    return tsSourceFile => {
      return tsSourceFile
    }
  }
}
