export interface ModelChain {
  chain_id?: string
  explorer?: string
  icon?: string
  id?: string
  is_evm?: boolean
  name?: string
  rpc?: string
  symbol?: string
}

export interface ModelInAppWallet {
  chain?: ModelChain
  chain_id?: string
  created_at?: string
  profile_id?: string
  total_amount?: string
  wallet_address?: string
}
