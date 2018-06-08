const fs = require('fs')
const AWS = require('aws-sdk') // from AWS SDK
const s3 = new AWS.S3({ signatureVersion: 'v4' })

module.exports = (packagePath, { Key, Bucket }, emitter) => {
  return new Promise((resolve, reject) => {
    emitter.emit('pushScenario:start', Key)

    fs.readFile(packagePath, (error, fileContent) => {
      // if unable to read file contents, throw exception
      if (error) reject(error)

      // upload file to S3
      s3.putObject(
        {
          Bucket,
          Key,
          ACL: 'public-read',
          Body: fileContent
        },
        (err, data) => {
          if (err) reject(err)
          else resolve(data)
        }
      )
    })
  })
}
