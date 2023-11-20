import { Balance } from '~store'

export const DEFAULT_BALANCE = {
  id: 'default-balance',
  amount: '$0',
  token: {
    id: '',
    name: 'bitcoin',
    symbol: 'BTC',
    icon: 'https://cdn.discordapp.com/attachments/1062201917046005801/1175819018591027220/btc.png?ex=656c9dcb&is=655a28cb&hm=e3ba8563ecf61c187eb3d0c79ea7b13e99e4d774dcbe2b8156efd679bf1a09a6&',
  },
  type: 'token',
  asset_balance: 0,
  usd_balance: 0,
} as unknown as Balance
