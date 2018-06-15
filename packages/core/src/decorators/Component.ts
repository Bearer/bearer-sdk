// Class Decorator
export function BearerComponent<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  // Do not remove : will be replace in the front.
  constructor.prototype['SCENARIO_ID'] = 'BEARER_SCENARIO_ID'
  return constructor
}
