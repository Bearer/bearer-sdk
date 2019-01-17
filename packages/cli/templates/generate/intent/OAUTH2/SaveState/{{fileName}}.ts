import { TOAUTH2AuthContext, TSaveStatePayload, SaveState, TSaveActionEvent } from '@bearer/intents'
// Uncomment this line if you need to use Client
// import Client from './client'

export default class {{intentClassName}}Intent {
  static intentType = SaveState

  static async action(event: TSaveActionEvent<TOAUTH2AuthContext, State, Params>): Promise<ReturnedData> {
    // const token = event.context.authAccess.accessToken
    // Put your logic here
    return { state: [], data: [] }
  }
}

/**
 * Typing
 */
export type Params = {
  // name: string
}

export type State = {
  // foo: string[]
}

export type ReturnedData = TSaveStatePayload<State, {
  // foo: string[]
}>