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

import { Profile } from '@consolelabs/mochi-rest'

export type BigFloat = object

export interface DiscordgoUser {
  /** User's banner color, encoded as an integer representation of hexadecimal color code */
  accent_color?: number
  /**
   * The hash of the user's avatar. Use Session.UserAvatar
   * to retrieve the avatar itself.
   */
  avatar?: string
  /** The hash of the user's banner image. */
  banner?: string
  /** Whether the user is a bot. */
  bot?: boolean
  /** The discriminator of the user (4 numbers after name). */
  discriminator?: string
  /**
   * The email of the user. This is only present when
   * the application possesses the email scope for the user.
   */
  email?: string
  /**
   * The flags on a user's account.
   * Only available when the request is authorized via a Bearer token.
   */
  flags?: number
  /** The ID of the user. */
  id?: string
  /** The user's chosen language option. */
  locale?: string
  /** Whether the user has multi-factor authentication enabled. */
  mfa_enabled?: boolean
  /**
   * The type of Nitro subscription on a user's account.
   * Only available when the request is authorized via a Bearer token.
   */
  premium_type?: number
  /**
   * The public flags on a user's account.
   * This is a combination of bit masks; the presence of a certain flag can
   * be checked by performing a bitwise AND between this int and the flag.
   */
  public_flags?: number
  /** Whether the user is an Official Discord System user (part of the urgent message system). */
  system?: boolean
  /**
   * The token of the user. This is only present for
   * the user represented by the current session.
   */
  token?: string
  /** The user's username. */
  username?: string
  /** Whether the user's email is verified. */
  verified?: boolean
}

export interface EntitiesLoginResponse {
  access_token?: string
  expires_at?: number
}

export interface ModelActivity {
  guild_default?: boolean
  id?: number
  name?: string
  xp?: number
}

export interface ModelChain {
  coin_gecko_id?: string
  currency?: string
  id?: number
  name?: string
  short_name?: string
}

export interface ModelCoingeckoSupportedTokens {
  id?: string
  name?: string
  symbol?: string
}

export interface ModelCommonwealthDiscussionSubscription {
  created_at?: string
  discord_thread_id?: string
  discussion_id?: number
  id?: number
  updated_at?: string
}

export interface ModelConfigXpLevel {
  level?: number
  min_xp?: number
}

export interface ModelDaoProposal {
  closed_at?: string
  created_at?: string
  creator_id?: string
  description?: string
  discussion_channel_id?: string
  guild_config_dao_proposal_id?: number
  guild_id?: string
  id?: number
  title?: string
  updated_at?: string
  voting_channel_id?: string
}

export interface ModelDaoProposalVoteCount {
  choice?: string
  guild_id?: string
  proposal_id?: string
  sum?: number
}

export interface ModelDaoProposalVoteOption {
  address?: string
  chain_id?: number
  created_at?: string
  id?: number
  proposal_id?: number
  required_amount?: string
  symbol?: string
  updated_at?: string
  vote_option?: ModelDaoVoteOption
  vote_option_id?: number
}

export interface ModelDaoVote {
  choice?: string
  created_at?: string
  id?: number
  point?: number
  proposal_id?: number
  updated_at?: string
  user_id?: string
}

export interface ModelDaoVoteOption {
  created_at?: string
  id?: number
  type?: string
  updated_at?: string
}

export interface ModelDiscordGuild {
  active?: boolean
  alias?: string
  bot_scopes?: string[]
  created_at?: string
  global_xp?: boolean
  id?: string
  log_channel?: string
  name?: string
  roles?: ModelGuildRole[]
}

export interface ModelDiscordGuildStat {
  created_at?: string
  guild_id?: string
  id?: string
  nr_of_animated_emojis?: number
  nr_of_announcement_channels?: number
  nr_of_bots?: number
  nr_of_categories?: number
  nr_of_channels?: number
  nr_of_custom_stickers?: number
  nr_of_emojis?: number
  nr_of_members?: number
  nr_of_roles?: number
  nr_of_server_stickers?: number
  nr_of_stage_channels?: number
  nr_of_static_emojis?: number
  nr_of_stickers?: number
  nr_of_text_channels?: number
  nr_of_users?: number
  nr_of_voice_channels?: number
}

export interface ModelDiscordUserDevice {
  created_at?: string
  id?: string
  ios_noti_token?: string
  updated_at?: string
}

export interface ModelDiscordUserGMStreak {
  created_at?: string
  discord_id?: string
  guild_id?: string
  last_streak_date?: string
  streak_count?: number
  total_count?: number
  updated_at?: string
}

export interface ModelDiscordUserTokenAlert {
  created_at?: string
  device?: ModelDiscordUserDevice
  device_id?: string
  discord_id?: string
  id?: string
  is_enable?: boolean
  price_set?: number
  symbol?: string
  token_id?: string
  trend?: string
  updated_at?: string
}

export interface ModelDiscordUserUpvoteStreak {
  created_at?: string
  discord_id?: string
  last_streak_date?: string
  streak_count?: number
  total_count?: number
  updated_at?: string
}

export interface ModelEnvelop {
  command?: string
  created_at?: string
  id?: number
  updated_at?: string
  user_id?: string
}

export interface ModelGuildConfigActivity {
  active?: boolean
  activity?: ModelActivity
  activity_id?: number
  guild_id?: string
}

export interface ModelGuildConfigDaoProposal {
  address?: string
  authority?: string
  chain_id?: number
  created_at?: string
  guideline_channel_id?: string
  guild_id?: string
  id?: number
  proposal_channel_id?: string
  required_amount?: string
  symbol?: string
  type?: string
  updated_at?: string
}

export interface ModelGuildConfigDaoTracker {
  channel_id?: string
  created_at?: string
  guild_id?: string
  id?: string
  source?: string
  space?: string
  updated_at?: string
}

export interface ModelGuildConfigDefaultCollection {
  address?: string
  chain_id?: string
  created_at?: string
  guild_id?: string
  symbol?: string
  updated_at?: string
}

export interface ModelGuildConfigDefaultTicker {
  default_ticker?: string
  guild_id?: string
  query?: string
}

export interface ModelGuildConfigGmGn {
  channel_id?: string
  emoji?: string
  guild_id?: string
  id?: string
  msg?: string
  sticker?: string
}

export interface ModelGuildConfigInviteTracker {
  channel_id?: string
  guild_id?: string
  id?: string
  webhook_url?: ModelJSONNullString
}

export interface ModelGuildConfigLevelRole {
  guild_id?: string
  level?: number
  level_config?: ModelConfigXpLevel
  role_id?: string
}

export interface ModelGuildConfigLevelupMessage {
  channel_id?: string
  created_at?: string
  guild_id?: string
  id?: string
  image_url?: string
  message?: string
  updated_at?: string
}

export interface ModelGuildConfigMixRole {
  created_at?: string
  guild_id?: string
  id?: number
  nft_requirement?: ModelMixRoleNFTRequirement
  nft_requirement_id?: number
  required_level?: number
  role_id?: string
  token_requirement?: ModelMixRoleTokenRequirement
  token_requirement_id?: number
  updated_at?: string
}

export interface ModelGuildConfigRepostReaction {
  emoji?: string
  emoji_start?: string
  emoji_stop?: string
  guild_id?: string
  id?: string
  quantity?: number
  reaction_type?: string
  repost_channel_id?: string
}

export interface ModelGuildConfigSalesTracker {
  chain?: string
  channel_id?: string
  contract_address?: string
  created_at?: string
  guild_id?: string
  id?: string
  updated_at?: string
}

