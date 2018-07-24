import { ScenarioConfig } from './types'
import * as path from 'path'

export default class LocationProvider {
  scenarioRoot: string
  scenarioRc: string

  constructor(private readonly config: ScenarioConfig) {
    this.scenarioRc = this.config.scenarioConfig.config
    if (this.scenarioRc) {
      this.scenarioRoot = path.dirname(this.scenarioRc)
    }
  }

  scenarioRootFile(filename: string): string {
    return path.join(this.scenarioRoot, filename)
  }

  // ~/screens
  get srcScreenDir(): string {
    return path.join(this.scenarioRoot, 'screens')
  }
  // ~/intents
  get srcIntentDir(): string {
    return path.join(this.scenarioRoot, 'intents')
  }

  // ~/.build/
  get buildDir(): string {
    return path.join(this.scenarioRoot, '.build')
  }

  // ~/.build/src
  get buildScreenDir(): string {
    return path.join(this.buildDir, 'src')
  }

  get intentsSrcDir(): string {
    return path.join(this.scenarioRoot, 'intents')
  }

  get intentsBuildDir(): string {
    return path.join(this.intentsSrcDir, '.build')
  }

  intentsBuildResourcePath(resource: string): string {
    return path.join(this.intentsBuildDir, resource)
  }

  get intentsArtifactDir(): string {
    return path.join(this.scenarioRoot, '.bearer')
  }

  intentsArtifactResourcePath(resource: string): string {
    return path.join(this.intentsArtifactDir, resource)
  }
}
