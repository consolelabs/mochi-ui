import { flatten } from 'flat'

function removeDefaultKeys<T extends Object>(obj: T) {
  const newObj = {}

  for (const key in obj) {
    if (key.endsWith('-DEFAULT')) {
      // @ts-ignore
      newObj[key.replace('-DEFAULT', '')] = obj[key]
      continue
    }
    // @ts-ignore
    newObj[key] = obj[key]
  }

  return newObj
}

/**
 *
 * Flatten theme object and remove default keys
 *
 * @param obj theme object
 * @returns object with flattened keys
 */
export const flattenThemeObject = <TTarget>(obj: TTarget) =>
  removeDefaultKeys(
    flatten(obj, {
      safe: true,
      delimiter: '-',
    }) as Object,
  )
