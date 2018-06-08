/*
  The purpose of this component is to save scenario credentials.
*/

import { Component } from '@stencil/core'
import '@bearer/ui'

@Component({
  tag: '{{componentTagName}}-setup',
  shadow: true
})
export class {{scenarioTitle}}Setup {
  render() {
    return <bearer-setup scenario-id='BEARER_SCENARIO_ID' />
  }
}
