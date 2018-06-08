import {
  Component,
  State,
  Element,
  Event,
  EventEmitter,
  Prop
} from '@stencil/core'
import Bearer, { BearerState } from '@bearer/core'

interface ConfigSetupData {
  Item: {
    clientId: string
    referenceId: string
  }
}

@Component({
  tag: 'bearer-setup',
  styleUrl: 'setup.scss',
  shadow: true
})
export class BearerSetup {
  @State()
  inputs: { clientID: string; clientSecret: string } = {
    clientID: '',
    clientSecret: ''
  }
  @Element() element: HTMLElement
  @Event() stepCompleted: EventEmitter
  @Prop() scenarioId: string = ''
  @State() error: boolean = false

  handleSubmit = (e: any) => {
    e.preventDefault()
    // we trick the system for the moment and we don't give a shit
    // the intentName is the reference ID
    BearerState.storeSecret(this.scenarioId, {
      clientID: this.inputs.clientID,
      clientSecret: this.inputs.clientSecret
    })
      // .then(() => {
      //   this.error = false
      //   return BearerState.storeData(`${this.scenarioId}-setup`, {
      //     clientId: this.inputs.clientID
      //   })
      // })
      .then((data: ConfigSetupData) => {
        Bearer.emitter.emit(`setup_success:${this.scenarioId}`, {
          // clientID: this.inputs.clientID,
          referenceID: data.Item.referenceId
        })
      })
      .catch(() => {
        this.error = true
        Bearer.emitter.emit(`setup_error:${this.scenarioId}`, {})
      })
  }

  handleValue(field, value) {
    this.inputs[field] = value.detail
  }

  componentDidLoad() {
    BearerState.getData(this.scenarioId)
      .then(data => {
        console.debug('[BEARER]', 'get_setup_success', data)
        Bearer.emitter.emit(`setup_success:${this.scenarioId}`, {
          referenceID: this.scenarioId
        })
      })
      .catch(e => {
        console.error('[BEARER]', 'get_setup_error', e)
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.error && (
          <bearer-alert kind="danger">
            [Error] Unable to store the credentials
          </bearer-alert>
        )}
        <bearer-input
          type="text"
          controlName="clientID"
          label="Client ID"
          value={this.inputs.clientID}
          onValueChange={value => this.handleValue('clientID', value)}
        />
        <bearer-input
          type="password"
          controlName="clientSecret"
          label="Client Secret"
          value={this.inputs.clientSecret}
          onValueChange={value => this.handleValue('clientSecret', value)}
        />
        <bearer-input type="submit" onSubmit={this.handleSubmit} />
      </form>
    )
  }
}
