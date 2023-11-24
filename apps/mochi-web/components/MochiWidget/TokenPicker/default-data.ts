import { Balance } from '~store'

export const DEFAULT_BALANCE = {
  id: 'default-balance',
  amount: '$0',
  token: {
    id: '',
    name: 'sol',
    symbol: 'SOL',
    icon: 'https://cdn.discordapp.com/emojis/1150803875884978216.png?size=240&quality=lossless',
  },
  type: 'token',
  asset_balance: 0,
  usd_balance: 0,
} as unknown as Balance
