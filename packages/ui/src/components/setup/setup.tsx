import {
  Component,
  State,
  Element,
  Event,
  EventEmitter,
  Prop
} from '@stencil/core'
import Bearer, { BearerState } from '@bearer/core'
import { FieldSet } from '../Forms/Fieldset'
import { BearerOAuth2Setup, BearerEmailSetup } from './setup-types'

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
  @Prop() type: 'oauth2' | 'email'
  @Prop() referenceId: string

  @State() fields: FieldSet
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
      clientID: this.fields.getValue('clientID'),
      clientSecret: this.fields.getValue('clientSecret')
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
    this.fields[field] = value.detail
  }

  componentDidLoad() {
    // Load form according to type
    switch (this.type) {
      case 'oauth2':
        this.fields = BearerOAuth2Setup.fields
        break
      case 'email':
        this.fields = BearerEmailSetup.fields
        break
    }

    const form = this.element.shadowRoot.querySelector('bearer-form')
    BearerState.getData(this.scenarioId)
      .then(data => {
        this.fields.setValue('clientID', 'bob-the-great')
        this.fields.setValue('clientSecret', 'jaojdoisajdoisa')
        form.updateFieldSet(this.fields)
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
        {this.loading ? (
          <bearer-loading />
        ) : (
          <bearer-form
            fields={this.fields}
            clearOnInput={true}
            onSubmit={this.handleSubmit}
          />
        )}
      </div>
    )
  }
}
