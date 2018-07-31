import { SaveStateIntent, BearerFetch, Element } from '@bearer/core'

class AddHTMLElementReference {
  @Element() el: HTMLElement
  @SaveStateIntent() fetcher: BearerFetch
}
