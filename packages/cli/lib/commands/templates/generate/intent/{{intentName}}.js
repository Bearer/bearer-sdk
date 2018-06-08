const { {{intentType}} } = require("@bearer/intents");

module.exports.action = (token, params, callback) => {
  //... your code goes here
  // sample code for type GetCollection
  // callback({ collection: ["Christopher Robin", "Kanga", "Tigger", "heffalump", "kessie"] })
  //
  // sample code for type GetObject
  // callback({ object: { name: "Christoper Robin", race: "human", friends: ["Bears"] } })
}
module.exports.intentType = {{intentType}};
module.exports.intentName = "{{intentName}}";
