export * from '../declarations/state'
import {
  Store,
  MapStateToPropsFunction,
  MapDispatchToPropsFunction,
  BearerStore,
  PromisifiedStore
} from '../declarations/state'

function getStore(configStore: () => Store): Store {
  return (window[`BEARER_SCENARIO_ID_store`] =
    window[`BEARER_SCENARIO_ID_store`] || configStore())
}

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
