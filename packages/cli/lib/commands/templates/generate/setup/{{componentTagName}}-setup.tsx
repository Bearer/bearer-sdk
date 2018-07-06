/*
  The purpose of this component is to save scenario credentials.
  This file has been generated automatically and should not be edited.
*/

import { Component, State } from '@bearer/core'
import '@bearer/ui'

@Component({
  tag: '{{componentTagName}}-setup',
  shadow: true
})
export class {{scenarioTitle}}Setup {
  @State() fields = {{fields}}
  @State() innerListener = `setup_success:BEARER_SCENARIO_ID`
  render() {
    return (
      <div>
        <bearer-dropdown-button innerListener={this.innerListener}>
          <span slot="buttonText">Setup component</span>
          <bearer-setup scenarioId="BEARER_SCENARIO_ID" fields={this.fields} />
        </bearer-dropdown-button>
      </div>
    )
  }
}

