export type ComponentMetadata = {
  classname: string
  isRoot: boolean
  initialTagName: string
  finalTagName: string
  group?: string
  imports?: Array<string>
}

export type Metadata = {
  components: Array<ComponentMetadata>
  prefix?: string
  suffix?: string
}

export type TransformerOptions = {
  verbose?: true
  metadata?: Metadata
}

export type FileTransformerOptions = TransformerOptions & {
  outDir: string
  srcDir?: string
}

export type SourceCodeTransformerOptions = TransformerOptions & {
  srcDirectory: string
  buildDirectory: string
}

export type SpecComponent = {
  classname: string
  isRoot: boolean
  initialTagName: string
  group: string
  label: string
}

export type RootComponent = SpecComponent & {
  finalTagName: string
}

export type CompileSpec = { components: Array<SpecComponent> }
