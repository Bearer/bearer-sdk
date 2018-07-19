import * as d from '@stencil/core/dist/declarations/index'

export * from './decorators/Intent'

export {
  ComponentDidLoad,
  ComponentDidUnload,
  ComponentDidUpdate,
  ComponentWillLoad,
  ComponentWillUpdate,
  Config,
  EventEmitter,
  EventListenerEnable,
  FunctionalComponent
} from '@stencil/core/dist/declarations'

/**
 *  BearerState Decorator
 */

export interface IBearerStateDecoratorOptions {
  statePropName?: string
}

export interface IBearerStateDecorator<T> {
  (): T
}

export const BearerState: IBearerStateDecorator<any> = (
  options?: IBearerStateDecoratorOptions
) => (target: any, key: string): void => {}
/**
 *  Component Decorator
 */

export enum BearerComponentRoleEnum {
  Display = 'display',
  Action = 'action'
}

export interface BearerComponentOptions {
  bearer?: {
    role: BearerComponentRoleEnum
  }
}
export interface IBearerComponent {
  BEARER_SCENARIO_ID: string
}

export interface IBearerComponentDecorator<T> {
  (options?: d.ComponentOptions & BearerComponentOptions): T & IBearerComponent
}

export declare const Component: IBearerComponentDecorator<any>

/**
 * Build
 */
export declare const Build: d.UserBuildConditionals
// /**
//  * Component
//  */
// export declare const Component: d.ComponentDecorator;
/**
 * Element
 */
export declare const Element: d.ElementDecorator
/**
 * Event
 */
export declare const Event: d.EventDecorator
/**
 * Listen
 */
export declare const Listen: d.ListenDecorator
/**
 * Method
 */
export declare const Method: d.MethodDecorator
/**
 * Prop
 */
export declare const Prop: d.PropDecorator
/**
 * State
 */
export declare const State: d.StateDecorator
/**
 * Watch
 */
export declare const Watch: d.WatchDecorator
/**
 * Deprecated: Please use @Watch decorator instead
 */
export declare const PropWillChange: d.WatchDecorator
/**
 * Deprecated: Please use @Watch decorator instead
 */
export declare const PropDidChange: d.WatchDecorator
export interface HostElement extends HTMLElement {}
