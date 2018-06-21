import { GetCollection } from '@bearer/intents'

export default class GetHelloWorlsIntent {
  static intentName: string = 'getHelloWorlds'
  static intentType: any = GetCollection

  static action(token: string, params: any, callback: (params: any) => void) {
    callback({
      collection: [
        'hello world',
        'Bonjour le monde',
        'Witaj świecie',
        'hello ao',
        'こんにちは世界'
      ]
    })
  }
}
