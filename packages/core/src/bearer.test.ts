import Bearer from './bearer'

describe('Bearer', () => {
  describe('Init', () => {
    it('Returns singleton (exact same instance)', () => {
      expect(Bearer.config).toBe(Bearer.config)
    })

    it('Set default values ', () => {
      expect(Bearer.config.integrationHost).toEqual('BEARER_INTEGRATION_HOST')
      expect(Bearer.config.loadingComponent).toBeUndefined()
    })

    it('Overrides defaults ', () => {
      Bearer.init({ integrationHost: 'spongebob' })
      expect(Bearer.config.integrationHost).toEqual('spongebob')
    })
  })

  describe('Authorization', () => {
    it('with same integrationId it auhtorizes', done => {
      expect.assertions(1)

      const instance = Bearer.init()
      const callback = jest.fn(() => done())
      Bearer.onAuthorized('integrationTargeted', callback)

      instance.authorized({ data: { integrationId: 'integrationTargeted' } })

      expect(callback).toHaveBeenCalledWith(true)
    })

    it('does not resolve if not a matching integrationId', done => {
      expect.assertions(2)

      const instance = Bearer.init()

      const callback = jest.fn()
      const otherIntegrationCallback = jest.fn(() => done())

      Bearer.onAuthorized('integrationTargeted', callback)
      Bearer.onAuthorized('otherIntegration', otherIntegrationCallback)

      instance.authorized({ data: { integrationId: 'otherIntegration' } })

      expect(callback).not.toHaveBeenCalledWith(true)
      expect(otherIntegrationCallback).toHaveBeenCalledWith(true)
    })

    describe('#askAuthorizations', () => {
      it('opens popup with  the correct url', () => {
        // @ts-ignore
        global.bearer = { clientId: 'askAuthorizations-clientId' }
        const win = { open: jest.fn() }
        const instance = new Bearer({ integrationHost: 'https://trash.bearer.sh/', secured: true }, win as any)
        // @ts-ignore
        instance.sessionInitialized()
        expect(instance.askAuthorizations({ integrationId: 'ok', setupId: 'ok', authRefId: 'IAM' })).toBeTruthy()
        expect(win.open).toHaveBeenCalledWith(
          'https://trash.bearer.sh/v2/auth/ok?setupId=ok&authId=IAM&secured=true&clientId=askAuthorizations-clientId',
          '',
          'resizable,scrollbars,status,centerscreen=yes,width=500,height=600'
        )
      })

      it('does not open ', () => {
        const instance = Bearer.init()
        expect(instance.askAuthorizations({ integrationId: 'ok', setupId: 'ok' })).toBeFalsy()
      })
    })
  })
})
