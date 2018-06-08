var lambda = {
  sendSuccessMessage: (callback, json) => {
    callback(null, json)
  },
  sendErrorMessage: (callback, json) => {
    callback(null, json)
  }
}

module.exports = lambda
