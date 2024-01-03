export type SectionBase<Item> = {
  title: string
  data: Item[]
}

export type Moniker = {
  type: 'moniker'
  id: string
  name: string
  group: string
  asset_balance: number
  token_amount: number
  token: {
    icon: string
    address: string
    price: number
    decimal: number
    symbol: string
    chain_id: string
    native: boolean
    chain: {
      type: string
    }
  }
  disabled: boolean
}
