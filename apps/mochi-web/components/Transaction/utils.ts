import UI, { Platform } from '@consolelabs/mochi-formatter'
import { ModelProfileTransactionMetadata } from '~types/mochi-pay-schema'

export const ignoreOptionAll = <T>(value: T | 'all') => {
  return value === 'all' ? undefined : value
}

export function isVault(source: string) {
  return source === 'mochi-vault'
}

// NOTE: implement url param sync later
// export const isValidFilterType = (key: string) =>
//   typeFilters.find(({ key: validKey }) => validKey === key) !== undefined

// export const isValidFilterPlatform = (key: string) =>
//   platformFilters.find(({ key: validKey }) => validKey === key) !== undefined

export function transformProfilePair(
  formProfile: any,
  otherProfile: any,
  type: string,
  metaData: ModelProfileTransactionMetadata,
) {
  let [from, to] = UI.render(Platform.Web, formProfile, otherProfile)
  let [fromAvatar, toAvatar] = [formProfile?.avatar, otherProfile?.avatar]

  if (type === 'in') {
    ;[from, to] = [to, from]
    ;[fromAvatar, toAvatar] = [toAvatar, fromAvatar]
  }

  if (isVault(formProfile) && 'vault' in formProfile) {
    const [newFrom] = UI.render(Platform.Web, metaData.vault)
    from = newFrom
  }
  if (isVault(otherProfile) && 'vault' in metaData) {
    const [newTo] = UI.render(Platform.Web, metaData.vault)
    to = newTo
  }
  if (from?.platform === Platform.Mochi) {
    from.plain = '🍡 Mochi user'
  }

  if (to?.platform === Platform.Mochi) {
    to.plain = '🍡 Mochi user'
  }

  return {
    from: from?.plain ?? '?',
    fromAvatar,
    to: to?.plain ?? '?',
    toAvatar,
  }
}
