const fs = require('fs')
const request = require('request')
const PATH = 'items'

const readConfig = configFile =>
  new Promise((resolve, reject) =>
    fs.readFile(configFile, (err, data) => {
      if (err) reject(err)
      else resolve(JSON.parse(data))
    })
  )

const put = (url, body) =>
  new Promise((resolve, reject) => {
    request(
      {
        method: 'POST',
        uri: url + PATH,
        json: true,
        body
      },
      (err, res, body) => {
        if (err) reject(err)
        else resolve(body)
      }
    )
  })

module.exports = async (configFile, { ApiRouterUrl }, emitter) => {
  try {
    const { clientID, clientSecret } = await readConfig(configFile)
    if (clientID && clientSecret) {
      const {
        Item: { referenceId }
      } = await put(ApiRouterUrl, {
        clientID,
        clientSecret
      })
      emitter.emit('storeCredentials:success', referenceId)
    } else {
      emitter.emit('storeCredentials:missingCredentials', configFile)
    }
  } catch (e) {
    emitter.emit('storeCredentials:failure', e)
  }
}
