import { ScenarioConfig } from './types'
import * as path from 'path'

export default class LocationProvider {
  bearerDir: string
  scenarioRoot: string
  scenarioRc: string

  constructor(private readonly config: ScenarioConfig) {
    this.scenarioRc = this.config.scenarioConfig.config
    if (this.scenarioRc) {
      this.scenarioRoot = path.dirname(this.scenarioRc)
      this.bearerDir = path.join(this.scenarioRoot, '.bearer')
    }
  }

  scenarioRootResourcePath(filename: string): string {
    return path.join(this.scenarioRoot, filename)
  }

  // ~/views
  get srcViewsDir(): string {
    return path.join(this.scenarioRoot, 'views')
  }
  // ~/intents
  get srcIntentDir(): string {
    return path.join(this.scenarioRoot, 'intents')
  }

  // ~/.bearer/views
  get buildViewsDir(): string {
    return path.join(this.bearerDir, 'views')
  }

  // ~/.bearer/views/src
  get buildViewsSrcDir(): string {
    return path.join(this.buildViewsDir, 'src')
  }

  get intentsSrcDir(): string {
    return path.join(this.scenarioRoot, 'intents')
  }

  // ~/.bearer/intents
  get intentsBuildDir(): string {
    return path.join(this.bearerDir, 'intents')
  }

  intentsBuildResourcePath(resource: string): string {
    return path.join(this.intentsBuildDir, resource)
  }

  get intentsArtifactDir(): string {
    return path.join(this.bearerDir, 'artifacts')
  }

  intentsArtifactResourcePath(resource: string): string {
    return path.join(this.intentsArtifactDir, resource)
  }

  viewsBuildResourcePath(resource: string): string {
    return path.join(this.buildViewsDir, resource)
  }
}
