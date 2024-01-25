import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import AbortAddon from 'wretch/addons/abort'

import { MOCHI_PAY_API, MOCHI_PROFILE_API, MOCHI_API } from '../envs'

const MOCHI_PROFILE = wretch(MOCHI_PROFILE_API)
  .addon(QueryStringAddon)
  .addon(AbortAddon())
  .errorType('json')

const MOCHI_PAY = wretch(MOCHI_PAY_API)
  .addon(QueryStringAddon)
  .addon(AbortAddon())
  .errorType('json')

const MOCHI = wretch(MOCHI_API)
  .addon(QueryStringAddon)
  .addon(AbortAddon())
  .errorType('json')

export const API = {
  MOCHI_PROFILE,
  MOCHI_PAY,
  MOCHI,
}

export const apiLogin = (token: string) => {
  API.MOCHI_PROFILE = MOCHI_PROFILE.auth(`Bearer ${token}`)
  API.MOCHI_PAY = MOCHI_PAY.auth(`Bearer ${token}`)
  API.MOCHI = MOCHI.auth(`Bearer ${token}`)
}

export const apiLogout = () => {
  API.MOCHI_PROFILE = MOCHI_PROFILE
  API.MOCHI_PAY = MOCHI_PAY
  API.MOCHI = MOCHI
}

export const GET_PATHS = {
  GUILDS: '/discord/users/me/guilds',
  GUILD: (id: string) => `/guilds/${id}`,
  GUILD_ROLES: (id: string) => `/guilds/${id}/roles`,
  USERS_TOP: '/users/top',
  PROFILE_ID: (id: string) => `/profiles/${id}`,
  PROFILE_ACTIVITES: (id: string) => `/profiles/${id}/activities`,
  PROFILE_TRANSACTION: (id: string) => `/profile/${id}/transactions`,
  PROFILE_SETTING_NOTIFICATION: (id: string) =>
    `/profiles/${id}/settings/notifications`,
  UPDATE_PROFILE_SETTING_NOTIFICATION: (id: string) =>
    `/profiles/${id}/settings/notifications`,
  FIND_ONE_WALLET: (id: string, wallet_address: string, chain: string) =>
    `/users/${id}/wallets/${wallet_address}/${chain}/assets`,
  MOCHI_BALANCES: (id: string) => `/mochi-wallet/${id}/balances`,
  PROFILE_SEARCH: '/profiles/search',
  CREATE_APPLICATION: (id: string) => `/profiles/${id}/applications`,
  GET_APPLICATION_LIST: (id: string) => `/profiles/${id}/applications`,
  GET_APPLICATION_STATS: (id: string) => `/profiles/${id}/applications/stats`,
  GET_APPLICATION_DETAIL: (profileId: string, appId: string) =>
    `/profiles/${profileId}/applications/${appId}`,
  GET_APPLICATION_DETAIL_STATS: (profileId: string, appId: string) =>
    `/profiles/${profileId}/applications/${appId}/stats`,
  UPDATE_APPLICATION_DETAIL: (profileId: string, appId: string) =>
    `/profiles/${profileId}/applications/${appId}`,
  RESET_APPLICATION_KEY: (profileId: string, appId: string) =>
    `/profiles/${profileId}/applications/${appId}/reset-key`,
  GET_APPLICATION_DETAIL_MEMBERS: (profileId: string, appId: string) =>
    `/profiles/${profileId}/applications/${appId}/members`,
  GET_APPLICATION_DETAIL_WEBHOOK_LOGS: (profileId: string, appId: string) =>
    `/profiles/${profileId}/applications/${appId}/webhook-logs`,
  DEACTIVE_APPLICATION: (profileId: string, appId: string) =>
    `/profiles/${profileId}/applications/${appId}/deactivate`,
  UPDATE_APPLICATION_AVATAR: (profileId: string, appId: string) =>
    `/profiles/${profileId}/applications/${appId}/avatar`,
  GET_PROFILE_GLOBAL_INFO: (profileId: string) =>
    `/profiles/${profileId}/global-info`,
  GET_PAY_REQUESTS: '/pay-requests',
  ENABLE_PAYMENT_REQUEST: (profileId: string, code: string) =>
    `/profile/${profileId}/pay-requests/${code}/enable`,
  DISABLE_PAYMENT_REQUEST: (profileId: string, code: string) =>
    `/profile/${profileId}/pay-requests/${code}/disable`,
  GET_GENERAL_SETTINGS: (profileId: string) =>
    `/profiles/${profileId}/settings/general`,
  UPDATE_GENERAL_SETTINGS: (profileId: string) =>
    `/profiles/${profileId}/settings/general`,
  GET_TOTAL_BALANCES: (profileId: string) => `/users/${profileId}/balances`,
  GET_MONTHLY_STATS: (profileId: string) =>
    `/profile/${profileId}/monthly-stats`,
  CHANGELOGS: '/product-metadata/changelogs/',
  CHANGELOG_DETAIL: (version: string) =>
    `/product-metadata/changelogs/${version}`,
}
