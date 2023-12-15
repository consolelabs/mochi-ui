export type PayRequest = {
  code: string
  claimer?: string
  claim_tx?: string
  amount: string
  amountDisplay: string
  status: 'submitted' | 'claimed' | 'expired' | 'failed'
  note?: string
  profile_id: string
  profile?: {
    name: string
    avatar?: string
    platform?: string
  }
  to?: {
    name: string
    avatar?: string
  }
  token: {
    address: string
    icon: string
    native: boolean
    chain: {
      chain_id: string
      symbol: string
      icon: string
      explorer: string
      type: string
    }
    decimal: number
    symbol: string
  }
  type: 'paylink' | 'payme'
  usd_amount: string
  usdAmountDisplay: string
  profile_tx: any
  date: string
  recipient_wallets: any[]
}
