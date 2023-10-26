// TODO: replace it with Mochi Types
import { ModelToken } from 'types/mochi-schema'

export const TokenTypes = ['Token', 'Moniker']

export type TokenAsset = {
  id: number
  token: ModelToken
  token_amount: string // token unit
  total_amount: string // $ unit
  icon: string
}

export type MonikerAsset = {
  id: number
  moniker: string
  token_amount: string // token unit
  token_unit: string
  total_amount: string // $ unit
  icon: string
  group: string
}

export type SectionBase<Item> = {
  title: string,
  data: Item[]
}
