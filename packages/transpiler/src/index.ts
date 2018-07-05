import * as ts from 'typescript'
import * as path from 'path'
import * as fs from 'fs-extra'
import { forEach } from 'async-foreach'
import ComponentTransformer from './component-transformer'

export default class Transpiler {
  constructor(
    private readonly options: ts.CompilerOptions,
    private readonly program: any
  ) {}

  async run() {
    const { outDir } = this.options
    await fs.mkdirp(outDir)
    let files = this.getFileNames()

    forEach(files, filePath => {
      let sourceFile = this.program.getSourceFile(filePath)
      let fileName = path.basename(filePath)
      this.program.getCompilerOptions()

      let res = ts.transform(sourceFile, [ComponentTransformer()])

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

      const result = printer.printNode(
        ts.EmitHint.Unspecified,
        res.transformed[0],
        resultFile
      )

      fs.writeFileSync(path.join(outDir, fileName), result)
    })
  }

  private getFileNames(): string[] {
    return this.program
      .getSourceFiles()
      .filter(
        file =>
          !this.program.isSourceFileFromExternalLibrary(file) &&
          !file.fileName.endsWith('d.ts')
      )
      .map(file => file.fileName)
  }
}
