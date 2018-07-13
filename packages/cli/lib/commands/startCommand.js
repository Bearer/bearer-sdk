const path = require('path')
const fs = require('fs-extra')
const copy = require('copy-template-dir')
const unzip = require('unzip')
const Case = require('case')

const { spawn, execSync } = require('child_process')

async function startLocalDevelopmentServer(
  rootLevel,
  scenarioUuid,
  emitter,
  config
) {
  try {
    const { buildIntents } = require(path.join(
      __dirname,
      '..',
      'deployScenario'
    ))
    const intentsArtifact = await buildIntents(
      rootLevel,
      scenarioUuid,
      emitter,
      config
    )
    const buildDir = path.join(rootLevel, 'intents', '.build')
    fs.ensureDirSync(buildDir)

    await new Promise((resolve, reject) => {
      fs
        .createReadStream(intentsArtifact)
        .pipe(unzip.Extract({ path: buildDir }))
        .on('close', resolve)
        .on('error', reject)
    })
    const lambdas = require(buildDir)
  } catch (e) {
    throw e
  }
}

function createEvenIfItExists(target, sourcePath) {
  try {
    fs.symlinkSync(target, sourcePath)
  } catch (e) {
    if (!e.code === 'EEXIST') {
      throw e
    }
  }
}

function childProcessStdout(emitter, name) {
  return data => {
    emitter.emit('start:watchers:stdout', { name, data })
  }
}

function childProcessStderr(emitter, name) {
  return data => {
    emitter.emit('start:watchers:stderr', { name, data })
  }
}

function childProcessClose(emitter, name) {
  return code => {
    emitter.emit('start:watchers:close', { name, code })
  }
}

function prepare(emitter, config) {
  return async ({ install = true } = { install: true }) => {
    try {
      const {
        rootPathRc,
        scenarioConfig: { scenarioTitle }
      } = config
      const rootLevel = path.dirname(rootPathRc)
      const screensDirectory = path.join(rootLevel, 'screens')
      const buildDirectory = path.join(screensDirectory, '.build')

      // Create hidden folder
      emitter.emit('start:prepare:buildFolder')
      if (!fs.existsSync(buildDirectory)) {
        fs.mkdirSync(buildDirectory)
        fs.mkdirSync(path.join(buildDirectory, 'src'))
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
      emitter.emit('start:prepare:stencilConfig')

      const vars = {
        componentTagName: Case.kebab(scenarioTitle)
      }
      const inDir = path.join(__dirname, 'templates/start/.build')
      const outDir = buildDirectory

      await new Promise((resolve, reject) => {
        copy(inDir, outDir, vars, (err, createdFiles) => {
          if (err) reject(err)
          createdFiles.forEach(filePath =>
            emitter.emit('start:prepare:copyFile', filePath)
          )
          resolve()
        })
      })

      if (install) {
        emitter.emit('start:prepare:installingDependencies')
        execSync('yarn install', { cwd: screensDirectory })
      }

      return {
        rootLevel,
        buildDirectory,
        screensDirectory
      }
    } catch (error) {
      emitter.emit('start:prepare:failed', { error })
      return {}
    }
  }
}

const ensureSetupAndConfigComponents = rootLevel => {
  spawn('bearer', ['g', '--config'], {
    cwd: rootLevel
  })
  spawn('bearer', ['g', '--setup'], {
    cwd: rootLevel
  })
}

const start = (emitter, config) => async ({ open, install }) => {
  const {
    bearerConfig: { OrgId },
    scenarioConfig: { scenarioTitle }
  } = config

  const scenarioUuid = `${OrgId}-${scenarioTitle}`

  try {
    const { buildDirectory, rootLevel, screensDirectory } = await prepare(
      emitter,
      config
    )({
      install
    })

    ensureSetupAndConfigComponents(rootLevel)

    emitter.emit('start:watchers')

    fs.watchFile(
      path.join(rootLevel, 'intents', 'auth.config.json'),
      { persistent: true, interval: 250 },
      () => ensureSetupAndConfigComponents(rootLevel)
    )

    /* Start bearer transpiler phase */
    const bearerTranspiler = spawn(
      'node',
      [path.join(__dirname, '..', 'startTranspiler.js')],
      {
        cwd: screensDirectory,
        env: {
          ...process.env,
          BEARER_SCENARIO_ID: scenarioUuid
        },
        stdio: ['pipe', 'pipe', 'pipe', 'ipc']
      }
    )

    /* start local development server */
    startLocalDevelopmentServer(rootLevel, scenarioUuid, emitter, config)
    const BEARER = 'bearer-transpiler'
    bearerTranspiler.stdout.on('data', childProcessStdout(emitter, BEARER))
    bearerTranspiler.stderr.on('data', childProcessStderr(emitter, BEARER))
    bearerTranspiler.on('close', childProcessClose(emitter, BEARER))

    bearerTranspiler.on('message', ({ event }) => {
      if (event === 'transpiler:initialized') {
        /* Start stencil */
        const args = ['start']
        if (!open) {
          args.push('--no-open')
        }
        const stencil = spawn('yarn', args, {
          cwd: buildDirectory,
          env: {
            ...process.env,
            BEARER_SCENARIO_ID: scenarioUuid
          }
        })

        const STENCIL = 'stencil'

        stencil.stdout.on('data', childProcessStdout(emitter, STENCIL))
        stencil.stderr.on('data', childProcessStderr(emitter, STENCIL))
        stencil.on('close', childProcessClose(emitter, STENCIL))
      }
    })
  } catch (e) {
    emitter.emit('start:failed', { error: e })
  }
}

module.exports = {
  prepare,
  useWith: (program, emitter, config) => {
    program
      .command('start')
      .description(
        `Start local development server.
    $ bearer start
`
      )
      .option('--no-open', 'Do not open web browser')
      .option('--no-install', 'Do not run yarn|npm install')
      .action(start(emitter, config))
  }
}
