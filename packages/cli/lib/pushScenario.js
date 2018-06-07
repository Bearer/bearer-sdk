const serviceClient = require('./serviceClient')
const fs = require('fs')

module.exports = (packagePath, { Key }, emitter, { token, DeploymentUrl }) =>
  new Promise(async (resolve, reject) => {
    emitter.emit('pushScenario:start', Key)

    try {
      const deploymentServiceClient = serviceClient(DeploymentUrl)

      const res = await deploymentServiceClient.signedUrl(token, Key, 'intent')
      const url = res.body
      const s3Client = serviceClient(url)
      const artifact = fs.readFileSync(packagePath)
      const response = await s3Client.upload(artifact)
      resolve(response)
    } catch (e) {
      emitter.emit('pushScenario:error', e)
      reject(e)
    }
  })
