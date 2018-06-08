const AWS = require('aws-sdk') // from AWS SDK
const fs = require('fs') // from node.js
const path = require('path') // from node.js
const globby = require('globby')
const mime = require('mime-types')
const rc = require('rc')
const { UPLOAD_BUCKET: BUCKET } = require('./commands/constants')

const DIST_DIRECTORY = 'dist'
const WWW_DIRECTORY = 'www'

const corsParams = {
  Bucket: BUCKET,
  CORSConfiguration: {
    CORSRules: [
      {
        AllowedHeaders: ['*'],
        AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE'],
        AllowedOrigins: ['*']
      }
    ]
  }
}

const pushScreens = async (screensDirectory, bucketPrefix, emitter) => {
  const configuration = {
    s3BucketName: BUCKET,
    distPath: path.join(screensDirectory, DIST_DIRECTORY),
    wwwPath: path.join(screensDirectory, WWW_DIRECTORY)
  }

  // initialize S3 client
  const s3 = new AWS.S3({ signatureVersion: 'v4' })

  // TODO: we don't care about the cors at the moment
  // await s3.putBucketCors(corsParams, function(err, data) {
  //   if (err) console.log(err, err.stack)
  //   else
  //     // an error occurred
  //     console.log(data) // successful response
  // })
  const files = await globby([configuration.distPath, configuration.wwwPath])

  emitter.emit('screen:upload:start')
  return new Promise(async (resolve, reject) => {
    await files.forEach(async filePath => {
      const distPath = filePath.replace(screensDirectory + path.sep, '')
      await fs.readFile(filePath, async (error, fileContent) => {
        try {
          await s3
            .putObject({
              Bucket: configuration.s3BucketName,
              Key: `${bucketPrefix}/${distPath}`,
              ACL: 'public-read',
              Body: fileContent,
              ContentType: mime.lookup(filePath)
            })
            .promise()
        } catch (e) {
          emitter.emit('screen:fileUpload:failure', distPath)
          reject(e)
        }
      })
    })
    resolve('success')
  })
}

module.exports = pushScreens
