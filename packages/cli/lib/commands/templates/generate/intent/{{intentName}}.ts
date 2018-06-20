const { {{intentType}} } = require("@bearer/intents");

export default class {{intentName}}Intent {
  static intentName: string = '{{intentName}}'
  static intentType: any = {{intentType}}

  static action(token: string, params: any, callback: (params: any) => void) {
    //... your code goes here
    // sample code for type GetCollection
    // callback({ collection: ["Christopher Robin", "Kanga", "Tigger", "heffalump", "kessie"] })
    //
    // sample code for type GetObject
    // callback({ object: { name: "Christoper Robin", race: "human", friends: ["Bears"] } })
  }
}

