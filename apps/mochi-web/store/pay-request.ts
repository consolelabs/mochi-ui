import { create } from 'zustand'

export type PayRequest = {
  code: string
  claim_tx?: string
  amount: string
  status: 'submitted' | 'claimed' | 'expired' | 'failed'
  note?: string
  profile_id: string
  is_evm: boolean
  profile?: {
    name: string
    avatar: string
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
    }
    decimal: number
    symbol: string
  }
  type: 'paylink' | 'payme'
  usd_amount: number
}

type State = {
  payRequest: PayRequest
  set: (pr: PayRequest) => void
}

export const usePayRequest = create<State>((set) => ({
  payRequest: {
    usd_amount: 0,
    code: '',
    amount: '',
    status: 'submitted',
    profile_id: '-1',
    is_evm: false,
    token: {
      address: '',
      icon: '',
      native: false,
      chain: {
        chain_id: '',
        symbol: '',
        icon: '',
        explorer: '',
      },
      decimal: 0,
      symbol: '',
    },
    type: 'paylink',
  },
  set: (payRequest) => set({ payRequest }),
}))
