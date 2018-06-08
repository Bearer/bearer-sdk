const AWS = require('aws-sdk') // from AWS SDK
const fs = require('fs') // from node.js
const path = require('path') // from node.js
const globby = require('globby')
const mime = require('mime-types')

const BUCKET = 'bearer-lib'
const DIST_DIRECTORY = '../www'
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
const configuration = {
  s3BucketName: BUCKET,
  folderPath: path.join(__dirname, DIST_DIRECTORY)
}

console.log(process.env)
AWS.config.update({
  accessKeyId: process.env.DEMO_UI_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.DEMO_UI_AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-3'
})

const s3 = new AWS.S3({ signatureVersion: 'v4' })

s3.putBucketCors(corsParams, (err, data) => {
  if (err) console.log(err, err.stack)
  // an error occurred
  else console.log(data) // successful response
})

globby([configuration.folderPath]).then(files => {
  files.forEach(filePath => {
    const distPath = filePath.replace(configuration.folderPath + path.sep, '')
    fs.readFile(filePath, (error, fileContent) => {
      // if unable to read file contents, throw exception
      if (error) {
        throw error
      }
      console.log('Uploading', distPath)

      // upload file to S3
      s3.putObject(
        {
          Bucket: configuration.s3BucketName,
          Key: distPath,
          ACL: 'public-read',
          Body: fileContent,
          ContentType: mime.lookup(filePath)
        },
        (err, data) => {
          console.log(`Successfully uploaded '${distPath}'!`)
          console.log(JSON.stringify(data, null, 2))
        }
      )
    })
  })
})
