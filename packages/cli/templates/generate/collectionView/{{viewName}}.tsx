import { Component, Intent, BearerFetch } from '@bearer/core'

@Component({
  tag: '{{componentTagName}}',
  styleUrl: '{{viewName}}.css',
  shadow: true
})
export class {{viewName}} {
  @Intent('{{viewName}}') fetcher: BearerFetch
  render() {
    return <bearer-scrollable fetcher={this.fetcher} />
  }
}