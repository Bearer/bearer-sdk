class BearerContext {
  constructor() {
    console.log('[BEARER]', 'BearerContext init')
  }

  private _setupId: string
  private _configId: string

  get setupId(): string {
    return this._setupId
  }

  set setupId(setupId) {
    console.log('[BEARER]', 'setSetupId', setupId)
    this._setupId = setupId
  }
  
  get configId(): string {
    return this._configId
  }

  set configId(configId) {
    console.log('[BEARER]', 'setConfigId', configId)
    this._configId = configId
  }
}

export default new BearerContext()
