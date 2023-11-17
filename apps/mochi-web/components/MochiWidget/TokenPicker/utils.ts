import { Balance, Wallet } from '~store'
import groupBy from 'lodash.groupby'
import { MAX_AMOUNT_PRECISION, formatTokenAmount } from '~utils/number'
import { Moniker, SectionBase } from './type'

export function sectionFormatter<T>(list: T[], interatee: string) {
  const sections: SectionBase<T>[] = Object.entries(
    groupBy(list, interatee),
  ).map(([key, value]) => ({
    title: key,
    data: value,
  }))
  return sections
}

export const MonikerIcons = new Map([
  ['coffee', '☕'],
  ['cookie', '🍪'],
  ['beer', '🍺'],
  ['pho', '🍜'],
  ['mochi', '🍡'],
  ['diamond', '💎'],
  ['banhmi', '🥖'],
  ['donut', '🍩'],
  ['pie', '🥧'],
  ['pizza', '🍕'],
])

export function getBalanceByMoniker(moniker: Moniker | null, wallet?: Wallet) {
  if (!moniker) return { value: 0, display: '0' }
  const assetAmount =
    wallet?.balances?.find((b) => b.token?.symbol === moniker.token.symbol)
      ?.asset_balance ?? 0

  const value = formatTokenAmount(
    (assetAmount / moniker.asset_balance).toFixed(MAX_AMOUNT_PRECISION),
  )
  return {
    value: value.value,
    display: `${value.display} ${moniker.name}`,
  }
}

export function isToken(asset: Balance | Moniker | null): asset is Balance {
  if (!asset) return true
  if ('type' in asset && asset.type === 'moniker') return false
  return true
}
