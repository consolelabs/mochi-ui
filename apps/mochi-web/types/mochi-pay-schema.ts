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

export interface DtoAppDetailBaseRequest {
  appId: number
}

export interface DtoCreateApplicationRequest {
  app_name: string
  metadata: Record<string, any>
  platforms: string[]
  service_fee?: number
}

export interface DtoDepositRequest {
  platform: string
  profile_id: string
  token: string
}

export interface DtoGenerateCodeRequest {
  amount: string
  chain_id?: string
  from_platform?: string
  moniker?: string
  note?: string
  original_amount?: string
  profile_id: string
  target?: string
  target_platform?: string
  token?: string
  token_id?: string
  type: 'paylink' | 'payme'
}

export interface DtoGetBalancesOfProfilesRequest {
  profile_ids: string[]
}

export interface DtoGetProfileWalletsResponse {
  data?: ModelInAppWallet[]
}

export interface DtoGetRecentWithdrawsRequest {
  profileId: string
  tokenId: string
}

export interface DtoListPayLinkResponse {
  action?: string
  amount?: string
  chain_type?: string
  code?: string
  created_at?: string
  expired_at?: string
  from_profile_id?: string
  note?: string
  settle_tx?: string
  settled_at?: string
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

export interface DtoTransactionGraph {
  edges?: DtoTransactionGraphEdges[]
  nodes?: DtoTransactionGraphNodes[]
}

export interface DtoTransactionGraphData {
  data?: DtoTransactionGraph
}

export interface DtoTransactionGraphEdges {
  from_profile_id?: string
  receive?: number
  spend?: number
  to_profile_id?: string
  total_volume?: number
}

export interface DtoTransactionGraphNodes {
  profile?: any
  profile_id?: string
  receive_volume?: number
  spend_volume?: number
  total_volume?: number
}

export interface DtoTransferV2Request {
  action: 'transfer' | 'airdrop'
  amount: string[]
  from: ModelWallet
  metadata?: Record<string, any>
  platform: 'discord' | 'telegram' | 'twitter'
  token_id: string
  tos: ModelWallet[]
}

export interface DtoUpdateApplicationAvatarRequest {
  buffer?: number[]
  fileExt?: string
  image: MultipartFileHeader
}

export interface DtoUpdateApplicationInfoRequest {
  app_name: string
  metadata: Record<string, any>
  platforms: string[]
}

export interface DtoWithdrawRequest {
  address: string
  amount: string
  metadata?: Record<string, any>
  platform?: string
  profile_id: string
  token_id: string
}

export interface MochiprofileApplication {
  active?: boolean
  application_profile_id?: string
  id?: number
  name?: string
  owner_profile_id?: string
  service_fee?: number
}

export interface MochiprofileAssociatedAccounts {
  created_at?: string
  id?: string
  is_guild_member?: boolean
  platform?: string
  platform_identifier?: string
  platform_metadata?: any
  profile_id?: string
  updated_at?: string
}

export interface MochiprofileMochiProfile {
  application?: MochiprofileApplication
  associated_accounts?: MochiprofileAssociatedAccounts[]
  avatar?: string
  created_at?: string
  id?: string
  profile_name?: string
  type?: string
  updated_at?: string
}

export interface ModelAmountEachProfiles {
  amount?: string
  profile_id?: string
  usd_amount?: number
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
  name?: string
  rpc?: string
  symbol?: string
  type?: string
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
  chain_type?: string
  claim_tx?: string
  claimed_at?: string
  claimer?: string
  code?: string
  created_at?: string
  expired_at?: string
  moniker?: string
  note?: string
  original_amount?: string
  profile_id?: string
  status?: string
  token?: ModelToken
  token_id?: string
  tx_id?: number
  type?: string
  usd_amount?: number
}

export interface ModelStatTx {
  amount?: string
  other_profile_id?: string
  price?: number
  profile_id?: string
  token?: ModelToken
  usd_amount?: number
}

export interface ModelStats {
  history?: ModelTransactionResponse[]
  most_receive?: ModelStatTx
  most_send?: ModelStatTx
  receive?: ModelStatTx[]
  spending?: ModelStatTx[]
  time?: string
  total_receive?: number
  total_spending?: number
  total_volume?: number
}

export interface ModelStatsResponse {
  data?: ModelStats
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

export interface ModelTransactionResponse {
  action?: string
  amount?: string
  amount_each_profiles?: ModelAmountEachProfiles[]
  chain_id?: string
  created_at?: string
  expired_at?: string
  external_id?: string
  from_amount?: string
  from_profile?: MochiprofileMochiProfile
  from_profile_id?: string
  from_profile_source?: string
  from_token?: ModelToken
  /** used in swap response */
  from_token_id?: string
  hashtags?: string[]
  id?: string
  internal_id?: number
  metadata?: Record<string, any>
  onchain_tx_hash?: string
  original_tx_id?: string
  other_profile?: MochiprofileMochiProfile
  other_profile_id?: string
  /** used in airdrop response */
  other_profile_ids?: string[]
  other_profile_source?: string
  other_profiles?: MochiprofileMochiProfile[]
  settled_at?: string
  source_platform?: string
  status?: string
  to_amount?: string
  to_token?: ModelToken
  to_token_id?: string
  token?: ModelToken
  token_id?: string
  total_amount?: string
  type?: string
  updated_at?: string
  usd_amount?: number
}

export interface ModelWallet {
  evm_wallet?: ModelEvmWallet
  id?: string
  mochi_wallet?: ModelMochiWallet
  platform?: string
  profile_global_id?: string
}

export interface MultipartFileHeader {
  filename?: string
  header?: TextprotoMIMEHeader
  size?: number
}

export type TextprotoMIMEHeader = Record<string, string[]>

export interface ViewApplication {
  active?: boolean
  application_profile_id?: string
  avatar?: string
  created_at?: string
  id?: number
  metadata?: Record<string, any>
  name?: string
  owner_profile_id?: string
  platforms?: string[]
  public_key?: string
  service_fee?: number
  slug?: string
  updated_at?: string
}

export interface ViewApplicationListResponse {
  data?: ViewApplication[]
}

export interface ViewApplicationResponse {
  data?: ViewApplication
}

export interface ViewApplicationStats {
  revenue_in_7d?: number
  revenue_in_7d_change?: ViewApplicationStatsChange
  /** revenue */
  revenue_in_total?: number
  revenue_in_total_change?: ViewApplicationStatsChange
  txs_in_7d?: number
  txs_in_7d_change?: ViewApplicationStatsChange
  /** txs */
  txs_in_total?: number
  txs_in_total_change?: ViewApplicationStatsChange
  users_in_7d?: number
  users_in_7d_change?: ViewApplicationStatsChange
  /** users */
  users_in_total?: number
  users_in_total_change?: ViewApplicationStatsChange
}

export interface ViewApplicationStatsChange {
  last_month?: number
  last_month_percentage?: number
  last_week?: number
  last_week_percentage?: number
}

export interface ViewApplicationStatsResponse {
  data?: ViewApplicationStats
}

export interface ViewFullApplication {
  active?: boolean
  application_profile_id?: string
  avatar?: string
  created_at?: string
  id?: number
  metadata?: Record<string, any>
  name?: string
  owner_profile_id?: string
  platforms?: string[]
  private_key?: string
  public_key?: string
  service_fee?: number
  slug?: string
  updated_at?: string
}

export interface ViewFullApplicationResponse {
  data?: ViewFullApplication
}

export interface ViewSuccess {
  message?: string
}

export interface ViewTransferV2Response {
  data?: ViewTransferV2TransactionData[]
}

export interface ViewTransferV2TransactionData {
  action?: string
  amount?: string
  amount_each_profiles?: ModelAmountEachProfiles[]
  chain_id?: string
  created_at?: string
  expired_at?: string
  external_id?: string
  from_profile?: MochiprofileMochiProfile
  from_profile_id?: string
  from_profile_source?: string
  hashtags?: string[]
  id?: string
  internal_id?: number
  metadata?: Record<string, any>
  onchain_tx_hash?: string
  original_tx_id?: string
  other_profile?: MochiprofileMochiProfile
  other_profile_id?: string
  other_profile_source?: string
  other_profiles?: MochiprofileMochiProfile[]
  settled_at?: string
  source_platform?: string
  status?: string
  token?: ModelToken
  token_id?: string
  type?: string
  updated_at?: string
  usd_amount?: number
}
