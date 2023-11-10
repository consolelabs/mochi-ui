export function formatNumber(number: number | string) {
  if (typeof number === 'string') {
    return Intl.NumberFormat().format(parseFloat(number))
  }
  return Intl.NumberFormat().format(number)
}

export function abbreviateNumber(num: number, _digits: number = 2) {
  const lookup = [
    { value: 1, symbol: '' },
    // { value: 1e3, symbol: 'k' }, // TODO: uncomment this if wanna use k
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find((item) => {
      return num >= item.value
    })
  return item
    ? formatNumber(num / item.value).replace(rx, '$1') + item.symbol
    : '0'
}

export function epsilonToDecimalNumber(number: number | string, decimal = 2) {
  if (typeof number === 'string') {
    return parseInt(number, 10) / 10 ** decimal
  }
  return number / 10 ** decimal
}
