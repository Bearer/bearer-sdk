import * as fs from 'fs-extra'
import * as path from 'path'

import BaseCommand from '../../BaseCommand'
import { RequireScenarioFolder } from '../../utils/decorators'
import { OpenApiSpecGenerator } from '../../utils/generators'

const OPEN_API_SPEC = 'openapi.json'

export default class GenerateApiDocumentation extends BaseCommand {
  static description = 'Generate an openapi REST documentation'
  static hidden = true
  static flags = {
    ...BaseCommand.flags
  }

  static args = []

  @RequireScenarioFolder()
  async run() {
    try {
      const { srcIntentsDir, buildViewsDir } = this.locator

      const { scenarioTitle, scenarioUuid } = this.bearerConfig
      const spec = await new OpenApiSpecGenerator(srcIntentsDir, { scenarioTitle, scenarioUuid }).build()

      fs.ensureDirSync(buildViewsDir)

      const OpenApiSpecPath = path.join(buildViewsDir, OPEN_API_SPEC)
      const fileExists = fs.existsSync(OpenApiSpecPath)
      await fs.writeJSON(OpenApiSpecPath, spec)
      const action = fileExists ? "updated" : "generated"
      this.success(`File ${OPEN_API_SPEC} ${action}!`)
    } catch (e) {
      this.error(e)
    }
  }
}
