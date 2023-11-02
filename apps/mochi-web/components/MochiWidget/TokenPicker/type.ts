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

export interface ModelMoniker {
  id: number
  name: string
  icon: string
  group: string
}

export type MonikerAsset = {
  id: number
  moniker: ModelMoniker
  token_amount: string // token unit
  token_unit: string
  total_amount: string // $ unit
}

export type SectionBase<Item> = {
  title: string
  data: Item[]
}
