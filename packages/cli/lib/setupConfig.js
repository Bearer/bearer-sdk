const findUp = require('find-up')
const rc = require('rc')
const os = require('os')

const fs = require('fs')
const ini = require('ini')
const path = require('path')

const scenarioConfig = rc('scenario')
const bearerConfig = rc('bearer')
const rootPathRc = findUp.sync('.scenariorc')

let setup = {
  DeploymentUrl: 'https://developer.staging.bearer.sh/v1/',
  ApiRouterUrl: 'https://int.staging.bearer.sh/api/v1/'
}

module.exports = () => {
  const { BEARER_ENV } = process.env

  if (BEARER_ENV === 'dev') {
    setup = {
      DeploymentUrl: 'https://developer.dev.bearer.sh/v1/',
      ApiRouterUrl: 'https://int.dev.bearer.sh/api/v1/'
    }
  }

  return {
    ...setup,
    Bucket: 'vanilla-deployments',
    Path: 'deploy',
    HandlerBase: 'index.js',
    bearerConfig,
    scenarioConfig,
    rootPathRc,
    storeBearerConfig(config) {
      fs.writeFileSync(
        this.bearerConfig.config || path.join(os.homedir(), '.bearerrc'),
        ini.stringify(config)
      )
    }
  }
}
