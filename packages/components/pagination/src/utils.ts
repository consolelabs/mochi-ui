export function formatNumber(number: number | string) {
  if (typeof number === 'string') {
    return Intl.NumberFormat().format(parseFloat(number))
  }
  return Intl.NumberFormat().format(number)
}
