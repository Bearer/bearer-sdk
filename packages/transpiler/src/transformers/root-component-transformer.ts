import * as ts from 'typescript'
import { ensurePropImported, hasImport } from './bearer'
import { Decorators } from './constants'

type TransformerOptions = {
  verbose?: true
}

export default function RootComponentTransformer({ verbose }: TransformerOptions = {}): ts.TransformerFactory<
  ts.SourceFile
> {
  return _transformContext => {
    return tsSourceFile => {
      return tsSourceFile
    }
  }
}
