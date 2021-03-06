import { Component, Event, EventEmitter, Prop } from '@bearer/core'

type TPullRequest = {
  name: string
  status: 'open' | 'closed'
}

type TPayloadEvent = {
  something: TPullRequest
  somethingElse: string
  anEnum: 'ok' | 'ko'
}
@Component({
  tag: 'complex-feature-display'
})
export class FeatDisplayComponent {
  @Prop()
  noInitializer: string
  @Prop()
  aStringProp: string = 'ok'
  @Prop()
  aNumberProp: number = 5

  // assuming event-name-scoping already passed
  @Event({ eventName: 'bearer:1234-integration-name:complex-feature:namedEvent' })
  namedEvent: EventEmitter
  @Event()
  nonTypedEvent: EventEmitter

  @Event()
  typedEvent: EventEmitter<{ pullRequest: TPullRequest; aNumber: number; anEnum: 'ok' | 'ko' }>

  @Event()
  typedEventWithType: EventEmitter<TPayloadEvent>
  @Event()
  typedEventWithTypeArray: EventEmitter<string[]>
  @Event()
  typedEventWithTypeString: EventEmitter<string>
  @Event()
  typedEventWithTypeNumber: EventEmitter<number>
  @Event()
  typedEventWithTypeBoolean: EventEmitter<boolean>
}
