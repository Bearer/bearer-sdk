import { State, Component, Prop, Method } from '@bearer/core'
import WithAuthentication, { IAuthenticated, WithAuthenticationMethods } from '../../decorators/withAuthentication'
@WithAuthentication()
@Component({
  tag: 'bearer-authorized'
})
export class BearerAuthorized extends WithAuthenticationMethods implements IAuthenticated {
  @State() authorized: boolean = null
  @State() sessionInitialized: boolean = false
  @Prop() renderUnauthorized: () => any
  @Prop() renderAuthorized: () => void
  @Prop({ context: 'bearer' })
  bearerContext: any

  onAuthorized = () => {
    this.authorized = true
  }

  onRevoked = () => {
    this.authorized = false
  }

  onSessionInitialized = () => {
    this.sessionInitialized = true
  }

  @Method()
  authenticate() {
    this.authenticate.bind(this)()
  }

  @Method()
  revoke() {
    this.revoke.bind(this)()
  }

  render() {
    if (!this.sessionInitialized || this.authorized === null) {
      return null
    }
    if (!this.authorized) {
      return this.renderUnauthorized ? this.renderUnauthorized() : 'Unauthorized'
    }
    return this.renderAuthorized ? this.renderAuthorized() : <slot />
  }
}
