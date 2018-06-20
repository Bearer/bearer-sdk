import {
  Component,
  Prop,
  State,
  Event,
  Listen,
  Method,
  EventEmitter
} from '@stencil/core'
import { FieldSet } from './Fieldset'

@Component({
  tag: 'bearer-form',
  styleUrl: './Form.scss',
  shadow: true
})
export class BearerForm {
  @Prop({ mutable: true })
  fields: FieldSet
  @Event() submit: EventEmitter
  @State() values: Array<string> = []

  handleSubmit() {
    this.submit.emit(this.fields)
  }

  handleValue(field: string, value: any) {
    if (value) {
      this.fields.setValue(field, value.detail)
    }
  }

  @Method()
  updateFieldSet(fields: FieldSet) {
    this.fields = fields
    this.updateValues(fields)
  }

  @Listen('keydown.enter')
  handleScroll() {
    this.submit.emit(this.fields)
  }

  updateValues(fieldset: FieldSet) {
    this.values = []
    fieldset.map(el => {
      this.values.push(el.value)
      return el
    })
  }

  componentDidLoad() {
    this.updateValues(this.fields)
  }

  renderInputs() {
    return this.fields.map((input, index) => {
      switch (input.type) {
        case 'text':
        case 'password':
        case 'email':
        case 'tel':
        case 'submit':
          return (
            <bearer-input
              type={input.type}
              label={input.label}
              controlName={input.controlName}
              value={this.values[index]}
              hint={input.hint}
              placeholder={input.placeholder}
              onValueChange={value =>
                this.handleValue(input.controlName, value)
              }
            />
          )
        case 'textarea':
          return (
            <bearer-textarea
              label={input.label}
              controlName={input.controlName}
              value={this.values[index]}
              hint={input.hint}
              placeholder={input.placeholder}
              onValueChange={value =>
                this.handleValue(input.controlName, value)
              }
            />
          )
        case 'radio':
          return (
            <bearer-radio
              label={input.label}
              controlName={input.controlName}
              value={this.values[index]}
              buttons={input.buttons}
              inline={input.inline}
              onValueChange={value =>
                this.handleValue(input.controlName, value)
              }
            />
          )
        case 'checkbox':
          return (
            <bearer-checkbox
              label={input.label}
              controlName={input.controlName}
              value={input.valueList}
              buttons={input.buttons}
              inline={input.inline}
              onValueChange={value =>
                this.handleValue(input.controlName, value)
              }
            />
          )
        case 'select':
          return (
            <bearer-select
              label={input.label}
              controlName={input.controlName}
              value={this.values[index]}
              options={input.options}
              onValueChange={value =>
                this.handleValue(input.controlName, value)
              }
            />
          )
      }
    })
  }

  render() {
    return (
      <form onSubmit={() => this.handleSubmit()}>
        {this.renderInputs()}
        <bearer-input type="submit" onSubmit={() => this.handleSubmit()} />
      </form>
    )
  }
}
