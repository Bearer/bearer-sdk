import { Component } from '@stencil/core'

import { BearerComponent, Intent, BearerFetch } from '@bearer/core'

@BearerComponent
@Component({
  tag: 'hello-world',
  styleUrl: 'HelloWorld.css',
  shadow: true
})
export class HelloWorld {
  @Intent('getHelloWorlds') fetcher: BearerFetch

  render() {
    return (
      <div class="root">
        <bearer-typography kind="h4" as="h1">Hello from your first scenario</bearer-typography>
        <bearer-paginator
          fetcher={this.fetcher}
          perPage={10}
          renderCollection={ collection => (
            <bearer-navigator-collection
              data={collection}
              renderFunc={item => item}
            />
          )}
        />
      </div>
    )
  }
}
