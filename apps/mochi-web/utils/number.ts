import { utils } from '@consolelabs/mochi-ui'

export function formatNumber(number: number | string) {
  if (typeof number === 'string') {
    return Intl.NumberFormat().format(parseFloat(number))
  }
  return Intl.NumberFormat().format(number)
}

export function epsilonToDecimalNumber(number: number | string, decimal = 2) {
  if (typeof number === 'string') {
    return parseInt(number, 10) / 10 ** decimal
  }
  return number / 10 ** decimal
}

export type TokenAmount = {
  value: number
  display: string
}

export const MAX_AMOUNT_PRECISION = 8

export function formatTokenAmount(amount: string | number): TokenAmount {
  const roundedAmount = utils.formatDigit({
    value: amount,
    fractionDigits: MAX_AMOUNT_PRECISION,
  })
  const formatNumber = Number(roundedAmount.replaceAll(',', ''))
  return {
    value: formatNumber,
    display: roundedAmount,
  }
}