export interface ModelGuildConfigTokenRole {
  created_at?: string
  guild_id?: string
  id?: number
  required_amount?: number
  role_id?: string
  token?: ModelToken
  token_id?: number
  updated_at?: string
}

export interface ModelGuildConfigTwitterBlacklist {
  created_at?: string
  created_by?: string
  guild_id?: string
  twitter_id?: string
  twitter_username?: string
}

export interface ModelGuildConfigTwitterFeed {
  guild_id?: string
  twitter_access_token?: string
  twitter_access_token_secret?: string
  twitter_consumer_key?: string
  twitter_consumer_secret?: string
}

export interface ModelGuildConfigVoteChannel {
  channel_id?: string
  guild_id?: string
  id?: string
}

export interface ModelGuildConfigWalletVerificationMessage {
  content?: string
  created_at?: string
  discord_message_id?: string
  embedded_message?: number[]
  guild_id?: string
  verify_channel_id?: string
  verify_role_id?: string
}

export interface ModelGuildConfigWelcomeChannel {
  channel_id?: string
  guild_id?: string
  id?: string
  welcome_message?: string
}

export interface ModelGuildConfigXPRole {
  created_at?: string
  guild_id?: string
  id?: number
  required_xp?: number
  role_id?: string
  updated_at?: string
}

export interface ModelGuildRole {
  guild_id?: string
  name?: string
  role_id?: number
}

export interface ModelGuildUser {
  avatar?: string
  guild_id?: string
  id?: string
  invited_by?: string
  joined_at?: string
  nickname?: string
  roles?: string[]
  user_id?: string
}

export interface ModelGuildUserXP {
  guild?: ModelDiscordGuild
  guild_id?: string
  guild_rank?: number
  level?: number
  nr_of_actions?: number
  progress?: number
  total_xp?: number
  user?: ModelUser
  user_id?: string
}

export interface ModelJSONNullString {
  string?: string
  /** Valid is true if String is not NULL */
  valid?: boolean
}

export interface ModelMixRoleNFTRequirement {
  created_at?: string
  id?: number
  nft_collection?: ModelNFTCollection
  nft_collection_id?: string
  required_amount?: number
  updated_at?: string
}

export interface ModelMixRoleTokenRequirement {
  created_at?: string
  id?: number
  required_amount?: number
  token?: ModelToken
  token_id?: number
  updated_at?: string
}

export interface ModelMonikerConfig {
  amount?: number
  created_at?: string
  guild_id?: string
  id?: string
  moniker?: string
  plural?: string
  token?: ModelOffchainTipBotToken
  token_id?: string
  updated_at?: string
}

export interface ModelNFTCollection {
  address?: string
  author?: string
  chain_id?: string
  created_at?: string
  erc_format?: string
  id?: string
  image?: string
  is_verified?: boolean
  name?: string
  symbol?: string
}

export interface ModelNFTCollectionDetail {
  address?: string
  author?: string
  chain?: ModelChain
  chain_id?: string
  created_at?: string
  erc_format?: string
  id?: string
  image?: string
  is_verified?: boolean
  name?: string
  symbol?: string
}

export interface ModelNewListedNFTCollection {
  address?: string
  author?: string
  chain?: string
  chain_id?: string
  created_at?: string
  erc_format?: string
  id?: string
  image?: string
  is_verified?: boolean
  name?: string
  symbol?: string
}

export interface ModelNftSoulbound {
  collection_address?: string
  created_at?: string
  id?: number
  total_soulbound?: number
  trait_type?: string
  updated_at?: string
  value?: string
}

export interface ModelOffchainTipBotAssignContract {
  chain_id?: string
  contract?: ModelOffchainTipBotContract
  contract_id?: string
  created_at?: string
  expired_time?: string
  id?: string
  token_id?: string
  user_id?: string
}

export interface ModelOffchainTipBotChain {
  chain_id?: number
  chain_name?: string
  contracts?: ModelOffchainTipBotContract[]
  created_at?: string
  currency?: string
  explorer_url?: string
  id?: string
  is_evm?: boolean
  rpc_url?: string
  status?: number
  support_deposit?: boolean
  tokens?: ModelOffchainTipBotToken[]
  updated_at?: string
}

export interface ModelOffchainTipBotContract {
  chain?: ModelOffchainTipBotChain
  chain_id?: string
  contract_address?: string
  created_at?: string
  id?: string
  sweeped_time?: string
  updated_at?: string
}

export interface ModelOffchainTipBotToken {
  coin_gecko_id?: string
  created_at?: string
  icon?: string
  id?: string
  service_fee?: number
  status?: number
  token_id?: string
  token_name?: string
  token_symbol?: string
  updated_at?: string
}

export interface ModelOffchainTipBotTransferHistory {
  action?: string
  amount?: number
  created_at?: string
  fee_amount?: number
  guild_id?: string
  id?: string
  log_id?: string
  receiver_id?: string
  sender_id?: string
  service_fee?: number
  status?: string
  token?: string
  tx_hash?: string
  updated_at?: string
}

export interface ModelOnchainTipBotTransaction {
  all?: boolean
  amount?: number
  channel_id?: string
  claimed_at?: string
  created_at?: string
  duration?: number
  each?: boolean
  full_command?: string
  guild_id?: string
  id?: number
  image?: string
  message?: string
  recipient_address?: string
  recipients?: string
  sender?: string
  /** (pending, claimed) */
  string?: string
  token_symbol?: string
  transfer_type?: string
  tx_hash?: string
  updated_at?: string
}

export interface ModelQuest {
  action?: string
  frequency?: number
  id?: string
  rewards?: ModelQuestReward[]
  routine?: string
  title?: string
}

export interface ModelQuestReward {
  id?: string
  pass_id?: string
  quest?: ModelQuest
  quest_id?: string
  reward_amount?: number
  reward_type?: ModelQuestRewardType
  reward_type_id?: string
}

export interface ModelQuestRewardType {
  id?: string
  name?: string
}

export interface ModelQuestUserList {
  action?: string
  current?: number
  end_time?: string
  id?: string
  is_claimed?: boolean
  is_completed?: boolean
  multiplier?: number
  quest?: ModelQuest
  quest_id?: string
  routine?: string
  start_time?: string
  target?: number
  user_id?: string
}

export interface ModelQuestUserReward {
  claimed_at?: string
  pass_id?: string
  quest_id?: string
  reward?: ModelQuestReward
  reward_amount?: number
  reward_id?: string
  reward_type_id?: string
  start_time?: string
  user_id?: string
}

export interface ModelSaleBotMarketplace {
  id?: number
  name?: string
  url?: string
}

export interface ModelSaleBotTwitterConfig {
  address?: string
  chain_id?: number
  collection_name?: string
  created_at?: string
  id?: number
  marketplace?: ModelSaleBotMarketplace
  marketplace_id?: number
  slug?: string
  updated_at?: string
}

export interface ModelToken {
  address?: string
  chain?: ModelChain
  chain_id?: number
  coin_gecko_id?: string
  decimal?: number
  discord_bot_supported?: boolean
  guild_default?: boolean
  id?: number
  is_native?: boolean
  name?: string
  symbol?: string
}

export interface ModelTradeItem {
  id?: string
  is_from?: boolean
  token_address?: string
  token_ids?: string[]
  trade_offer_id?: string
}

export interface ModelTradeOffer {
  created_at?: string
  have_items?: ModelTradeItem[]
  id?: string
  owner_address?: string
  updated_at?: string
  want_items?: ModelTradeItem[]
}

export interface ModelTwitterPostStreak {
  created_at?: string
  guild_id?: string
  last_streak_date?: string
  streak_count?: number
  total_count?: number
  twitter_handle?: string
  twitter_id?: string
  updated_at?: string
}

