import {
  BETA_PAGE,
  DISCORD_LINK,
  GITBOOK_LINK,
  TELEGRAM_LINK,
  TWITTER_LINK,
  DOCUMENT_LINK,
  GITHUB_LINK,
  CONSOLE_LINK,
  README_LINK,
} from '~envs'

export const PAGES = {
  HOME: {
    path: '/',
    title: 'Mochi - The Web3 Discord Bot',
  },
  ABOUT: {
    path: '/about',
    title: 'About',
  },
  NFT: {
    path: '/nfts',
    title: 'NFT',
  },
  CHANGE_LOG: {
    path: '/changelog',
    title: 'Changelog',
  },
  VERIFY: {
    path: '/verify',
    title: 'Verify Wallet',
  },
  CONNECT_TELEGRAM: {
    path: '/connect-telegram',
    title: 'Connect to telegram account',
  },
  TOS: {
    path: '/tos',
    title: 'Terms of Service',
  },
  PRIVACY: {
    path: '/privacy',
    title: 'Privacy Policty',
  },
}

export const SOCIAL_LINKS = {
  DISCORD: DISCORD_LINK,
  TWITTER: TWITTER_LINK,
  GITBOOK: GITBOOK_LINK,
  DOCUMENT: DOCUMENT_LINK,
  TELEGRAM: TELEGRAM_LINK,
  GITHUB: GITHUB_LINK,
  TOP_GG: 'https://top.gg/bot/963123183131709480/vote',
  DISCORBOTLIST: 'https://discordbotlist.com/bots/mochi-bot/upvote',
  CONSOLE: CONSOLE_LINK,
  README: README_LINK,
}

export const TOKEN_NAME = '$MOCHI'

export const JP_NAME = 'もち'

export const isBeta = !!BETA_PAGE
