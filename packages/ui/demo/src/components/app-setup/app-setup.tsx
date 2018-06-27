import Bearer, { Component, State } from '@bearer/core'

@Component({
  tag: 'app-setup',
  styleUrl: 'app-setup.scss'
})
export class AppSetup {
  @State() scenarioId: string = 'alice-setup-demo'
  @State()
  fields = [
    {
      type: 'text',
      label: 'Some text',
      controlName: 'ulogin'
    },
    {
      type: 'select',
      label: 'Your region',
      controlName: 'region',
      options: [
        {
          label: 'Africa',
          value: 'africa'
        },
        {
          label: 'America',
          value: 'america'
        },
        {
          label: 'Asia',
          value: 'asia'
        },
        {
          label: 'Europe',
          value: 'europe'
        },
        {
          label: 'Oceania',
          value: 'oceania'
        }
      ]
    },
    {
      type: 'password',
      label: 'Your password',
      controlName: 'passwd'
    }
  ]
  @State() referenceID: string

  scenarioIdChanged = ({ detail }) => {
    this.scenarioId = detail
  }

  componentWillLoad() {
    this.referenceID = window.localStorage.getItem('fakeReference') || ''
  }

  componentDidLoad() {
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
