const { sendSuccessMessage, sendErrorMessage } = require('./lambda')

const Intent = {
  getCollection: (callback, { collection }) => {
    if (collection) {
      sendSuccessMessage(callback, collection)
    } else {
      sendErrorMessage(callback, { error: 'Error' })
    }
  },

  getObject: (callback, { object }) => {
    if (object) {
      sendSuccessMessage(callback, object)
    } else {
      sendErrorMessage(callback, { error: 'Error' })
    }
  }
}

const StoreObject = {
  intent(action) {
    return (event, context, callback) =>
      action(
        event.accessToken,
        event.queryStringParameters,
        event.body,
        result => {
          Intent.getObject(callback, result)
        }
      )
  }
}

const GetCollection = {
  intent(action) {
    return (event, context, callback) =>
      action(event.accessToken, event.queryStringParameters, result => {
        Intent.getCollection(callback, result)
      })
  }
}

const GetObject = {
  intent(action) {
    return (event, context, callback) =>
      action(event.accessToken, event.queryStringParameters, result => {
        Intent.getObject(callback, result)
      })
  }
}

module.exports = { Intent, GetCollection, GetObject, StoreObject }
