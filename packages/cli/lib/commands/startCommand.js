const path = require('path')
const fs = require('fs')
const copy = require('copy-template-dir')
const Case = require('case')

const start = (emitter, config) => () => {
  const {
    rootPathRc,
    scenarioConfig: { scenarioTitle }
  } = config
  console.log('[BEARER]', 'config', config)
  const rootLevel = path.dirname(rootPathRc)
  const screensDirectory = path.join(rootLevel, 'screens')
  const buildDirectory = path.join(screensDirectory, '.build')

  try {
    // Create hidden folder
    emitter.emit('start:generate:buildFolder')
    if (!fs.existsSync(buildDirectory)) {
      fs.mkdirSync(buildDirectory)
    }

    // Symlink node_modules
    emitter.emit('start:symlinkNodeModules')
    const nodeModuleLink = path.join(buildDirectory, 'node_modules')
    createEvenIfItExists(
      path.join(screensDirectory, 'node_modules'),
      nodeModuleLink
    )

    // symlink package.json
    emitter.emit('start:symlinkPackage')

    const packageLink = path.join(buildDirectory, 'package.json')
    createEvenIfItExists(
      path.join(screensDirectory, 'package.json'),
      packageLink
    )

    // Copy stencil.config.json
    emitter.emit('start:generate:stencilConfig')

    const vars = {
      componentTagName: Case.kebab(scenarioTitle)
    }
    const inDir = path.join(__dirname, 'templates/start/.build')
    const outDir = buildDirectory

    copy(inDir, outDir, vars, (err, createdFiles) => {
      if (err) throw err
      createdFiles.forEach(filePath =>
        emitter.emit('start:generate:stencilConfig', filePath)
      )
    })

    emitter.emit('start:watchers')
    // Launch in ||
    //    bearer-tsc
    //    stencil-dev-server
  } catch (e) {
    emitter.emit('start:failed', { error: e })
  }
}

function createEvenIfItExists(target, path) {
  try {
    fs.symlinkSync(target, path)
  } catch (e) {
    if (!e.code === 'EEXIST') {
      throw e
    }
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
