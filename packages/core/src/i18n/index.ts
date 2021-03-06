import { I18n } from '@bearer/js/lib/cjs/lib/i18n'

import template from 'lodash.template'

const interpolate = /{{([\s\S]+?)}}/g

export const scopedTranslate = (scope?: string): TTranslator => (store: I18n) => (
  key: string,
  defaultValue: string,
  vars?: Record<string, any>
) => {
  return template((store.get(scope, key) as string) || defaultValue, {
    interpolate
  })(vars || {})
}

export const scopedPluralize = (scope?: string): TPluralizer => (store: I18n) => (
  key: string,
  count: number,
  defaultValue: string,
  vars?: Record<string, any>
) => {
  const keyWithCount = [key, count].join('.')
  if (store.get(scope, keyWithCount)) {
    return scopedTranslate(scope)(store)(keyWithCount, defaultValue, vars)
  }
  const quantity = count > 1 ? 'many' : count
  const newKey = [key, quantity].join('.')
  return scopedTranslate(scope)(store)(newKey, defaultValue, vars)
}

/**
 * p: i18n helper function that let you pluralize text easily
 * @param {string} key - Key to use for translation ex: titles.welcome.
 * @param {number} count - Value used as discriminator for translation.
 * @param {string} defaultValue - A default value to use until the key get tranlated.
 * @param {object} vars - An object with all required keys to replace from the template.
 */
export type TTranslatorFunc = {
  (key: string, defaultValue: string, vars?: Record<string, any>): string
}

type TTranslator = {
  (store: I18n): TTranslatorFunc
}

/**
 * t: i18n helper function that let you translate text easily
 * @param {string} key - Key to use for translation ex: titles.welcome.
 * @param {string} defaultValue -  A default value to use until the key get tranlated
 * @param {object} vars - An object with all required keys to replace from the template.
 */
export type TPluralizerFunc = {
  (key: string, count: number, defaultValue: string, vars?: Record<string, any>): string
}
type TPluralizer = {
  (store: I18n): TPluralizerFunc
}
