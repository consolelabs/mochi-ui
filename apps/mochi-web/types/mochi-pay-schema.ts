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

export interface DtoAppDepositInternalRequest {
  amount: string
  metadata?: Record<string, any>
  platform?: string
  token_id: string
}

export interface DtoAppDepositRequest {
  platform: string
  token: string
}

export interface DtoAppWithdrawInternalRequest {
  amount: string
  metadata?: Record<string, any>
  platform?: string
  token_id: string
}

export interface DtoAppWithdrawRequest {
  address: string
  amount: string
  metadata?: Record<string, any>
  platform?: string
  token_id: string
}

export interface DtoCreateApplicationRequest {
  app_name: string
  /** OwnerProfileId string                 `json:"-"` */
  description?: string
  external_links?: Record<string, string[]>
  metadata?: Record<string, any>
  platforms?: string[]
  service_fee?: number
  webhooks?: Record<string, string>
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

export interface DtoUpdateAppMemberRequest {
  role: 'admin' | 'member'
}

export interface DtoUpdateApplicationAvatarRequest {
  buffer?: number[]
  fileExt?: string
  image: MultipartFileHeader
}

export interface DtoUpdateApplicationInfoRequest {
  app_name: string
  description?: string
  external_links: Record<string, string[]>
  metadata: Record<string, any>
  platforms: string[]
  webhooks?: Record<string, string>
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
  active_score?: number
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
  usd_amount?: number
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
  active?: boolean
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
  profile_tx?: ModelProfileTransaction
  status?: string
  token?: ModelToken
  token_id?: string
  tx_id?: number
  type?: string
  usd_amount?: number
}

export interface ModelProfileTransaction {
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
  metadata?: ModelProfileTransactionMetadata
  onchain_tx_hash?: string
  original_tx?: ModelProfileTransaction
  original_tx_id?: string
  other_profile?: MochiprofileMochiProfile
  other_profile_id?: string
  other_profile_source?: string
  other_profiles?: MochiprofileMochiProfile[]
  other_txs?: ModelProfileTransaction[]
  settled_at?: string
  sibling_txs?: ModelProfileTransaction[]
  source_platform?: string
  status?: string
  token?: ModelToken
  token_id?: string
  type?: string
  updated_at?: string
  usd_amount?: number
}

export type ModelProfileTransactionMetadata = Record<string, any>

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
  from_profile?: MochiprofileMochiProfile
  from_profile_id?: string
  from_profile_source?: string
  hashtags?: string[]
  id?: string
  internal_id?: number
  metadata?: ModelProfileTransactionMetadata
  onchain_tx_hash?: string
  original_tx?: ModelProfileTransaction
  original_tx_id?: string
  other_profile?: MochiprofileMochiProfile
  other_profile_id?: string
  /** used in airdrop response */
  other_profile_ids?: string[]
  other_profile_source?: string
  other_profiles?: MochiprofileMochiProfile[]
  other_txs?: ModelProfileTransaction[]
  settled_at?: string
  sibling_txs?: ModelProfileTransaction[]
  source_platform?: string
  status?: string
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
  description?: string
  external_links?: Record<string, string[]>
  id?: number
  metadata?: Record<string, any>
  name?: string
  owner_profile_id?: string
  platforms?: string[]
  public_key?: string
  service_fee?: number
  slug?: string
  updated_at?: string
  webhooks?: Record<string, string>
}

export interface ViewApplicationListWithPaginationResponse {
  data?: ViewApplication[]
  pagination?: ViewPaginationResponse
}

export interface ViewApplicationMember {
  app_id?: number
  created_at?: string
  id?: number
  profile_id?: string
  profile_metadata?: Record<string, any>
  role?: string
  updated_at?: string
}

export interface ViewApplicationMemberListWithPaginationResponse {
  data?: ViewApplicationMember[]
  pagination?: ViewPaginationResponse
}

export interface ViewApplicationMemberResponse {
  data?: ViewApplicationMember
}

export interface ViewApplicationRequestHistoryResponse {
  data?: ViewApplicationRequestLog[]
}

export interface ViewApplicationRequestLog {
  application_id?: number
  created_at?: string
  id?: string
  request_metadata?: Record<string, any>
  requester_profile_id?: string
  response_metadata?: Record<string, any>
  status?: string
  status_code?: number
  url?: string
}

export interface ViewApplicationResponse {
  data?: ViewApplication
}

export interface ViewApplicationStats {
  balance_in_7d?: number
  balance_in_7d_change?: ViewApplicationStatsChange
  /** balance */
  balance_in_total?: number
  balance_in_total_change?: ViewApplicationStatsChange
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

export interface ViewApplicationWebhookLog {
  request?: string
  response?: string
  status?: string
  timestamp?: string
  url?: string
}

export interface ViewApplicationWebhookLogsResponse {
  data?: ViewApplicationWebhookLog[]
}

export interface ViewDataResponse {
  data?: any
}

export interface ViewDataResponseWithPagination {
  data?: any
  pagination?: ViewPaginationResponse
}

export interface ViewDepositResponse {
  data?: ModelDepositContractAssignment[]
}

export interface ViewFullApplication {
  active?: boolean
  application_profile_id?: string
  avatar?: string
  created_at?: string
  description?: string
  external_links?: Record<string, string[]>
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
  webhooks?: Record<string, string>
}

export interface ViewFullApplicationResponse {
  data?: ViewFullApplication
}

export interface ViewGetApplicationWalletsResponse {
  data?: ModelInAppWallet[]
}

export interface ViewListPayRequestsResponse {
  data?: ModelPayRequest[]
  pagination?: ViewPaginationResponse
}

export interface ViewPaginationResponse {
  page?: number
  size?: number
  total?: number
}

export interface ViewSuccess {
  message?: string
}

export interface ViewTransferV2Response {
  data?: ModelProfileTransaction[]
}
