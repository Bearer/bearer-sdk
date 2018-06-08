const semver = require('semver')
const term = require('terminal-kit').terminal
const { engines } = require('../package.json')

const version = engines.node
if (!semver.satisfies(process.version, version)) {
  term.white('Bearer: ')
  term.red(
    `Required node version ${version} not satisfied with current version ${
      process.version
    }.`
  )
  term('\n')
  process.exit(1)
}
