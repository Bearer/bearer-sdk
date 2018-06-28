const serviceClient = require('./serviceClient')

module.exports = (
  scenarioTitle,
  emitter,
  {
    DeploymentUrl,
    bearerConfig: {
      authorization: {
        AuthenticationResult: { IdToken: token }
      }
    }
  }
) => {
  const deploymentClient = serviceClient(DeploymentUrl)
  emitter.emit('assemblyScenario:start')

  return deploymentClient
    .assemblyScenario(token, { bucketKey: scenarioTitle })
    .then(response => {
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
