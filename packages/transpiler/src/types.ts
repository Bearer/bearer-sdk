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
}

export type SourceCodeTransformerOptions = TransformerOptions & {
  srcDirectory: string
  buildDirectory: string
}
