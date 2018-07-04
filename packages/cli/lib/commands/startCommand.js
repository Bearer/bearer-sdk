const path = require('path')
const fs = require('fs')

const start = (emitter, config) => () => {
  const { rootPathRc } = config
  const rootLevel = path.dirname(rootPathRc)
  const screensDirectory = path.join(rootLevel, 'screens')
  const buildDirectory = path.join(screensDirectory, '.build')

  try {
    // Create hidden folder
    emitter.emit('start:generate:buildFolder')
    if (!fs.existsSync(buildDirectory)) {
      fs.mkdirSync(buildDirectory)
    }

    // Copy stencil.config.json
    emitter.emit('start:generate:stencilConfig')

    emitter.emit('start:symlinkNodeModules')
    // symlink node_modules
    emitter.emit('start:symlinkPackage')
    // symlink package.json
    emitter.emit('start:watchers')
    // Launch in ||
    //    bearer-tsc
    //    stencil-dev-server
  } catch (e) {
    emitter.emit('start:failed', { error: e })
  }
}

module.exports = {
  useWith: (program, emitter, config) => {
    program
      .command('start')
      .description(
        `Start local development server.
    $ bearer start
`
      )
      .action(start(emitter, config))
  }
}
