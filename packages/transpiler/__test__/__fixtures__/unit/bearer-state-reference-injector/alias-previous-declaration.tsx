import { SaveStateIntent, BearerFetch, Element } from '@bearer/core'

class AddHTMLElementReference {
  @Element() element: HTMLElement
  @SaveStateIntent() fetcher: BearerFetch
}
