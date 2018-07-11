class BearerContext {
  constructor() {
    console.log('[BEARER]', 'BearerContext init')
  }

  private _setupId: string

  get setupId(): string {
    return this._setupId
  }

  set setupId(setupId) {
    console.log('[BEARER]', 'setSetupId', setupId)
    this._setupId = setupId
  }
}

export default new BearerContext()
