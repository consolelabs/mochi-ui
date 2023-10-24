// links
export const DISCORD_LINK =
  (process.env.DISCORD_LINK as string) || 'https://discord.gg/3d2FdBG2My'
export const TWITTER_LINK =
  (process.env.TWITTER_LINK as string) || 'https://twitter.com/mochi_gg_'
export const GITBOOK_LINK =
  (process.env.GITBOOK_LINK as string) ||
  'https://mochibot.gitbook.io/mochi-bot/introduction/about-mochi-bot'
export const INVITE_LINK =
  (process.env.INVITE_LINK as string) ||
  'https://discord.com/api/oauth2/authorize?client_id=1062540132269432863&permissions=8&scope=bot%20applications.commands'
export const TELEGRAM_LINK =
  (process.env.TELEGRAM_LINK as string) || 'https://t.me/dmmochibot'
export const DOCUMENT_LINK =
  (process.env.DOCUMENT_LINK as string) || 'https://docs.mochi.gg/'
export const GITHUB_LINK =
  (process.env.GITHUB_LINK as string) || 'https://github.com/consolelabs'
export const CONSOLE_LINK =
  (process.env.CONSOLE_LINK as string) || 'https://console.so'
export const README_LINK =
  (process.env.README_LINK as string) || 'https://mochi.readme.io'

export const HOME_URL = process.env.NEXT_PUBLIC_HOME_URL || 'https://mochi.gg'

export const MOCHI_PROFILE_API = `${
  process.env.NEXT_PUBLIC_MOCHI_PROFILE_API_HOST || 'mochi-profile-api'
}/api/v1`
export const MOCHI_PAY_API = `${
  process.env.NEXT_PUBLIC_MOCHI_PAY_API_HOST || 'mochi-pay-api'
}/api/v1`
export const MOCHI_API = `${
  process.env.NEXT_PUBLIC_MOCHI_API_HOST || 'mochi-api'
}/api/v1`

export const AUTH_DISCORD_URL = `${MOCHI_PROFILE_API}/profiles/auth/discord`
export const AUTH_TELEGRAM_ID = process.env.NEXT_PUBLIC_AUTH_TELEGRAM_ID || ''
export const AUTH_TELEGRAM_USERNAME =
  process.env.NEXT_PUBLIC_AUTH_TELEGRAM_USERNAME || 'dmmochibot'

export const WALLET_LOGIN_SIGN_MESSAGE =
  process.env.NEXT_PUBLIC_WALLET_LOGIN_SIGN_MESSAGE || ''

export const BETA_PAGE = process.env.NEXT_PUBLIC_BETA_PAGE