export interface ModelUpvoteStreakTier {
  id?: number
  streak_required?: number
  vote_interval?: number
  xp_per_interval?: number
}

export interface ModelUser {
  discriminator?: string
  guild_users?: ModelGuildUser[]
  id?: string
  nr_of_join?: number
  username?: string
}

export interface ModelUserEnvelopStreak {
  total_envelop?: number
  user_id?: string
}

export interface ModelUserFactionXpsMapping {
  academy_xp?: number
  imperial_xp?: number
  merchant_xp?: number
  rebellio_xp?: number
}

export interface ModelUserFeedback {
  command?: string
  completed_at?: string
  confirmed_at?: string
  created_at?: string
  discord_id?: string
  feedback?: string
  id?: UuidNullUUID
  message_id?: string
  status?: string
}

export interface ModelUserTelegramDiscordAssociation {
  discord_id?: string
  telegram_username?: string
}

export interface ModelUserTokenSupportRequest {
  channel_id?: string
  created_at?: string
  guild_id?: string
  id?: number
  message_id?: string
  status?: string
  symbol?: string
  token_address?: string
  token_chain_id?: number
  token_name?: string
  updated_at?: string
  user_discord_id?: string
}

export interface ModelUserWallet {
  address?: string
  chain_type?: ModelJSONNullString
  created_at?: string
  guild_id?: string
  /** preload user */
  user?: ModelUser
  user_discord_id?: string
}

export interface ModelUserWalletWatchlistItem {
  address?: string
  alias?: string
  created_at?: string
  fetched_data?: boolean
  is_owner?: boolean
  net_worth?: number
  type?: string
  user_id?: string
}

export interface RequestAddNftWatchlistRequest {
  chain?: string
  collection_address?: string
  collection_symbol?: string
  guild_id?: string
  user_id?: string
}

export interface RequestAddToTwitterBlackListRequest {
  created_by?: string
  guild_id?: string
  twitter_id?: string
  twitter_username?: string
}

export interface RequestAddToWatchlistRequest {
  coin_gecko_id?: string
  is_fiat?: boolean
  symbol?: string
  user_id?: string
}

export interface RequestAddTokenPriceAlertRequest {
  alert_type?:
    | 'price_reaches'
    | 'price_rises_above'
    | 'price_drops_to'
    | 'change_is_over'
    | 'change_is_under'
  frequency?: 'only_once' | 'once_a_day' | 'always'
  price_by_percent?: number
  symbol?: string
  user_discord_id?: string
  value?: number
}

export interface RequestBalcklistChannelRepostConfigRequest {
  channel_id?: string
  guild_id?: string
}

export interface RequestClaimOnchainTransferRequest {
  address?: string
  claim_id?: number
  user_id?: string
}

export interface RequestClaimQuestsRewardsRequest {
  quest_id?: string
  routine?: string
  user_id?: string
}

export interface RequestConfigDefaultCollection {
  address?: string
  chain?: string
  guild_id?: string
  symbol?: string
}

export interface RequestConfigDefaultTokenRequest {
  guild_id?: string
  symbol?: string
}

export interface RequestConfigGroupNFTRoleRequest {
  collection_address?: string[]
  group_name?: string
  guild_id?: string
  number_of_tokens?: number
  role_id?: string
}

export interface RequestConfigLevelRoleRequest {
  guild_id?: string
  level?: number
  role_id?: string
}

export interface RequestConfigRepostReactionStartStop {
  emoji_start?: string
  emoji_stop?: string
  guild_id?: string
  repost_channel_id?: string
}

export interface RequestConfigRepostRequest {
  emoji?: string
  guild_id?: string
  quantity?: number
  repost_channel_id?: string
}

export interface RequestConfigureInviteRequest {
  guild_id?: string
  log_channel?: string
  webhook_url?: string
}

export interface RequestCreateAssignContract {
  token_symbol?: string
  user_id?: string
}

export interface RequestCreateCommonwealthDiscussionSubscription {
  discord_thread_id: string
  discussion_id: number
}

export interface RequestCreateDaoProposalRequest {
  creator_id?: string
  description?: string
  guild_id?: string
  title?: string
  vote_option?: RequestVoteOptionRequest
  voting_channel_id?: string
}

export interface RequestCreateDaoVoteRequest {
  choice: string
  proposal_id: number
  user_id: string
}

export interface RequestCreateDefaultRoleRequest {
  guild_id: string
  role_id: string
}

export interface RequestCreateEnvelop {
  command: string
  user_id: string
}

export interface RequestCreateGuildMixRole {
  guild_id: string
  nft_requirement?: RequestMixRoleNFTRequirement
  required_level?: number
  role_id: string
  token_requirement?: RequestMixRoleTokenRequirement
}

export interface RequestCreateGuildRequest {
  id?: string
  name?: string
}

export interface RequestCreateGuildTokenRole {
  address: string
  amount: number
  chain: string
  guild_id: string
  role_id: string
}

export interface RequestCreateGuildXPRole {
  guild_id: string
  role_id: string
  xp?: number
}

export interface RequestCreateNFTCollectionRequest {
  address?: string
  author?: string
  chain?: string
  chain_id?: string
  channel_id?: string
  guild_id?: string
  message_id?: string
  priority_flag?: boolean
}

export interface RequestCreateProposalChannelConfig {
  address?: string
  authority: 'admin' | 'token_holder'
  chain?: string
  channel_id: string
  guild_id: string
  required_amount?: number
  type?: 'nft_collection' | 'crypto_token'
}

export interface RequestCreateSalesTrackerConfigRequest {
  chain?: string
  channel_id?: string
  contract_address?: string
  guild_id?: string
}

export interface RequestCreateTipConfigNotify {
  channel_id?: string
  guild_id?: string
  token?: string
}

export interface RequestCreateTradeOfferRequest {
  have_items?: RequestTradeOfferItem[]
  owner_address: string
  want_items?: RequestTradeOfferItem[]
}

export interface RequestCreateTwitterSaleConfigRequest {
  address?: string
  chain_id?: number
  marketplace?: string
}

export interface RequestCreateUserRequest {
  guild_id?: string
  id?: string
  invited_by?: string
  nickname?: string
  username?: string
}

export interface RequestCreateUserTokenSupportRequest {
  channel_id: string
  guild_id: string
  message_id: string
  token_address: string
  token_chain: string
  user_discord_id: string
}

export interface RequestDeleteDiscordUserAlertRequest {
  id?: string
}

export interface RequestDeleteGuildConfigDaoProposal {
  id?: string
}

export interface RequestDeleteGuildConfigDaoTracker {
  id?: string
}

export interface RequestDeleteJoinLeaveChannelConfigRequest {
  guild_id?: string
}

export interface RequestDeleteMonikerConfigRequest {
  guild_id: string
  moniker: string
}

export interface RequestDeleteUserDeviceRequest {
  device_id?: string
}

export interface RequestDeleteVoteChannelConfigRequest {
  guild_id?: string
}

export interface RequestDeleteWelcomeConfigRequest {
  guild_id?: string
}

export interface RequestEditMessageRepostRequest {
  guild_id?: string
  origin_channel_id?: string
  origin_message_id?: string
  repost_channel_id?: string
  repost_message_id?: string
}

export interface RequestGenerateVerificationRequest {
  guild_id?: string
  is_reverify?: boolean
  user_discord_id?: string
}

export interface RequestGetTrackingWalletsRequest {
  userID: string
}

export interface RequestGuildConfigDefaultNftTickerRequest {
  chain_id?: number
  collection_address?: string
  guild_id?: string
  query?: string
  symbol?: string
}

