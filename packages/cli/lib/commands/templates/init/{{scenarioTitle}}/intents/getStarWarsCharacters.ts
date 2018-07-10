import { GetCollection, TContext } from '@bearer/intents'
import { CLIENT } from './client'

export default class GetStarWarsCharacters {
  static intentName: string = 'getStarWarsCharacters'
  static intentType: any = GetCollection

  static action(
    context: TContext,
    params: any,
    callback: (params: any) => void
  ) {
    CLIENT.get('/people').then(({ data }) => {
      callback({ collection: data.results })
    })
  }
}
