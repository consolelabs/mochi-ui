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

export interface DtoAuthBlockchainAccountRequest {
  message: string
  signature: string
  wallet_address: string
}

export interface DtoConnectBlockchainAccountRequest {
  code: string
  message: string
  signature: string
  wallet_address: string
}

export interface DtoDeactivateApplicationRequest {
  appId: number
}

export interface DtoMarkReadActivitiesRequest {
  ids: number[]
}

export interface DtoUpdateAccountMetadataRequest {
  platform: string
  platformIdentifier: string
}

export interface DtoUpdateApplicationAvatarRequest {
  buffer?: number[]
  fileExt?: string
  image: MultipartFileHeader
}

export interface DtoUpdateApplicationRequest {
  appId: number
}

export interface DtoUpdateProfileInfoRequest {
  active_score?: number
  avatar?: string
  profile_name?: string
}

export interface MultipartFileHeader {
  filename?: string
  header?: TextprotoMIMEHeader
  size?: number
}

export type TextprotoMIMEHeader = Record<string, string[]>

export interface TypesetStateChange {
  key?: string
  value?: string
}

export interface ViewActivityResponse {
  changes?: TypesetStateChange[]
  content?: string
  content_raw?: string
  created_at?: string
  id?: number
  status?: string
  target_profile_id?: string
  type?: number
  updated_at?: string
  user_profile_id?: string
}

export interface ViewActivityResponseData {
  data?: ViewActivityResponse[]
  pagination?: ViewMetadataResponse
}

export interface ViewAppValidationResponse {
  data?: ViewAppValidationResponseData
}

export interface ViewAppValidationResponseData {
  app_id?: number
  app_name?: string
  owner_profile_id?: string
  valid?: boolean
}

export interface ViewApplication {
  active?: boolean
  application_profile_id?: string
  avatar?: string
  id?: number
  name?: string
  owner_profile_id?: string
  public_key?: string
  service_fee?: number
  slug?: string
}

export interface ViewAssociateDexResponse {
  message?: string
}

export interface ViewAssociatedAccount {
  created_at?: string
  discord_id?: string
  id?: string
  is_guild_member?: boolean
  platform?: string
  platform_identifier?: string
  platform_metadata?: any
  pnl?: string
  profile_id?: string
  total_amount?: string
  updated_at?: string
}

export interface ViewAssociatedAccountPending {
  created_at?: string
  id?: string
  platform?: string
  platform_identifier?: string
  platform_metadata?: any
  profile_id?: string
  updated_at?: string
}

export interface ViewAuthResponse {
  access_token?: string
}

export interface ViewCountActivitiesResponse {
  data?: number
}

export interface ViewDataResponse {
  data?: any
}

export interface ViewDataResponseWithPagination {
  data?: any
  pagination?: ViewPaginationResponse
}

export interface ViewDiscordGuild {
  features?: string[]
  icon?: string
  id?: string
  mochi_installed?: boolean
  name?: string
  owner?: boolean
  permissions?: string
}

export interface ViewGetActivityListResponse {
  data?: ViewActivityResponseData
}

export interface ViewGetOnboardingStatusResponse {
  did_onboarding_telegram?: boolean
}

export interface ViewMessageResponse {
  message?: string
}

export interface ViewMetadataResponse {
  page?: number
  size?: number
  total?: number
}

export interface ViewPaginationResponse {
  page?: number
  size?: number
  total?: number
}

export interface ViewProfile {
  active_score?: number
  application?: ViewApplication
  associated_account_pendings?: ViewAssociatedAccountPending[]
  associated_accounts?: ViewAssociatedAccount[]
  avatar?: string
  created_at?: string
  id?: string
  pnl?: string
  profile_name?: string
  type?: string
  updated_at?: string
}

export interface ViewUnlinkDexResponse {
  message?: string
}

export interface ViewUserDiscordGuilds {
  others?: ViewDiscordGuild[]
  owning?: ViewDiscordGuild[]
}