export interface RequestGuildConfigDefaultTickerRequest {
  default_ticker?: string
  guild_id?: string
  query?: string
}

export interface RequestGuildIDRequest {
  guild_id?: string
}

export interface RequestLinkUserTelegramWithDiscordRequest {
  discord_id: string
  telegram_username: string
}

export interface RequestLoginRequest {
  access_token?: string
}

export interface RequestMixRoleNFTRequirement {
  amount: number
  nft_id: string
}

export interface RequestMixRoleTokenRequirement {
  amount: number
  token_id: number
}

export interface RequestNewGuildConfigWalletVerificationMessageRequest {
  content?: string
  created_at?: string
  discord_message_id?: string
  embedded_message?: number[]
  guild_id?: string
  verify_channel_id?: string
  verify_role_id?: string
}

export interface RequestOffchainTransferRequest {
  all?: boolean
  amount?: number
  channel_id?: string
  duration?: number
  each?: boolean
  full_command?: string
  guild_id?: string
  image?: string
  message?: string
  platform?: string
  recipients?: string[]
  sender?: string
  token?: string
  transfer_type?: string
}

export interface RequestOffchainWithdrawRequest {
  all?: boolean
  amount?: number
  channel_id?: string
  duration?: number
  each?: boolean
  full_command?: string
  guild_id?: string
  recipient?: string
  recipient_address?: string
  token?: string
  transfer_type?: string
}

export interface RequestRoleReactionRequest {
  guild_id?: string
  message_id?: string
  reaction?: string
}

export interface RequestRoleReactionUpdateRequest {
  channel_id?: string
  guild_id?: string
  message_id?: string
  reaction?: string
  role_id?: string
}

export interface RequestSendUserXPRequest {
  amount?: number
  each?: boolean
  guild_id?: string
  recipients?: string[]
}

export interface RequestSetUpvoteMessageCacheRequest {
  channel_id?: string
  guild_id?: string
  message_id?: string
  user_id?: string
}

export interface RequestSubmitOnchainTransferRequest {
  all?: boolean
  amount?: number
  channel_id?: string
  duration?: number
  each?: boolean
  full_command?: string
  guild_id?: string
  image?: string
  message?: string
  platform?: string
  recipients?: string[]
  sender?: string
  token?: string
  transfer_type?: string
}

export interface RequestTrackWalletRequest {
  address: string
  alias?: string
  channel_id?: string
  is_owner?: boolean
  message_id?: string
  type: string
  user_id: string
}

export interface RequestTradeOfferItem {
  token_address: string
  token_ids: string[]
}

export interface RequestTwitterHashtag {
  channel_id?: string
  from_twitter?: string[]
  guild_id?: string
  hashtag?: string[]
  rule_id?: string
  twitter_username?: string[]
  user_id?: string
}

export interface RequestTwitterPost {
  content?: string
  guild_id?: string
  tweet_id?: string
  twitter_handle?: string
  twitter_id?: string
}

export interface RequestUpdateDaoVoteRequest {
  choice: string
  user_id: string
}

export interface RequestUpdateGuildRequest {
  active?: boolean
  global_xp?: boolean
  left_at?: string
  log_channel?: string
}

export interface RequestUpdateQuestProgressRequest {
  action?: string
  guild_id?: string
  user_id?: string
}

export interface RequestUpdateUserFeedbackRequest {
  id?: string
  status?: string
}

export interface RequestUpsertCustomTokenConfigRequest {
  active?: boolean
  address?: string
  chain?: string
  chain_id?: number
  coin_gecko_id?: string
  decimals?: number
  discord_bot_supported?: boolean
  guild_default?: boolean
  guild_id?: string
  id?: number
  name?: string
  symbol?: string
}

export interface RequestUpsertDiscordUserAlertRequest {
  device_id?: string
  discord_id?: string
  id?: string
  is_enable?: boolean
  price_set?: number
  symbol?: string
  token_id?: string
  trend?: string
}

export interface RequestUpsertGmConfigRequest {
  channel_id?: string
  emoji?: string
  guild_id?: string
  msg?: string
  sticker?: string
}

export interface RequestUpsertGuildConfigDaoTracer {
  channel_id?: string
  guild_id?: string
  snapshot_url?: string
}

export interface RequestUpsertGuildDefaultCurrencyRequest {
  Symbol?: string
  guild_id?: string
}

export interface RequestUpsertGuildPruneExcludeRequest {
  guild_id?: string
  role_id?: string
}

export interface RequestUpsertGuildTokenConfigRequest {
  active?: boolean
  guild_id?: string
  symbol?: string
}

export interface RequestUpsertJoinLeaveChannelConfigRequest {
  channel_id?: string
  guild_id?: string
}

export interface RequestUpsertMonikerConfigRequest {
  amount: number
  guild_id: string
  moniker: string
  plural?: string
  token: string
}

export interface RequestUpsertUserDeviceRequest {
  device_id?: string
  ios_noti_token?: string
}

export interface RequestUpsertVoteChannelConfigRequest {
  channel_id?: string
  guild_id?: string
}

export interface RequestUpsertWelcomeConfigRequest {
  channel_id?: string
  guild_id?: string
  welcome_message?: string
}

export interface RequestUserFeedbackRequest {
  avatar?: string
  command?: string
  discord_id?: string
  feedback?: string
  message_id?: string
  username?: string
}

export interface RequestVerifyWalletAddressRequest {
  code?: string
  signature?: string
  wallet_address?: string
}

export interface RequestVoteOptionRequest {
  address?: string
  chain_id?: number
  id?: number
  required_amount?: number
  symbol?: string
}

export interface ResponseAddToWatchlistResponse {
  data?: ResponseAddToWatchlistResponseData
}

export interface ResponseAddToWatchlistResponseData {
  base_suggestions?: ModelCoingeckoSupportedTokens[]
  target_suggestions?: ModelCoingeckoSupportedTokens[]
}

export interface ResponseAddTokenPriceAlertResponse {
  data?: ResponseTokenPriceAlertResponseData
}

export interface ResponseAllTipBotTokensResponse {
  data?: ModelOffchainTipBotToken[]
}

export interface ResponseChainGasTrackerResponseData {
  data?: ResponseGasTrackerResponse
}

export interface ResponseClaimOnchainTransfer {
  amount?: number
  amount_in_usd?: number
  recipient_address?: string
  recipient_id?: string
  sender_id?: string
  symbol?: string
  tx_hash?: string
  tx_url?: string
}

export interface ResponseClaimOnchainTransferResponse {
  data?: ResponseClaimOnchainTransfer
}

export interface ResponseClaimQuestsRewardsResponse {
  data?: ResponseClaimQuestsRewardsResponseData
}

export interface ResponseClaimQuestsRewardsResponseData {
  rewards?: ModelQuestUserReward[]
}

export interface ResponseCoinDescription {
  en?: string
}

export interface ResponseCoinImage {
  large?: string
  small?: string
  thumb?: string
}

export interface ResponseCoinMarketItemData {
  current_price?: number
  id?: string
  image?: string
  is_default?: boolean
  is_pair?: boolean
  name?: string
  price_change_percentage_24h?: number
  price_change_percentage_7d_in_currency?: number
  sparkline_in_7d?: {
    price?: number[]
  }
  symbol?: string
}

export interface ResponseCoinPriceHistoryResponse {
  from?: string
  prices?: number[]
  times?: string[]
  timestamps?: number[]
  to?: string
}

export interface ResponseCollectionSuggestions {
  address?: string
  chain?: string
  chain_id?: number
  name?: string
  symbol?: string
}

