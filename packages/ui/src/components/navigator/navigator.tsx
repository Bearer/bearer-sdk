import { Component, Element, Listen, Prop, State } from '@bearer/core'

const NAVIGATOR_AUTH_SCREEN_NAME = 'BEARER-NAVIGATOR-AUTH-SCREEN'

@Component({
  tag: 'bearer-navigator',
  shadow: true
})
export class BearerPopoverNavigator {
  @Element()
  el: HTMLElement
  @State()
  screens: Array<any> = []
  @State()
  screenData: object = {}
  @State()
  _isVisible: boolean = false
  @State()
  _visibleScreenIndex: number
  @State()
  navigationTitle: string

  @Prop()
  direction: string = 'right'
  @Prop()
  btnProps: JSXElements.BearerButtonAttributes = { content: 'Activate' }
  @Prop()
  display = 'popover'
  @Prop()
  complete?: <T>(payload: { data: T; complete(): void }) => void

  @Listen('scenarioCompleted')
  scenarioCompletedHandler() {
    this.screenData = {}
    this.isVisible = false
    this.visibleScreen = this.hasAuthScreen() ? 1 : 0
    ;(this.el.shadowRoot.querySelector('#button') as HTMLBearerButtonPopoverElement).toggle(false)
  }

  @Listen('stepCompleted')
  stepCompletedHandler(event) {
    event.preventDefault()
    event.stopImmediatePropagation()
    this.screenData = {
      ...this.screenData,
      ...event.detail
    }
    this.next(null)
  }

  next = e => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    console.debug('[BEARER]', 'Navigator: next', this.hasNext())
    if (this.hasNext()) {
      this.visibleScreen = Math.min(this._visibleScreenIndex + 1, this.screens.length - 1)
    } else if (this.complete) {
      this.complete({ complete: this.scenarioCompletedHandler.bind(this), data: this.screenData })
    }
  }

  @Listen('navigatorGoBack')
  prev(e) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (this.hasPrevious()) {
      this.visibleScreen = Math.max(this._visibleScreenIndex - 1, 0)
    }
  }

  set isVisible(newValue: boolean) {
    if (this._isVisible !== newValue) {
      console.debug('[BEARER]', 'Navigator:isVisibleChanged', newValue)
      this._isVisible = newValue
      if (newValue) {
        this.showScreen(this.visibleScreen)
      } else {
        // this.hideScreen(this.visibleScreen)
      }
    }
  }

  get isVisible(): boolean {
    return this._isVisible
  }

  set visibleScreen(index) {
    if (this._visibleScreenIndex >= 0) {
      // tslint:disable-next-line no-accessor-recursion
      this.hideScreen(this.visibleScreen)
    }
    this._visibleScreenIndex = index
    // tslint:disable-next-line no-accessor-recursion
    this.showScreen(this.visibleScreen)
  }

  get visibleScreen(): any {
    return this.screens[this._visibleScreenIndex]
  }

  get screenNodes(): Array<HTMLBearerNavigatorScreenElement> {
    return this.el.shadowRoot
      ? ((this.el.shadowRoot.querySelector('slot:not([name])') as HTMLSlotElement)
          .assignedNodes()
          .filter((node: HTMLBearerNavigatorScreenElement) => node.willAppear) as Array<
          HTMLBearerNavigatorScreenElement
        >)
      : []
  }

  onVisibilityChange = ({ detail: { visible } }: { detail: { visible: boolean } }) => {
    console.debug('[BEARER]', 'Navigator:onVisibilityChange', visible)
    this.isVisible = visible
    if (!this.isVisible) {
      this.visibleScreen = this.hasAuthScreen() ? 1 : 0
    }
  }

  showScreen = screen => {
    console.debug('[BEARER]', 'showScreen', screen, this.isVisible)
    if (screen && this.isVisible) {
      screen.willAppear(this.screenData)
      this.navigationTitle = screen.getTitle()
      screen.classList.add('in')
    }
  }

  hideScreen = screen => {
    if (screen) {
      screen.willDisappear()
      screen.classList.remove('in')
    }
  }

  hasNext = () => this._visibleScreenIndex < this.screens.length - 1
  hasPrevious = () => this._visibleScreenIndex > 0
  hasAuthScreen = () => this.screenNodes.filter(node => node.tagName === NAVIGATOR_AUTH_SCREEN_NAME).length

  componentDidLoad() {
    console.debug('[BEARER]', 'Navigator: componentDidLoad ')
    this.screens = this.screenNodes
    this._visibleScreenIndex = 0
  }

  render() {
    return (
      <bearer-button-popover
        btnProps={this.btnProps}
        id="button"
        direction={this.direction}
        header={this.navigationTitle}
        backNav={this.hasPrevious()}
        onVisibilityChange={this.onVisibilityChange}
      >
        <slot />
      </bearer-button-popover>
    )
  }
}
