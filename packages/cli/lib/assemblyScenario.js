const { promisify } = require('util')
const requestAsync = promisify(require('request'))

module.exports = (scenarioTitle, emitter, { Bucket, Path, DeploymentUrl }) => {
  const options = {
    uri: DeploymentUrl + Path,
    method: 'POST',
    json: true,
    body: { bucketKey: scenarioTitle, bucketName: Bucket }
  }

  emitter.emit('assemblyScenario:start')

  return requestAsync(options)
    .then((response, body) => {
      if (response.statusCode === 201) {
        emitter.emit('assemblyScenario:success', response.body)
      } else {
        emitter.emit('assemblyScenario:failed', response)
      }
    })
    .catch(err => {
      emitter.emit('assemblyScenario:error', err)
    })
}
