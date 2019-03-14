import { functionRequest } from '../requests'

/**
 * Declarations
 */

export enum FunctionType {
  SaveState = 'SaveState',
  FetchData = 'FetchData'
}

type TFetchBearerResult<T = any> = { meta: { referenceId: string }; data: T; error?: any }

export type TFetchBearerData<T = any> = { data: T; referenceId?: string }

export type BearerFetch<T = any> = (...args: any[]) => Promise<TFetchBearerData<T>>

type IDecorator = (target: any, key: string) => void

type BearerComponent = {
  setupId: string
  INTEGRATION_ID: string
  referenceId: string
  el?: HTMLElement
}

/**
 * Constants
 */

// tslint:disable-next-line:variable-name
export const BearerContext = 'bearerContext'
export const setupId = 'setupId'
// tslint:disable-next-line:variable-name
export const FunctionSaved = 'BearerStateSaved'
// tslint:disable-next-line:variable-name
export const BearerStateSavedEvent = 'bearer:StateSaved'

/**
 * Function
 */

// Usage
// @Function('functionName') propertyName: BearerFetch
// or
// @Function('functionNameResource', FunctionType.FetchData) propertyName: BearerFetch
// tslint:disable-next-line:function-name
export function Function(functionName: string, type: FunctionType = FunctionType.FetchData): IDecorator {
  return function(target: BearerComponent, key: string): void {
    const getter = (): BearerFetch => {
      return function(this: BearerComponent, params = {}): Promise<TFetchBearerData> {
        // NOTE: here we have to use target. Not sure why
        const integrationId = target.INTEGRATION_ID
        if (!integrationId) {
          return missingIntegrationId()
        }

        const func = functionRequest<TFetchBearerResult>({
          functionName,
          integrationId,
          [setupId]: params[setupId] || retrieveSetupId(target)
        })

        // prepare params and body

        const referenceId = retrieveReferenceId(this)
        const { body, ...queryParams } = params
        const baseQuery = referenceId ? { referenceId } : {}
        const query = { ...baseQuery, ...queryParams }
        const init = { method: 'POST', body: JSON.stringify(body || {}) }

        // Build promise
        return functionPromise(func(query, init))
      }
    }

    defineFunctionProp(target, key, getter)
  }
}

export function functionPromise(promise: Promise<TFetchBearerResult>): Promise<TFetchBearerData> {
  return new Promise((resolve, reject) => {
    promise
      .then((payload: TFetchBearerResult) => {
        if (payload.error) {
          reject({ error: payload.error })
        } else {
          const { data, meta: { referenceId } = { referenceId: null } } = payload
          resolve({ data, referenceId })
        }
      })
      .catch(error => {
        reject({ error })
      })
  })
}

/**
 * Helpers
 */

function missingIntegrationId(): Promise<any> {
  console.info('[BEARER]', 'Missing integrationId, skipping api call')
  return Promise.reject(new BearerMissingIntegrationId())
}

function retrieveSetupId(target: BearerComponent): string {
  return target.setupId || (target[BearerContext] && target[BearerContext][setupId])
}

function retrieveReferenceId(target: BearerComponent): string {
  return target.referenceId
}

function defineFunctionProp(target: BearerComponent, key: string, getter: any): void {
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
  message = `Attribute ${this.group}ReferenceId is missing. Cannot fetch data without any reference`
  constructor(private readonly group: string = 'feature') {
    super()
  }
}

class BearerMissingIntegrationId extends Error {
  message = 'Integration ID is missing. Please add @RootComponent decorator above your class definition'
}