/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DtoDepositRequest {
  platform: string
  profile_id: string
  token: string
}

export interface DtoGenerateCodeRequest {
  amount: string
  chain_id?: string
  /** for cross-platform tip */
  from_platform?: string
  note?: string
  profile_id: string
  /** for cross-platform tip */
  recipient_id?: string
  /** for cross-platform tip */
  to_platform?: string
  token: string
  type: 'paylink' | 'payme'
}

export interface DtoGetProfileWalletsResponse {
  data?: ModelInAppWallet[]
}

export interface DtoGetRecentWithdrawsRequest {
  chainId: string
  profileId: string
  token: string
}

export interface DtoListPayLinkResponse {
  amount?: string
  settle_tx?: string
  settled_at?: string
  claimer?: string
  code?: string
  created_at?: string
  expired_at?: string
  from_profile_id?: string
  is_evm?: boolean
  note?: string
  status?: string
  to_profile_id?: string
  token?: ModelToken
  token_id?: string
  type?: string
}

export interface DtoListPayLinkResponseData {
  data?: DtoListPayLinkResponse[]
}

export interface DtoListPayRequestsResponse {
  data?: ModelPayRequest[]
}

export interface DtoWithdrawRequest {
  address: string
  amount: string
  chain_id: string
  platform?: string
  platform_user_id?: string
  profile_id: string
  token: string
}

export interface ModelBalance {
  amount?: string
  created_at?: string
  id?: string
  profile_id?: string
  token?: ModelToken
  token_id?: string
  updated_at?: string
}

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

export interface ModelDepositContract {
  address?: string
  chain?: ModelChain
  chain_id?: string
  created_at?: string
  id?: string
  last_sweep_at?: string
}

export interface ModelDepositContractAssignment {
  chain_id?: string
  contract?: ModelDepositContract
  contract_id?: string
  created_at?: string
  expired_at?: string
  platform?: string
  platform_user_id?: string
  profile_id?: string
  token?: ModelToken
  token_id?: string
}

export interface ModelEvmWallet {
  address?: string
  chain_id?: string
  id?: string
}

export interface ModelInAppWallet {
  chain?: ModelChain
  chain_id?: string
  created_at?: string
  profile_id?: string
  total_amount?: string
  wallet_address?: string
}

export interface ModelMochiWallet {
  id?: string
}

export interface ModelPayRequest {
  amount?: string
  claim_tx?: string
  claimed_at?: string
  claimer?: string
  code?: string
  created_at?: string
  expired_at?: string
  is_evm?: boolean
  note?: string
  profile_id?: string
  status?: string
  token?: ModelToken
  token_id?: string
  tx_id?: number
  type?: string
}

export interface ModelToken {
  address?: string
  chain?: ModelChain
  chain_id?: string
  coin_gecko_id?: string
  decimal?: number
  icon?: string
  id?: string
  name?: string
  native?: boolean
  price?: number
  symbol?: string
}

export interface ModelWallet {
  evm_wallet?: ModelEvmWallet
  id?: string
  mochi_wallet?: ModelMochiWallet
  platform?: string
  profile_global_id?: string
}

export interface TransferTransferRequest {
  amount?: string[]
  from?: ModelWallet
  /** Token  *model.Token    `json:"token"` */
  note?: string
  token_id?: string
  tos?: ModelWallet[]
}

export interface ViewDataResponse {
  data?: object
}

export interface ViewSuccess {
  message?: string
}
