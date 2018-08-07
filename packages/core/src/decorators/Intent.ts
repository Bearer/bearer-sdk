import { intentRequest } from '../requests'

/**
 * Declarations
 */
enum IntentNames {
  RetrieveState = 'RetrieveState',
  SaveState = 'SaveState'
}

export enum IntentType {
  RetrieveState = 'RetrieveState',
  SaveState = 'SaveState',
  FetchData = 'FetchData'
}

type TFetchBearerResult = { meta: { referenceId: string }; data: Array<any> | any }

export type TFetchBearerData = { data: Array<any> | any; referenceId?: string }

export interface BearerFetch {
  (...args: any[]): Promise<any>
}

interface IDecorator {
  (target: any, key: string): void
}

type BearerComponent = {
  BEARER_ID: string
  setupId: string
  SCENARIO_ID: string
  referenceId: string
  el?: HTMLElement
}

/**
 * Constants
 */

export const BearerContext = 'bearerContext'
export const setupId = 'setupId'
export const IntentSaved = 'BearerStateSaved'
export const BearerStateSavedEvent = 'bearer:StateSaved'

/**
 * Intent
 */

// Usage
// @Intent('intentName') propertyName: BearerFetch
// or
// @Intent('intentNameResource', IntentType.FetchData) propertyName: BearerFetch
export function Intent(intentName: string, type: IntentType = IntentType.FetchData): IDecorator {
  return function(target: BearerComponent, key: string): void {
    const getter = (): BearerFetch => {
      return function(this: BearerComponent, params = {}) {
        // NOTE: here we have to use target. Not sure why
        const scenarioId = target.SCENARIO_ID
        if (!scenarioId) {
          return missingScenarioId()
        }

        const intent = intentRequest<TFetchBearerResult>({
          intentName,
          scenarioId,
          [setupId]: retrieveSetupId(target)
        })

        // prepare params and body

        const referenceId = retrieveReferenceId(this)
        if (type === IntentType.RetrieveState && !referenceId) {
          return missingReferenceId()
        }

        const { body, ...queryParams } = params
        const baseQuery = referenceId ? { referenceId } : {}
        const query = { ...baseQuery, ...queryParams }
        const InitMapper = {
          [IntentType.SaveState]: { method: 'PUT', body: JSON.stringify(body) }
        }
        const init = InitMapper[type] || {}

        // Build promise
        const promise: Promise<TFetchBearerData> = IntentPromise(intent(query, init))

        if (type === IntentType.SaveState) {
          // we want to trigger special event if it is a SaveState intent
          return new Promise((resolve, reject) => {
            // It does not make sense to use collection here.
            promise
              .then((payload: TEventPayload) => {
                if (this.el) {
                  this.el.dispatchEvent(new CustomEvent(BearerStateSavedEvent, { detail: payload }))
                }
                resolve(payload)
                return payload
              })
              .catch(reject)
          })
        }
        return promise
      }
    }

    defineIntentProp(target, key, getter)
  }
}

type TEventPayload = {
  referenceId: string
  data: { referenceId: string; ReadAllowed: boolean; [key: string]: any }
}

export function IntentPromise(promise: Promise<TFetchBearerResult>): Promise<TFetchBearerData> {
  return new Promise((resolve, reject) => {
    promise
      .then((payload: TFetchBearerResult) => {
        const { data, meta: { referenceId } = { referenceId: null } } = payload
        resolve({ data, referenceId })
      })
      .catch(e => {
        reject({ data: [], err: e })
      })
  })
}

/**
 * Helpers
 */

function missingScenarioId(): Promise<any> {
  console.warn('[BEARER]', 'Missing scenarioId, skipping api call')
  return Promise.reject(new BearerMissingScenarioId())
}

function missingReferenceId(): Promise<any> {
  console.warn('[BEARER]', 'Missing referenceId, skipping RetrieveState api call')
  return Promise.reject(new BearerMissingReferenceId())
}

function retrieveSetupId(target: BearerComponent): string {
  return target.setupId || (target[BearerContext] && target[BearerContext][setupId])
}

function retrieveReferenceId(target: BearerComponent): string {
  return target.referenceId
}

function defineIntentProp(target: BearerComponent, key: string, getter: any): void {
  const setter = () => {}

  if (delete target[key]) {
    Object.defineProperty(target, key, {
      get: getter,
      set: setter
    })
  }
}

/**
 * Custom Errors
 */

class BearerMissingReferenceId extends Error {
  constructor(private readonly group: string = 'feature') {
    super()
  }
  message = `Attribute ${this.group}ReferenceId is missing. Cannot fetch data without any reference`
}

class BearerMissingScenarioId extends Error {
  message = 'Scenario ID is missing. Please add @RootComponent decorator above your class definition'
}
