/**
 * Declarations
 */

export enum FunctionType {
  FetchData = 'FetchData'
}

export type TFetchBearerData<T = any> = { data: T; referenceId?: string; error?: any }

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

/**
 * Links a functions to your component
 * @param {string} functionName - The name of the function you want to use (located in functions folder).
 *
 * example:
 * @Function('functionName') propertyName: BearerFetch
 * componentDidLoad() {
 *  this.propertyName().then(console.log).catch(console.erro)
 * }
 */
export declare const Function: (functionName: string) => (target: any, key: string) => void

// Usage
// @Function('functionName') propertyName: BearerFetch
// or
// @Function('functionNameResource', FunctionType.FetchData) propertyName: BearerFetch
// tslint:disable-next-line:function-name
export function _BackendFunction<T = any>(
  functionName: string,
  type: FunctionType = FunctionType.FetchData
): IDecorator {
  return function(target: BearerComponent, key: string): void {
    const getter = (): BearerFetch => {
      return function(this: BearerComponent, params = {}): Promise<TFetchBearerData<T>> {
        // NOTE: here we have to use target. Not sure why
        const integrationId = target.INTEGRATION_ID
        if (!integrationId) {
          return missingIntegrationId()
        }

        return bearer.instance
          .invoke<T>(integrationId, functionName, {
            ...params,
            query: {
              setupId: retrieveSetupId(this),
              referenceId: retrieveReferenceId(this)
            }
          })
          .catch(error => {
            throw error
          })
      }
    }

    defineFunctionProp(target, key, getter)
  }
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

class BearerMissingIntegrationId extends Error {
  message = 'Integration ID is missing. Please add @RootComponent decorator above your class definition'
}
