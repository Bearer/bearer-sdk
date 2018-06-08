const { GetCollection } = require("@bearer/intents");

module.exports.action = (token, params, callback) => {
  callback({ collection: ["hello world", "Bonjour le monde", "Witaj świecie", "hello ao", "こんにちは世界"] })
}
module.exports.intentType = GetCollection;
module.exports.intentName = "getHelloWorlds";
