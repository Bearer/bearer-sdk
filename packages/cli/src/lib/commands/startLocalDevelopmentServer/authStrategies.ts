import integrationsClient = require('./integrationsClient')

interface Credentials {
  client: {
    id: string
    secret: string
  }
  auth: {
    tokenHost: string
    tokenPath: string
    revokePath: string
  }
}

interface Token {
  access_token: string
  refresh_token: string
  expires_in: string
}

export class AuthStrategyFactory {
  static async authStrategy(
    integrationConfigTableId,
    integrationUuid,
    servicesTableId,
    userDataTableId
  ) {
    const configuration = new Configuration(
      integrationConfigTableId,
      integrationUuid,
      servicesTableId,
      userDataTableId
    )
    try {
      let auth: NoAuth = new NoAuth(configuration)
      let configType: string = await configuration.type()
      switch (configType) {
        // case 'apiKey':
        //   auth = new AuthApiKey(configuration)
        //   break
        // case 'basicAuth':
        //   auth = new BasicAuth(configuration)
        //   break
        // case 'oauth2':
        //   auth = new AuthOauth2(configuration)
        //   break
        default:
          auth = new NoAuth(configuration)
          console.warn(
            "Couldn't find authentication setup, defaulting to 'NoAuth'"
          )
          break
      }
      return auth
    } catch (e) {
      console.log('Error while trying to find AuthStrategy')
      console.log(e)
      return new NoAuth({})
    }
  }
}

export class Configuration {
  configuration: Promise<any>

  constructor(
    public readonly integrationConfigTableId: string,
    public readonly integrationUuid: string,
    public readonly servicesTableId: string,
    public readonly userDataTableId: string
  ) {
    this.configuration = this.config()
  }

  async config() {
    return await integrationsClient.getConfig(
      this.integrationConfigTableId,
      this.integrationUuid
    )
  }
  async type() {
    return (await this.configuration).Item.authType
  }

  async tokenURL() {
    return (await this.configuration).Item.tokenURL
  }
}

interface Auth {
  config: Configuration
  fetchToken: (u, r) => Promise<any>
  setupRequest: (req, res, refId, next) => Promise<any>
  callbackRequest: (req, res, refId, next) => Promise<any>
}

export class NoAuth implements Auth {
  config: Configuration
  constructor(_configuration: any) {}

  async fetchToken(_t, _r) {
    return Promise.resolve({})
  }
  async setupRequest(_req, _res, _refId, _next) {
    return Promise.resolve()
  }
  async callbackRequest(_req, _res, _refId, _next) {
    return Promise.resolve()
  }
}

export default AuthStrategyFactory
