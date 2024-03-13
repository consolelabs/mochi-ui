import { sprintf } from 'sprintf-js'
import { WALLET_LOGIN_SIGN_MESSAGE } from '~envs'
import { utils } from '@consolelabs/mochi-formatter'

export const padding = (value: string | number, length = 2, padding = '0') =>
  (padding.repeat(length - 1) + value).slice(-1 * length)

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function getWalletLoginSignMessage(code: string) {
  return sprintf(WALLET_LOGIN_SIGN_MESSAGE, code)
}

export function boringAvatar(name = '', variant: 'beam' | 'ring' = 'beam') {
  return `https://source.boringavatars.com/${variant}/120/${name}?colors=665c52,74b3a7,a3ccaf,E6E1CF,CC5B14`
}

export function truncateWallet(address?: string) {
  if (!address || address.length < 30) {
    return address
  }

  const firstFour = address.slice(0, 7)
  const lastThree = address.slice(-4)

  return `${firstFour}...${lastThree}`
}

export function formatTokenDigit(value: any) {
  return utils.formatTokenDigit({
    value,
    bound: { hi: 1_000_000, lo: -1_000_000 },
  })
}
