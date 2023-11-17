import { flatten } from 'flat'

function removeDefaultKeys<T extends Record<string, any>>(obj: T): Partial<T> {
  const newObj: Partial<T> = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key.endsWith('-DEFAULT')) {
        const newKey = key.replace('-DEFAULT', '') as keyof T
        newObj[newKey] = obj[key]
      } else {
        const newKey = key as keyof T
        newObj[newKey] = obj[key]
      }
    }
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
