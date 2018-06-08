import { Component, Prop, Event, EventEmitter } from '@stencil/core'

@Component({
  tag: 'bearer-form',
  styleUrl: './Form.scss',
  shadow: true
})
export class BearerForm {
  @Prop() fields: Array<any>
  @Event() submit: EventEmitter

  handleSubmit() {
    this.submit.emit(this.fields)
  }

  handleValue(field: string, value: any) {
    if (value) {
      const index = this.fields.findIndex(el => el.controlName === field)
      this.fields[index].value = value.detail
    }
  }

  render() {
    return (
      <form onSubmit={() => this.handleSubmit()}>
        {this.fields.map(input => {
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
                  value={input.value}
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
                  value={input.value}
                  hint={input.hint}
                  placeholder={input.placeholder}
                  onValueChange={value =>
                    this.handleValue(input.controlName, value)
                  }
                />
              )
          }
        })}
        <bearer-input type="submit" onSubmit={() => this.handleSubmit()} />
      </form>
    )
  }
}
