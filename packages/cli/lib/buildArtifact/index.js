const prepareConfig = require('./prepareConfig')
const attachConfig = require('./attachConfig')
const addFilesToArchive = require('./addFilesToArchive')
const generateHandler = require('./generateHandler')
const { promisify } = require('util')
const fs = require('fs')
const uuidv4 = require('uuid/v4')

const readFileAsync = promisify(fs.readFile)
const pathJs = require('path')

const archiver = require('archiver')

const CONFIG_FILE = 'bearer.config.json'
const HANDLER_NAME = 'index.js'
const archive = archiver('zip', {
  zlib: { level: 9 }
})

module.exports = (output, handler, { path, scenarioUuid }, emitter) => {
  output.on('close', () => {
    emitter.emit('buildArtifact:output:close', pathJs.resolve(output.path))
  })

  output.on('end', () => {
    emitter.emit('buildArtifact:output:end')
  })

  archive.on('warning', err => {
    if (err.code === 'ENOENT') {
      emitter.emit('buildArtifact:archive:warning:ENOENT', err)
    } else {
      throw err
    }
  })

  archive.pipe(output)

  emitter.emit('buildArtifact:start', { scenarioUuid })

  prepareConfig(path, scenarioUuid)
    .then(async config => {
      emitter.emit('buildArtifact:configured', { intents: config.intents })

      await attachConfig(archive, JSON.stringify(config, null, 2), {
        name: CONFIG_FILE
      })

      archive.append(generateHandler(config), { name: HANDLER_NAME })

      await addFilesToArchive(archive, path)
    })
    .then(() => {
      archive.finalize()
    })
    .catch(console.error)

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      resolve(archive)
    })

    archive.on('error', reject)
  })
}
