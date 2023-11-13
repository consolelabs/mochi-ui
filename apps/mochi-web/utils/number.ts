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
