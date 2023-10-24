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
  code: string
  signature: string
  wallet_address: string
}

export interface DtoGCSUploadImageRequest {
  /** @minItems 1 */
  data: number[]
  image_name: string
}

export interface DtoMarkReadActivitiesRequest {
  ids: number[]
}

export interface DtoUpdateProfileInfoRequest {
  avatar?: string
  profile_name?: string
}

export interface ModelActivityContent {
  action?: string
  activity_content?: string
  created_at?: string
  description?: string
  emoji?: string
  id?: number
  updated_at?: string
}

export interface ModelActivityPlatform {
  created_at?: string
  emoji?: string
  id?: number
  platform?: string
  updated_at?: string
}

export interface ViewActivityResponse {
  action?: string
  action_description?: string
  activity_content?: ModelActivityContent
  activity_platform?: ModelActivityPlatform
  created_at?: string
  id?: number
  platform?: string
  profile_id?: string
  read_at?: string
  status?: string
  updated_at?: string
}

export interface ViewActivityResponseData {
  data?: ViewActivityResponse[]
  pagination?: ViewPaginationResponse
}

export interface ViewAssociatedAccount {
  created_at?: string
  id?: string
  platform?: string
  platform_identifier?: string
  profile_id?: string
  updated_at?: string
}

export interface ViewAuthResponse {
  access_token?: string
}

export interface ViewDiscordGuild {
  features?: string[]
  icon?: string
  id?: string
  mochi_supported?: boolean
  name?: string
  owner?: boolean
  permissions?: string
}

export interface ViewGCSUploadImageResponse {
  url?: string
}

export interface ViewMarkReadActivitiesResponse {
  message?: string
}

export interface ViewPaginationResponse {
  page?: number
  size?: number
  total?: number
}

export interface ViewProfile {
  associated_accounts: ViewAssociatedAccount[]
  avatar: string
  created_at: string
  id: string
  profile_name: string
  updated_at: string
  platform: string
  platformIcon: string
}

export interface ViewUserDiscordGuilds {
  others?: ViewDiscordGuild[]
  owning?: ViewDiscordGuild[]
}
