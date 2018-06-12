const request = require('request')
const FormData = require('form-data')

const requestPromise = (url, method, path, body, headers = {}) =>
  new Promise((resolve, reject) => {
    request(
      {
        method,
        uri: url + path,
        json: true,
        body,
        headers
      },
      (err, res) => {
        if (err) reject(err)
        else resolve(res)
      }
    )
  })

module.exports = url => {
  return {
    signup: body => requestPromise(url, 'POST', 'signup', body),
    login: body => requestPromise(url, 'POST', 'login', body),
    putItem: body => requestPromise(url, 'POST', 'items', body),
    assemblyScenario: (token, body) =>
      requestPromise(url, 'POST', 'deploy', body, { Authorization: token }),
    signedUrl: (token, Key, type) =>
      requestPromise(
        url,
        'POST',
        'signed-url',
        { Key, type },
        { Authorization: token }
      ),
    upload: (content, headers = {}) =>
      new Promise((resolve, reject) => {
        request(
          {
            method: 'PUT',
            url,
            body: content,
            headers
          },
          (err, data) => {
            if (err) {
              reject(err)
            } else resolve(data)
          }
        )
      })
  }
}
