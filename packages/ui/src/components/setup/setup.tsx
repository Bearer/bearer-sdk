import Bearer, {
  Component,
  State,
  Element,
  Event,
  EventEmitter,
  Prop,
  BearerState
} from '@bearer/core'
import { FieldSet } from '../Forms/Fieldset'
import { OAuth2SetupType, EmailSetupType, KeySetupType } from './setup-types'

type TSetupPayload = {
  Item: { referenceId: string }
}

@Component({
  tag: 'bearer-setup',
  styleUrl: 'setup.scss',
  shadow: true
})
export class BearerSetup {
  @Prop() fields: Array<any> | string = []
  @Prop() referenceId: string
  @Prop() scenarioId: string

  @Element() element: HTMLElement
  @Event() stepCompleted: EventEmitter

  @State() fieldSet: FieldSet
  @State() error: boolean = false
  @State() loading: boolean = false

  handleSubmit = (e: any) => {
    e.preventDefault()
    this.loading = true
    const formSet = this.fieldSet.map(el => {
      return { key: el.controlName, value: el.value }
    })
    BearerState.storeSetup(
      formSet.reduce(
        (acc, obj) => ({ ...acc, [obj['key']]: obj['value'] }),
        {}
      )
    )
      .then((item: TSetupPayload) => {
        this.loading = false
        console.log(`${this.scenarioId}`)
        Bearer.emitter.emit(`setup_success:${this.scenarioId}`, {
          referenceID: item.Item.referenceId
        })
      })
      .catch(() => {
        this.error = true
        this.loading = false
        Bearer.emitter.emit(`setup_error:${this.scenarioId}`, {})
      })
  }

  componentWillLoad() {
    if (typeof this.fields !== 'string') {
      this.fieldSet = new FieldSet(this.fields as Array<any>)
      return
    }
    switch (this.fields) {
      case 'email':
        this.fieldSet = new FieldSet(EmailSetupType)
        break
      case 'type':
        this.fieldSet = new FieldSet(KeySetupType)
        break
      case 'oauth2':
      default:
        this.fieldSet = new FieldSet(OAuth2SetupType)
    }
  }

  render() {
    return [
      this.error && (
        <bearer-alert kind="danger">
          [Error] Unable to store the credentials
        </bearer-alert>
      ),
      this.loading ? (
        <bearer-loading />
      ) : (
        <bearer-form
          fields={this.fieldSet}
          clearOnInput={true}
          onSubmit={this.handleSubmit}
        />
      )
    ]
  }
}
