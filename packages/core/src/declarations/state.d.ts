export declare interface Store {
  dispatch: () => any
  subscribe: (cb: Function) => any
  getState: () => any
  getStore: () => any
  setStore: (any: any) => void
  mapStateToProps: (component: any, props: any) => void
  mapDispatchToProps: (component: any, props: any) => void
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
