import { Component, Prop, Element, Event, EventEmitter } from '@stencil/core'

@Component({
  tag: 'bearer-select',
  styleUrl: './Select.scss',
  shadow: true
})
export class BearerSelect {
  @Element() el: HTMLElement
  @Prop() label?: string
  @Prop() controlName: string
  @Prop({ mutable: true })
  value: string
  @Prop()
  options: Array<{ label: string; value: string; default?: boolean }> = []
  @Event() valueChange: EventEmitter

  inputClicked(event) {
    this.valueChange.emit(event.path[0].value)
  }

  render() {
    return (
      <div class="form-group">
        {this.label ? <label>{this.label}</label> : ''}
        <select class="form-control">
          {this.options.map(value => {
            return (
              <option
                value={value.value}
                selected={this.value === value.value ? true : false}
                onClick={this.inputClicked.bind(this)}
              >
                {value.label}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}
