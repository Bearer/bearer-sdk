export * from '../declarations/state'
import * as d from '../declarations/state'
import { Store } from 'redux'

function getStore(configStore: () => Store): Store {
  return (window[`BEARER_SCENARIO_ID_store`] =
    window[`BEARER_SCENARIO_ID_store`] || configStore())
}

export function BearerState(configStore) {
  return (target: any, key: string) => {
    const getter = (): d.PromisifiedStore => {
      return new Promise<d.BearerStore>((resolve, _reject) => {
        const store = getStore(configStore)
        const mapDispatchToProps: d.MapDispatchToPropsFunction = function(
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

        const mapStateToProps: d.MapStateToPropsFunction = function(
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
        } as d.BearerStore)
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
