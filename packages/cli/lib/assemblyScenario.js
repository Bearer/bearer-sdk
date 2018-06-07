const serviceClient = require('./serviceClient')

module.exports = (scenarioTitle, emitter, { Bucket, DeploymentUrl }) => {
  const deploymentClient = serviceClient(DeploymentUrl)
  emitter.emit('assemblyScenario:start')

  return deploymentClient
    .assemblyScenario({ bucketKey: scenarioTitle, bucketName: Bucket })
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