export interface ResponseCompareTokenReponseData {
  base_coin?: ResponseGetCoinResponse
  base_coin_suggestions?: ModelCoingeckoSupportedTokens[]
  from?: string
  ratios?: number[]
  target_coin?: ResponseGetCoinResponse
  target_coin_suggestions?: ModelCoingeckoSupportedTokens[]
  times?: string[]
  to?: string
}

export interface ResponseCompareTokenResponse {
  data?: ResponseCompareTokenReponseData
}

export interface ResponseConfigGroupNFTRoleResponse {
  group_name?: string
  guild_id?: string
  nft_collection_configs?: ResponseNFTCollectionConfig[]
  number_of_tokens?: number
  role_id?: string
}

export interface ResponseConfigNotifyResponse {
  channel_id?: string
  created_at?: string
  guild_id?: string
  id?: string
  token?: string
  total_transaction?: number
  updated_at?: string
}

export interface ResponseConfigureInvitesResponse {
  data?: string
}

export interface ResponseCreateCommonwealthDiscussionSubscription {
  data?: ModelCommonwealthDiscussionSubscription
}

export interface ResponseCreateDaoProposalResponse {
  data?: ModelDaoProposal
}

export interface ResponseCreateEnvelop {
  data?: ModelEnvelop
}

export interface ResponseCreateGuildMixRole {
  data?: ModelGuildConfigMixRole
}

export interface ResponseCreateGuildTokenRole {
  data?: ModelGuildConfigTokenRole
}

export interface ResponseCreateGuildXPRole {
  data?: ModelGuildConfigXPRole
}

export interface ResponseCreateNFTCollectionResponse {
  data?: ModelNFTCollection
}

export interface ResponseCreateProposalChannelConfigResponse {
  data?: ModelGuildConfigDaoProposal
}

export interface ResponseCreateTradeOfferResponse {
  data?: ModelTradeOffer
}

export interface ResponseCreateTwitterSaleConfigResponse {
  data?: ModelSaleBotTwitterConfig
}

export interface ResponseCreateUserTokenSupportRequest {
  data?: ModelUserTokenSupportRequest
}

export interface ResponseCurrentUserUpvoteStreakResponse {
  data?: ResponseGetUserCurrentUpvoteStreakResponse
}

export interface ResponseDaoTrackerSpaceCountData {
  count?: number
  source?: string
  space?: string
}

export interface ResponseDaoTrackerSpaceCountResponse {
  data?: ResponseDaoTrackerSpaceCountData[]
  metadata?: ResponsePaginationResponse
}

export interface ResponseDataFilterConfigByReaction {
  data?: ResponseRoleReactionResponse
  /** page index */
  page?: number
  /** page size */
  size?: number
  total?: number
}

export interface ResponseDataListRoleReactionResponse {
  data?: ResponseListRoleReactionResponse
  /** page index */
  page?: number
  /** page size */
  size?: number
  total?: number
}

export interface ResponseDataMetric {
  data?: ResponseMetric
}

export interface ResponseDefaultRole {
  guild_id?: string
  role_id?: string
}

export interface ResponseDefaultRoleResponse {
  data?: ResponseDefaultRole
}

export interface ResponseDiscordGuildResponse {
  bot_addable?: boolean
  bot_arrived?: boolean
  features?: string[]
  icon?: string
  id?: string
  name?: string
  owner?: boolean
  /** @example "0" */
  permissions?: string
}

export interface ResponseDiscordGuildRole {
  color?: number
  hoist?: boolean
  icon?: string
  id?: string
  managed?: boolean
  mentionable?: boolean
  name?: string
  permissions?: string
  position?: number
  unicode_emoji?: string
}

export interface ResponseDiscordUserTokenAlertResponse {
  data?: ModelDiscordUserTokenAlert[]
}

export interface ResponseExtraFee {
  chargeFeeBy?: string
  feeAmount?: string
  feeReceiver?: string
  isImBps?: boolean
}

export interface ResponseGasTrackerResponse {
  chain?: string
  est_fast_time?: string
  est_propose_time?: string
  est_safe_time?: string
  fast_gas_price?: string
  propose_gas_price?: string
  safe_gas_price?: string
}

export interface ResponseGasTrackerResponseData {
  data?: ResponseGasTrackerResponse[]
}

export interface ResponseGenerateVerificationResponse {
  code?: string
  status?: string
}

export interface ResponseGetAllDaoProposalVotes {
  proposal?: ResponseGetDaoProposalData
  votes?: ModelDaoVote[]
}

export interface ResponseGetAllDaoProposals {
  data?: ModelDaoProposal[]
}

export interface ResponseGetAllTwitterConfigResponse {
  data?: ModelGuildConfigTwitterFeed[]
  message?: string
}

export interface ResponseGetAllTwitterHashtagConfigResponse {
  data?: ResponseTwitterHashtag[]
}

export interface ResponseGetAllUserSubmittedAdResponse {
  data?: ResponseGetAllUserSubmittedAdResponse[]
}

export interface ResponseGetAssignedContract {
  data?: ModelOffchainTipBotAssignContract
}

export interface ResponseGetCoinResponse {
  asset_platform_id?: string
  description?: ResponseCoinDescription
  id?: string
  image?: ResponseCoinImage
  market_cap_rank?: number
  market_data?: ResponseMarketData
  name?: string
  symbol?: string
  tickers?: ResponseTickerData[]
}

export interface ResponseGetCoinResponseWrapper {
  data?: ResponseGetCoinResponse
}

export interface ResponseGetCollectionCountResponse {
  data?: ResponseNFTCollectionCount
}

export interface ResponseGetDaoProposalData {
  closed_at?: string
  created_at?: string
  creator_id?: string
  description?: string
  discussion_channel_id?: string
  guild_config_dao_proposal_id?: number
  guild_id?: string
  id?: number
  points?: ModelDaoProposalVoteCount[]
  title?: string
  updated_at?: string
  voting_channel_id?: string
}

export interface ResponseGetDataUserProfileResponse {
  data?: ResponseGetUserProfileResponse
}

export interface ResponseGetDefaultTokenResponse {
  data?: ModelToken
}

export interface ResponseGetDetailNftCollectionResponse {
  data?: ModelNFTCollectionDetail
}

export interface ResponseGetFiatHistoricalExchangeRatesResponse {
  from?: string
  latest_rate?: number
  rates?: number[]
  times?: string[]
  to?: string
}

export interface ResponseGetGmConfigResponse {
  data?: ModelGuildConfigGmGn
  message?: string
}

export interface ResponseGetGuildConfigDaoProposal {
  data?: ResponseGetGuildConfigDaoProposalData
}

export interface ResponseGetGuildConfigDaoProposalData {
  address?: string
  authority?: string
  chain?: string
  chain_id?: number
  created_at?: string
  guideline_channel_id?: string
  guild_id?: string
  id?: number
  proposal_channel_id?: string
  required_amount?: string
  symbol?: string
  type?: string
  updated_at?: string
}

export interface ResponseGetGuildDefaultNftTickerResponse {
  data?: ModelGuildConfigDefaultCollection
}

export interface ResponseGetGuildDefaultTickerResponse {
  data?: ModelGuildConfigDefaultTicker
}

export interface ResponseGetGuildLevelUpMessage {
  data?: ModelGuildConfigLevelupMessage
}

export interface ResponseGetGuildPruneExcludeResponse {
  data?: ResponseGuildPruneExcludeList
  message?: string
}

