import { flags } from '@oclif/command'

import BaseLegacyCommand from '../base-legacy-command'

import GenerateApiDocumenation from './generate/api-documentation'
import GenerateSpec from './generate/spec'
import PrepareViews from './prepare/views'

const noOpen = 'no-open'
const noInstall = 'no-install'
const noWatcher = 'no-watcher'

export default class Start extends BaseLegacyCommand {
  static description = 'start local development environment'

  static flags = {
    help: flags.help({ char: 'h' }),
    force: flags.boolean({ char: 'f', description: 'Start using random available port' }),
    [noOpen]: flags.boolean({}),
    [noInstall]: flags.boolean({}),
    [noWatcher]: flags.boolean({ hidden: true })
  }

  static args = []

  async run() {
    const { flags } = this.parse(Start)
    const cmdArgs = []
    if (flags[noOpen]) {
      cmdArgs.push(`--${noOpen}`)
    }
    if (flags[noInstall]) {
      cmdArgs.push(`--${noInstall}`)
    }
    if (flags[noWatcher]) {
      cmdArgs.push(`--${noWatcher}`)
    }

    if (flags.force) {
      cmdArgs.push(`--force`)
    }

    if (this.hasViews) {
      await GenerateSpec.run(['--silent'])
      await PrepareViews.run(['--silent'])
      await GenerateApiDocumenation.run(['--silent'])
    } else {
      cmdArgs.push(`--no-views`)
    }

    this.runLegacy(['start', ...cmdArgs])
  }
}
