const { getRepositories } = require('./github')
const { GetCollection } = require('@bearer/intents')

module.exports.action = getRepositories
module.exports.intentType = GetCollection
module.exports.intentName = 'getRepositories'
