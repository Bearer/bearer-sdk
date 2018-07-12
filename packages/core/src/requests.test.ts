import { intentRequest } from './requests'
import Bearer from './Bearer'
import fetch from 'jest-fetch-mock'

const intentName = 'anIntent'
const scenarioId = 'aScenarioId'
const setupId = '1234'
const configId = '5678'

describe('requests', () => {
  beforeEach(() => {
    fetch.resetMocks()
    Bearer.init({ integrationHost: process.env.API_HOST, integrationId: '42' })
    Bearer.instance['allowIntegrationRequests']()
  })

  describe('intentRequest', () => {
    it('returns a function', () => {
      const aRequest = intentRequest({ intentName, scenarioId, setupId, configId })

      expect(typeof aRequest).toBe('function')
    })

    it('calls host + intentName + params', async () => {
      const aRequest = intentRequest({ intentName, scenarioId, setupId, configId })
      fetch.mockResponseOnce(JSON.stringify({}))

      await aRequest({ page: 1 })

      expect(window.fetch).toBeCalledWith(
        'http://localhost:5555/api/v1/aScenarioId/anIntent?page=1&setupId=1234&configId=5678&integrationId=42',
        {
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
            'user-agent': 'Bearer'
          }
        }
      )
    })
  })
})
