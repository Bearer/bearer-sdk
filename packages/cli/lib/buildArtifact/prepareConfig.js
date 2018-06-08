const vm = require('vm')
const globby = require('globby')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)

const AUTH_CONFIG_FILE = 'auth.config.json'

module.exports = (codePath, scenarioUuid) => {
  const fullPath = path.resolve(codePath)

  module.paths.push(path.join(fullPath, 'node_modules'))

  return globby([
    `${fullPath}/*.js`,
    `!${fullPath}/node_modules`,
    `!${fullPath}/*.test.js`,
    `!${fullPath}/*.spec.js`
  ]).then(files =>
    files
      .reduce(async (acc, f) => {
        let code = await readFileAsync(f)

        let exports = {}
        let sandbox = { module: { exports } }

        const script = new vm.Script(`((require) => {${code.toString()}})`)
        vm.createContext(sandbox)

        try {
          script.runInContext(sandbox)(module.require.bind(module))
        } catch (e) {
          console.log(e)
        }
        if (exports.intentName)
          acc.then(config =>
            config.intents.push({
              [exports.intentName]: `index.${exports.intentName}`
            })
          )
        return acc
      }, Promise.resolve({ integration_uuid: scenarioUuid, intents: [] }))
      .then(async config => {
        try {
          config.auth = JSON.parse(
            await readFileAsync(path.join(fullPath, AUTH_CONFIG_FILE))
          )
          return config
        } catch (e) {
          console.log(e)
        }
      })
  )
}
