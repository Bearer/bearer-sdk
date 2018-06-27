import Bearer, { Component, State } from '@bearer/core'

@Component({
  tag: 'app-setup',
  styleUrl: 'app-setup.scss'
})
export class AppSetup {
  @State() scenarioId: string = 'alice-setup-demo'
  @State() fields = 'oauth2'
  @State() referenceID: string

  scenarioIdChanged = ({ detail }) => {
    this.scenarioId = detail
  }

  /*
    Put referenceID in localStorage
    This is an easy way but probably not the most secure.
   */
  componentWillLoad() {
    this.referenceID = window.localStorage.getItem('fakeReference') || ''
  }

  componentDidLoad() {
    /*
      Successful setup Listener
      When a successful setup is done, a Bearer.emission is made
      Here is how to capture the referenceID
     */
    Bearer.emitter.addListener(`setup_success:${this.scenarioId}`, data => {
      window.localStorage.setItem('fakeReference', data.referenceID)
      this.referenceID = data.referenceID
    })
  }

  render() {
    const innerListener = `BEARER_SCENARIO_ID:setup_success:${this.scenarioId}`
    return (
      <div class="padded">
        <bearer-typography kind="h4">Setup Component</bearer-typography>
        <bearer-dropdown-button innerListener={innerListener}>
          <span slot="buttonText">Setup Scenario</span>
          <bearer-setup
            scenarioId={this.scenarioId}
            fields={this.fields}
            referenceId={this.referenceID}
          />
        </bearer-dropdown-button>
        <div class="down">
          <bearer-typography kind="h4">Setup Display</bearer-typography>
          <bearer-setup-display scenarioId={this.scenarioId} />
        </div>
      </div>
    )
  }
}