export interface ResponseGetGuildResponse {
  active?: boolean
  alias?: string
  bot_scopes?: string[]
  global_xp?: boolean
  icon?: string
  id?: string
  log_channel?: string
  log_channel_id?: string
  name?: string
}

export interface ResponseGetGuildTokensResponse {
  data?: ModelToken[]
}

export interface ResponseGetGuildUserResponse {
  guild_id?: string
  invited_by?: string
  nickname?: string
  user_id?: string
}

export interface ResponseGetGuildsResponse {
  data?: ResponseGetGuildResponse[]
}

export interface ResponseGetHistoricalMarketChartResponse {
  data?: ResponseCoinPriceHistoryResponse
}

export interface ResponseGetInviteTrackerConfigResponse {
  data?: ModelGuildConfigInviteTracker
  message?: string
}

export interface ResponseGetInvitesLeaderboardResponse {
  data?: ResponseUserInvitesAggregation[]
}

export interface ResponseGetInvitesResponse {
  data?: string[]
}

export interface ResponseGetLevelRoleConfigsResponse {
  data?: ModelGuildConfigLevelRole[]
  /** page index */
  page?: number
  /** page size */
  size?: number
  total?: number
}

export interface ResponseGetLinkedTelegramResponse {
  data?: ModelUserTelegramDiscordAssociation
}

export interface ResponseGetListAllChainsResponse {
  data?: ModelChain[]
}

export interface ResponseGetMyInfoResponse {
  data?: DiscordgoUser
}

export interface ResponseGetNFTActivityData {
  data?: ResponseIndexerNFTActivityData[]
  metadata?: UtilPagination
}

export interface ResponseGetNFTActivityResponse {
  data?: ResponseGetNFTActivityData
}

export interface ResponseGetNFTCollectionByAddressChain {
  address?: string
  author?: string
  chain_id?: string
  created_at?: string
  description?: string
  discord?: string
  erc_format?: string
  id?: string
  image?: string
  is_verified?: boolean
  marketplaces?: string[]
  name?: string
  symbol?: string
  twitter?: string
  website?: string
}

export interface ResponseGetNFTCollectionByAddressChainResponse {
  data?: ResponseGetNFTCollectionByAddressChain
}

export interface ResponseGetNftWatchlist {
  floor_price?: number
  id?: string
  image?: string
  is_pair?: boolean
  name?: string
  price_change_percentage_24h?: number
  price_change_percentage_7d_in_currency?: number
  sparkline_in_7d?: ResponseSparkLineIn7D
  symbol?: string
  token?: ResponseIndexerToken
}

export interface ResponseGetNftWatchlistResponse {
  data?: ResponseGetNftWatchlist[]
}

export interface ResponseGetOnchainTransfersResponse {
  data?: ModelOnchainTipBotTransaction[]
}

export interface ResponseGetOneWalletResponse {
  data?: ModelUserWalletWatchlistItem
}

export interface ResponseGetRepostReactionConfigsResponse {
  data?: ModelGuildConfigRepostReaction[]
}

export interface ResponseGetSaleTwitterConfigResponse {
  data?: ModelSaleBotTwitterConfig[]
}

export interface ResponseGetSalesTrackerConfigResponse {
  data?: ModelGuildConfigSalesTracker[]
}

export interface ResponseGetSoulBoundNFTResponse {
  data?: ModelNftSoulbound[]
}

export interface ResponseGetSuggestionNFTCollectionsResponse {
  data?: ResponseCollectionSuggestions[]
}

export interface ResponseGetSupportedChains {
  data?: string[]
}

export interface ResponseGetSupportedTokenResponse {
  data?: ModelToken
}

export interface ResponseGetSupportedTokensResponse {
  data?: ModelToken[]
}

export interface ResponseGetTrackingWalletsResponse {
  data?: ModelUserWalletWatchlistItem[]
}

export interface ResponseGetTradeOfferResponse {
  data?: ModelTradeOffer
}

export interface ResponseGetTwitterBlackListResponse {
  data?: ModelGuildConfigTwitterBlacklist[]
}

export interface ResponseGetTwitterHashtagConfigResponse {
  data?: ResponseTwitterHashtag
}

export interface ResponseGetTwitterLeaderboardResponse {
  data?: ResponseGetTwitterLeaderboardResponseData
}

export interface ResponseGetTwitterLeaderboardResponseData {
  data?: ModelTwitterPostStreak[]
  metadata?: ResponsePaginationResponse
}

export interface ResponseGetUpvoteTiersConfig {
  data?: ModelUpvoteStreakTier[]
  message?: string
}

export interface ResponseGetUserBalances {
  balances?: number
  balances_in_usd?: number
  id?: string
  name?: string
  rate_in_usd?: number
  symbol?: string
}

export interface ResponseGetUserBalancesResponse {
  data?: ResponseGetUserBalances[]
}

export interface ResponseGetUserCurrentGMStreakResponse {
  data?: ModelDiscordUserGMStreak
}

export interface ResponseGetUserCurrentUpvoteStreakResponse {
  discord_id?: string
  last_streak_time?: string
  minutes_until_reset?: number
  minutes_until_reset_discordbotlist?: number
  minutes_until_reset_topgg?: number
  streak_count?: number
  total_count?: number
}

export interface ResponseGetUserEnvelopStreak {
  data?: ModelUserEnvelopStreak
}

export interface ResponseGetUserProfileResponse {
  about_me?: string
  current_level?: ModelConfigXpLevel
  guild?: ModelDiscordGuild
  guild_rank?: number
  guild_xp?: number
  id?: string
  next_level?: ModelConfigXpLevel
  nr_of_actions?: number
  progress?: number
  user_faction_xps?: ModelUserFactionXpsMapping
  user_wallet?: ModelUserWallet
}

export interface ResponseGetUserQuestListResponse {
  data?: ModelQuestUserList[]
}

export interface ResponseGetUserResponse {
  data?: ResponseUser
}

export interface ResponseGetUserSubmittedAdResponse {
  ad_channel_id?: string
  creator_id?: string
  description?: string
  id?: number
  image?: string
  introduction?: string
  is_podtown_ad?: boolean
  name?: string
  string?: string
}

export interface ResponseGetUserUpvoteLeaderboardResponse {
  data?: ModelDiscordUserUpvoteStreak[]
  message?: string
}

export interface ResponseGetUserWalletByGuildIDAddressResponse {
  data?: ModelUserWallet
}

export interface ResponseGetVote {
  data?: ModelDaoVote
}

export interface ResponseGetVoteChannelConfigResponse {
  data?: ModelGuildConfigVoteChannel
  message?: string
}

export interface ResponseGetWatchlistResponse {
  data?: ResponseCoinMarketItemData[]
  metadata?: ResponsePaginationResponse
}

export interface ResponseGetWelcomeChannelConfigResponse {
  data?: ModelGuildConfigWelcomeChannel
  message?: string
}

export interface ResponseGuildConfigDaoTrackerResponse {
  data?: ModelGuildConfigDaoTracker[]
}

export interface ResponseGuildConfigDefaultCurrencyResponse {
  created_at?: string
  guild_id?: string
  tip_bot_token?: ModelOffchainTipBotToken
  updated_at?: string
}

export interface ResponseGuildProposalUsageData {
  guild_id?: string
  guild_name?: string
  is_active?: boolean
  proposal_count?: number
}

export interface ResponseGuildProposalUsageResponse {
  data?: ResponseGuildProposalUsageData[]
  metadata?: ResponsePaginationResponse
}

export interface ResponseGuildPruneExcludeList {
  guild_id?: string
  roles?: string[]
}

export interface ResponseIndexerChain {
  chain_id?: number
  is_evm?: boolean
  name?: string
  symbol?: string
}

