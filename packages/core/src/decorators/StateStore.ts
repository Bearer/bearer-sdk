import { Store } from '../interfaces'

function getStore(configStore): Store {
  return (window[`BEARER_SCENARIO_ID_store`] =
    window[`BEARER_SCENARIO_ID_store`] || configStore())
}

export declare type MapStateToPropsFunction = (
  component: any,
  mapState: <T>(state: T) => any
) => void

export declare type MapDispatchToPropsFunction = (
  component: any,
  mapState: { [key: string]: Function }
) => void

export declare interface BearerStore extends Store {
  store: Store
  mapStateToProps: MapStateToPropsFunction
  mapDispatchToProps: MapDispatchToPropsFunction
}

export type PromisifiedStore = Promise<BearerStore>

export function BearerState(configStore) {
  return (target: any, key: string) => {
    const getter = (): PromisifiedStore => {
      return new Promise<BearerStore>((resolve, _reject) => {
        const store = getStore(configStore)
        const mapDispatchToProps: MapDispatchToPropsFunction = function(
          component: any,
          props: any
        ) {
          Object.keys(props).forEach(actionName => {
            const action = props[actionName]
            Object.defineProperty(component, actionName, {
              get: () => (...args: any[]) =>
                action(...args)(store.dispatch, store.getState),
              configurable: true,
              enumerable: true
            })
          })
        }

        const mapStateToProps: MapStateToPropsFunction = function(
          component: any,
          mapState: Function
        ) {
          const _mapStateToProps = (_component: any, _mapState: any) => {
            const mergeProps = mapState(store.getState())

            Object.keys(mergeProps).forEach(newPropName => {
              let newPropValue = mergeProps[newPropName]
              component[newPropName] = newPropValue
            })
          }

          store.subscribe(() => _mapStateToProps(component, mapState))

          _mapStateToProps(component, mapState)
        }

        resolve({
          store,
          mapStateToProps,
          mapDispatchToProps
        } as BearerStore)
      })
    }

    const setter = () => {}

    if (delete target[key]) {
      Object.defineProperty(target, key, {
        get: getter,
        set: setter
      })
    }
  }
}
