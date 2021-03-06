import { BearerRef, Input, RootComponent, State, Prop } from '@bearer/core'

type Farmer = {
  id: string
  name: string
}

type Sponge = {
  id: unknown
  name: unknown
}

@RootComponent({
  name: 'no-options'
})
class NoOptionsComponent {
  @Input()
  farmer: BearerRef<Farmer>

  @Input()
  aString: BearerRef<string> = 'ok'

  @Input()
  aStringWithoutInitializer: BearerRef<string>

  @Input()
  object: BearerRef<{ title: string }> = { title: 'Guest' }

  @Input()
  objectWithoutInitializer: BearerRef<{ title: string }>

  @Input({
    group: 'other-group',
    propertyReferenceIdName: 'patrick',
    functionReferenceIdKeyName: 'functionReferenceIdKeyNameOption',
    eventName: 'patrickWasKilled',
    functionName: 'killPatrick',
    autoLoad: false,
    functionArguments: ['farmer', 'spongeBobOverrided', 'authId']
  })
  spongeBob: BearerRef<Sponge>

  @Input({
    propertyReferenceIdName: 'refNotOverrided'
  })
  spongeBobOverrided: BearerRef<Sponge>
  // won't be injected by the transfomer
  @State() refNotOverrided: string
}
