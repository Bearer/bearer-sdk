import {
  Component,
  State,
  Element,
  Event,
  EventEmitter,
  Prop
} from '@stencil/core'
import Bearer, { BearerState } from '@bearer/core'
import { FieldSet, FieldType } from '../Forms/Fieldset'

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
  inputs: FieldSet = new FieldSet([
    {
      label: 'Client ID',
      type: FieldType.TEXT,
      value: '',
      controlName: 'clientID'
    },
    {
      label: 'Client Secret',
      type: FieldType.PASSWORD,
      value: '',
      controlName: 'clientSecret'
    }
  ])
  @Element() element: HTMLElement
  @Event() stepCompleted: EventEmitter
  @Prop() scenarioId: string = ''
  @State() error: boolean = false
  @State() loading: boolean = false

  handleSubmit = (e: any) => {
    e.preventDefault()
    this.loading = true
    // we trick the system for the moment and we don't give a shit
    // the intentName is the reference ID
    BearerState.storeSecret(this.scenarioId, {
      clientID: this.inputs[0].value,
      clientSecret: this.inputs[1].value
    })
      // .then(() => {
      //   this.error = false
      //   return BearerState.storeData(`${this.scenarioId}-setup`, {
      //     clientId: this.inputs.clientID
      //   })
      // })
      .then((data: ConfigSetupData) => {
        this.loading = false
        Bearer.emitter.emit(`setup_success:${this.scenarioId}`, {
          // clientID: this.inputs.clientID,
          referenceID: data.Item.referenceId
        })
      })
      // .then()
      .catch(() => {
        this.error = true
        this.loading = false
        Bearer.emitter.emit(`setup_error:${this.scenarioId}`, {})
      })
  }

  handleValue(field, value) {
    this.inputs[field] = value.detail
  }

  componentDidLoad() {
    BearerState.getData(this.scenarioId)
      .then(data => {
        this.inputs.setValue('clientID', 'bob-the-great')
        // this.inputs.setValue('clientSecret', 'jaojdoisajdoisa')
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
      <div>
        {this.error && (
          <bearer-alert kind="danger">
            [Error] Unable to store the credentials
          </bearer-alert>
        )}
        {this.loading && <bearer-loading />}
        {!this.loading && (
          <bearer-form fields={this.inputs} onSubmit={this.handleSubmit} />
        )}
      </div>
    )
  }
}
