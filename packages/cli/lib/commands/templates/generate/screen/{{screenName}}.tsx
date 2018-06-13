import { Component, BearerComponent, Intent, BearerFetch } from '@bearer/core'

@BearerComponent
@Component({
  tag: '{{componentTagName}}',
  styleUrl: '{{screenName}}.css',
  shadow: true
})
export class {{screenName}} {
  render() {
    return (
      <div class="root">
        <bearer-typography as="h2" style="h2">
          {{screenName}} Component
        </bearer-typography>
      </div>
    )
  }
}
