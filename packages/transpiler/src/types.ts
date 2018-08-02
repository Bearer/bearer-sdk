export type ComponentMetadata = {
  isRoot: boolean
  initialTagName: string
  finalTagName: string
  imports?: Array<string>
}

export type Metadata = {
  components: Array<ComponentMetadata>
}

export type TransformerOptions = {
  verbose?: true
  metadata?: Metadata
}

export type FileTransformerOptions = TransformerOptions & {
  outDir: string
}
