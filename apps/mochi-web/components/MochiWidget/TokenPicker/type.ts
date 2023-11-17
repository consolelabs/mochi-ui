// TODO: replace it with Mochi Types
import { ModelMonikerConfig, ModelToken } from 'types/mochi-schema'
import { type Balance } from '~store'

export type TokenAsset = {
  id: number
  token: ModelToken
  token_amount: string // token unit
  total_amount: string // $ unit
  icon: string
}

export type MonikerAsset = Balance & {
  moniker: ModelMonikerConfig
  group: string
  token_amount: string // token unit
  token_unit: string
}

export type SectionBase<Item> = {
  title: string
  data: Item[]
}

export type Moniker = {
  id: string
  name: string
  group: string
  asset_balance: number
  token_amount: number
  token: {
    chain_id: string
    price: number
    symbol: string
  }
}