export interface ResponseIndexerGetNFTTokenDetailResponseWithSuggestions {
  data?: ResponseIndexerNFTTokenDetailData
  default_symbol?: ResponseCollectionSuggestions
  suggestions?: ResponseCollectionSuggestions[]
}

export interface ResponseIndexerGetNFTTokenTickersResponse {
  data?: ResponseIndexerNFTTokenTickersData
}

export interface ResponseIndexerGetNFTTokensResponse {
  data?: ResponseIndexerNFTTokenDetailData[]
  page?: number
  size?: number
  total?: number
}

export interface ResponseIndexerNFTActivityData {
  chain_id?: number
  contract_address?: string
  created_time?: string
  event_type?: string
  from_address?: string
  id?: number
  last_update_time?: string
  listing_price?: string
  listing_price_obj?: ResponseIndexerPrice
  listing_status?: string
  listing_type?: string
  payment_token?: number
  platform_id?: number
  quantity?: string
  sold_price?: string
  sold_price_obj?: ResponseIndexerPrice
  to_address?: string
  token_id?: string
  transaction_hash?: string
}

export interface ResponseIndexerNFTCollectionTickersData {
  address?: string
  chain?: ResponseIndexerChain
  collection_image?: string
  floor_price?: ResponseIndexerPrice
  items?: number
  last_sale_price?: ResponseIndexerPrice
  marketplaces?: string[]
  name?: string
  owners?: number
  price_change_1d?: string
  price_change_30d?: string
  price_change_7d?: string
  tickers?: ResponseIndexerTickers
  total_volume?: ResponseIndexerPrice
}

export interface ResponseIndexerNFTCollectionTickersResponse {
  data?: ResponseIndexerNFTCollectionTickersData
}

export interface ResponseIndexerNFTTokenAttribute {
  collection_address?: string
  count?: number
  frequency?: string
  rarity?: string
  token_id?: string
  trait_type?: string
  value?: string
}

export interface ResponseIndexerNFTTokenDetailData {
  amount?: string
  attributes?: ResponseIndexerNFTTokenAttribute[]
  collection_address?: string
  description?: string
  image?: string
  image_cdn?: string
  image_content_type?: string
  marketplace?: ResponseNftListingMarketplace[]
  metadata_id?: string
  name?: string
  owner?: ResponseIndexerNftTokenOwner
  rarity?: ResponseIndexerNFTTokenRarity
  rarity_rank?: number
  rarity_score?: string
  rarity_tier?: string
  thumbnail_cdn?: string
  token_id?: string
}

export interface ResponseIndexerNFTTokenRarity {
  rank?: number
  rarity?: string
  score?: string
  total?: number
}

export interface ResponseIndexerNFTTokenTickersData {
  collection_address?: string
  description?: string
  floor_price?: ResponseIndexerPrice
  image?: string
  image_cdn?: string
  last_sale_at?: string
  last_sale_price?: ResponseIndexerPrice
  name?: string
  price_change_30d?: string
  price_change_365d?: string
  price_change_90d?: string
  price_change_percentage_30d?: string
  price_change_percentage_365d?: string
  price_change_percentage_90d?: string
  rarity_rank?: number
  rarity_score?: string
  rarity_tier?: string
  tickers?: ResponseIndexerTickers
  token_id?: string
}

export interface ResponseIndexerNftTokenOwner {
  collection_address?: string
  owner_address?: string
  token_id?: string
}

export interface ResponseIndexerPrice {
  amount?: string
  token?: ResponseIndexerToken
}

export interface ResponseIndexerTickers {
  prices?: ResponseIndexerPrice[]
  times?: string[]
  timestamps?: number[]
}

export interface ResponseIndexerToken {
  address?: string
  decimals?: number
  is_native?: boolean
  symbol?: string
}

export interface ResponseInvitesAggregationResponse {
  data?: ResponseUserInvitesAggregation
}

export interface ResponseKyberSwapRoutes {
  code?: number
  data?: ResponseRouteSummaryData
  message?: string
}

export interface ResponseLinkUserTelegramWithDiscordResponse {
  data?: ResponseLinkUserTelegramWithDiscordResponseData
}

export interface ResponseLinkUserTelegramWithDiscordResponseData {
  discord_id?: string
  discord_username?: string
  telegram_username?: string
}

export interface ResponseListAllCustomTokenResponse {
  data?: ModelToken[]
}

export interface ResponseListAllNFTCollectionsResponse {
  data?: ModelNFTCollection[]
}

export interface ResponseListConfigNotifyResponse {
  data?: ResponseConfigNotifyResponse[]
}

export interface ResponseListGuildGroupNFTRolesResponse {
  data?: ResponseListGuildNFTRoleConfigsResponse[]
}

export interface ResponseListGuildMixRoles {
  data?: ModelGuildConfigMixRole[]
}

export interface ResponseListGuildNFTRoleConfigsResponse {
  color?: number
  group_name?: string
  guild_id?: string
  id?: string
  nft_collection_configs?: ResponseNFTCollectionConfig[]
  number_of_tokens?: number
  role_id?: string
  role_name?: string
}

export interface ResponseListGuildTokenRoles {
  data?: ModelGuildConfigTokenRole[]
}

export interface ResponseListGuildXPRoles {
  data?: ModelGuildConfigXPRole[]
}

export interface ResponseListMyGuildsResponse {
  data?: ResponseDiscordGuildResponse[]
}

export interface ResponseListRoleReactionResponse {
  configs?: ResponseRoleReactionByMessage[]
  guild_id?: string
  success?: boolean
}

export interface ResponseListTokenPriceAlertResponse {
  alert_type?: string
  created_at?: string
  currency?: string
  frequency?: string
  price?: number
  snoozed_to?: string
  symbol?: string
  updated_at?: string
  user_discord_id?: string
}

export interface ResponseLogoutResponse {
  message?: string
  status?: string
}

export interface ResponseMarketData {
  current_price?: Record<string, number>
  market_cap?: Record<string, number>
  price_change_percentage_1h_in_currency?: Record<string, number>
  price_change_percentage_24h_in_currency?: Record<string, number>
  price_change_percentage_7d_in_currency?: Record<string, number>
}

export interface ResponseMetric {
  nft_collections?: number
  server_active_users?: number
  server_command_usage?: number
  server_token?: string[]
  server_token_supported?: number
  server_verified_wallets?: number
  total_active_users?: number
  total_command_usage?: number
  total_servers?: number
  total_token?: string[]
  total_token_supported?: number
  total_verified_wallets?: number
}

export interface ResponseMonikerConfigData {
  moniker?: ModelMonikerConfig
  value?: number
}

export interface ResponseMonikerConfigResponse {
  data?: ResponseMonikerConfigData[]
}

export interface ResponseNFTChainCollectionCount {
  chain?: ModelChain
  count?: number
}

export interface ResponseNFTCollectionConfig {
  address?: string
  author?: string
  chain_id?: string
  chain_name?: string
  collection_id?: string
  created_at?: string
  erc_format?: string
  explorer_url?: string
  id?: string
  image?: string
  is_verified?: boolean
  name?: string
  symbol?: string
}

export interface ResponseNFTCollectionCount {
  data?: ResponseNFTChainCollectionCount[]
  total?: number
}

export interface ResponseNFTCollectionsData {
  data?: ModelNFTCollection[]
  metadata?: UtilPagination
}

export interface ResponseNFTCollectionsResponse {
  data?: ResponseNFTCollectionsData
}

export interface ResponseNFTNewListed {
  data?: ModelNewListedNFTCollection[]
  metadata?: UtilPagination
}

