const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

const updateUser = (
  servicesTable,
  uuid,
  { serviceName, userId, accessToken, refreshToken, expiresIn, updatedAt }
) => {
  const updateParams = {
    TableName: servicesTable,
    Key: {
      nameUserId: uuid
    },
    UpdateExpression:
      'set serviceName=:serviceName, userId=:userId, accessToken=:accessToken, refreshToken=:refreshToken, expiresIn=:expiresIn, updatedAt=:updatedAt',
    ExpressionAttributeValues: {
      ':serviceName': serviceName,
      ':userId': userId,
      ':accessToken': accessToken,
      ':refreshToken': refreshToken,
      ':expiresIn': expiresIn,
      ':updatedAt': updatedAt
    },
    ReturnValues: 'ALL_NEW'
  }

  return dynamoDb.update(updateParams).promise()
}

const getConfig = (integrationConfigTable, uuid) => {
  const getParams = {
    TableName: integrationConfigTable,
    Key: {
      integrationUuid: uuid
    }
  }

  return dynamoDb.get(getParams).promise()
}

module.exports = { updateUser, getConfig }
