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

export const MANIFEST_FILE = 'bearer-manifest.json'
export const SPEC_FILE = 'spec.ts'

const compilerOptions = { module: ts.ModuleKind.CommonJS }

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
  components.map(({ initialTagName, label }) => {
    const { finalTagName, group } = rootComponents.find(
      ({ initialTagName: tag }) => tag === initialTagName
    ) || { finalTagName: null, group: null }
    return { finalTagName, group, label, props: [{ type: "object", name: "bar" },{ type: "string", name: "foo" }] }
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
    previewRootComponents
  }

  return JSON.stringify(toBeExported, null, 2)
}

export default function generateManifestFile(
  { metadata, outDir, srcDir }: FileTransformerOptions = { outDir, srcDir }
): void {
  if (metadata) {
    fs.writeFileSync(
      path.join(outDir, MANIFEST_FILE),
      stringifyManifest(metadata, srcDir),
      'utf8'
    )
  }
}