export interface ResponseNFTNewListedResponse {
  data?: ResponseNFTNewListed
}

export interface ResponseNFTTradingVolume {
  collection_address?: string
  collection_chain_id?: number
  collection_name?: string
  collection_symbol?: string
  token?: string
  trading_volume?: number
}

export interface ResponseNFTTradingVolumeResponse {
  data?: ResponseNFTTradingVolume[]
}

export interface ResponseNewGuildConfigWalletVerificationMessageResponse {
  data?: ModelGuildConfigWalletVerificationMessage
  status?: string
}

export interface ResponseNewGuildGroupNFTRoleResponse {
  data?: ResponseConfigGroupNFTRoleResponse
  message?: string
}

export interface ResponseNftListingMarketplace {
  contract_address?: string
  floor_price?: string
  item_url?: string
  listing_price?: string
  listing_status?: string
  payment_token?: string
  payment_token_decimals?: string
  platform_id?: number
  platform_name?: string
  token_id?: string
}

export interface ResponseNftMetadataAttrIcon {
  discord_icon?: string
  id?: number
  trait_type?: string
  unicode_icon?: string
}

export interface ResponseNftMetadataAttrIconResponse {
  data?: ResponseNftMetadataAttrIcon[]
}

export interface ResponseNftSales {
  buyer?: string
  nft_collection_address?: string
  nft_name?: string
  nft_price?: number
  nft_price_token?: string
  nft_status?: string
  platform?: string
  seller?: string
}

export interface ResponseNftSalesResponse {
  data?: ResponseNftSales[]
}

export interface ResponseNftWatchlistSuggest {
  default_symbol?: ResponseCollectionSuggestions
  suggestions?: ResponseCollectionSuggestions[]
}

export interface ResponseNftWatchlistSuggestResponse {
  data?: ResponseNftWatchlistSuggest
}

export interface ResponseOffchainTipBotTransferToken {
  amount?: number
  amount_in_usd?: number
  recipient_id?: string
  sender_id?: string
  symbol?: string
}

export interface ResponseOffchainTipBotTransferTokenResponse {
  data?: ResponseOffchainTipBotTransferToken[]
}

export interface ResponseOffchainTipBotWithdraw {
  amount?: number
  symbol?: string
  to_address?: string
  transaction_fee?: number
  tx_hash?: string
  tx_url?: string
  user_discord_id?: string
  withdraw_amount?: BigFloat
}

export interface ResponseOffchainTipBotWithdrawResponse {
  data?: ResponseOffchainTipBotWithdraw
}

export interface ResponsePaginationResponse {
  /** page index */
  page?: number
  /** page size */
  size?: number
  total?: number
}

export interface ResponseResponseDataMessage {
  data?: ResponseResponseMessage
}

export interface ResponseResponseMessage {
  message?: string
}

export interface ResponseResponseStatus {
  status?: string
}

export interface ResponseResponseSucess {
  success?: boolean
}

export interface ResponseRole {
  id?: string
  reaction?: string
}

export interface ResponseRoleReactionByMessage {
  channel_id?: string
  message_id?: string
  roles?: ResponseRole[]
}

export interface ResponseRoleReactionConfigResponse {
  channel_id?: string
  guild_id?: string
  message_id?: string
  roles?: ResponseRole[]
  success?: boolean
}

export interface ResponseRoleReactionResponse {
  channel_id?: string
  guild_id?: string
  message_id?: string
  role?: ResponseRole
}

export interface ResponseRouteElement {
  amountOut?: string
  exchange?: string
  extra?: any
  limitReturnAmount?: string
  pool?: string
  poolExtra?: any
  poolLength?: number
  poolType?: string
  swapAmount?: string
  tokenIn?: string
  tokenOut?: string
}

export interface ResponseRouteSummary {
  amountIn?: string
  amountInUsd?: string
  amountOut?: string
  amountOutUsd?: string
  extraFee?: ResponseExtraFee
  gas?: string
  gasPrice?: string
  gasUsd?: string
  route?: ResponseRouteElement[][]
  tokenIn?: string
  tokenInMarketPriceAvailable?: boolean
  tokenOut?: string
  tokenOutMarketPriceAvailable?: boolean
}

export interface ResponseRouteSummaryData {
  routeSummary?: ResponseRouteSummary
  routerAddress?: string
}

export interface ResponseSearchCoinResponse {
  data?: ModelCoingeckoSupportedTokens[]
}

export interface ResponseSparkLineIn7D {
  price?: number[]
}

export interface ResponseSubmitOnchainTransfer {
  amount?: number
  amount_in_usd?: number
  recipient_id?: string
  sender_id?: string
  symbol?: string
}

export interface ResponseSubmitOnchainTransferResponse {
  data?: ResponseSubmitOnchainTransfer[]
}

export interface ResponseTickerData {
  base?: string
  coin_id?: string
  last?: number
  target?: string
  target_coin_id?: string
}

export interface ResponseToggleActivityConfigResponse {
  data?: ModelGuildConfigActivity
  message?: string
}

export interface ResponseTokenHolderStatus {
  data?: ResponseTokenHolderStatusData
}

export interface ResponseTokenHolderStatusData {
  guild_config?: ModelGuildConfigDaoProposal
  is_qualified?: boolean
  is_wallet_connected?: boolean
  user_holding_amount?: string
  vote_config?: ModelDaoProposalVoteOption
}

export interface ResponseTokenPriceAlertResponseData {
  alert_type?: string
  currency?: string
  frequency?: string
  price_by_percent?: number
  snoozed_to?: string
  symbol?: string
  user_discord_id?: string
  value?: number
}

export interface ResponseTopUser {
  author?: ModelGuildUserXP
  leaderboard?: ModelGuildUserXP[]
  metadata?: ResponsePaginationResponse
}

export interface ResponseTransactionsResponse {
  data?: ModelOffchainTipBotTransferHistory[]
}

export interface ResponseTwitterHashtag {
  channel_id?: string
  created_at?: string
  from_twitter?: string[]
  guild_id?: string
  hashtag?: string[]
  rule_id?: string
  twitter_username?: string[]
  updated_at?: string
  user_id?: string
}

export interface ResponseUpdateGuildTokenRole {
  data?: ModelGuildConfigTokenRole
}

export interface ResponseUpdateUserFeedbackResponse {
  data?: ModelUserFeedback
}

export interface ResponseUpdateVote {
  data?: ModelDaoVote
}

export interface ResponseUser {
  discriminator?: string
  guild_users?: ResponseGetGuildUserResponse[]
  id?: string
  nr_of_join?: number
  username?: string
}

export interface ResponseUserDeviceResponse {
  device_id?: string
  ios_noti_token?: string
}

export interface ResponseUserFeedbackResponse {
  data?: ModelUserFeedback[]
  page?: number
  size?: number
  total?: number
}

export interface ResponseUserInvitesAggregation {
  fake?: number
  inviter_id?: string
  left?: number
  regular?: number
}

export interface ResponseUserTransactionResponse {
  data?: ModelOffchainTipBotTransferHistory[]
}

export interface UtilPagination {
  page?: number
  size?: number
  total?: number
}

export interface UuidNullUUID {
  uuid?: string
  /** Valid is true if UUID is not NULL */
  valid?: boolean
}

export interface TransactionNode {
  profile_id: string
  total_volume: number
  spend_volume: number
  receive_volume: number
  profile: Profile

}

export interface TransactionEdge {
  from_profile_id: string
  to_profile_id: string
  total_volume: number
  spend: number
  receive: number
}

export interface TransactionGraphData {
  nodes: TransactionNode[],
  edges: TransactionEdge[]
}
