import { GetCollection } from '@bearer/intents'
import { CLIENT } from './client'

export default class GetHelloWorlsIntent {
  static intentName: string = 'getHelloWorlds'
  static intentType: any = GetCollection

  static action(token: string, params: any, callback: (params: any) => void) {
    CLIENT.get('/people').then(({ data }) => {
      console.log(data)
      callback({ collection: data.results })
    })
  }
}
