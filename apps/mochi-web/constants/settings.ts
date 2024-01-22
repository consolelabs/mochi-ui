import {
  DiscordColored,
  Github,
  GoogleColored,
  RedditColored,
  TelegramColored,
  WalletSolid,
  X,
} from '@mochi-ui/icons'

export const actionList = [
  { key: 'tip', label: 'Tip' },
  { key: 'payme', label: 'Pay me' },
  { key: 'paylink', label: 'Pay link' },
  { key: 'airdrop', label: 'Airdrop' },
  { key: 'deposit', label: 'Deposit' },
  { key: 'withdraw', label: 'Withdraw' },
]

export const targetGroupList = [
  { key: 'all', label: 'Everyone can see' },
  { key: 'receivers', label: 'Only receivers can see' },
  { key: 'friends', label: 'Only friends can see' },
]

export const defaultMoneySource = {
  platform: 'mochi',
  platform_identifier: 'mochi-balance',
}

export const platformList = [
  { key: 'discord', label: 'Discord', Icon: DiscordColored },
  { key: 'telegram', label: 'Telegram', Icon: TelegramColored },
  { key: 'google', label: 'Email', Icon: GoogleColored },
  { key: 'twitter', label: 'X', Icon: X },
  { key: 'github', label: 'Github', Icon: Github },
  { key: 'reddit', label: 'Reddit', Icon: RedditColored },
  { key: 'onchain', label: 'On-chain', Icon: WalletSolid },
]

export const defaultMessages = (name: string) => [
  { action: 'tip', message: `${name} sends you money`, enable: true },
  { action: 'payme', message: '💵  Debt settled. Thank you!', enable: true },
  { action: 'paylink', message: '☕ A good treat for you', enable: true },
  { action: 'airdrop', message: '🔥 Welcome to our Airdrop  🪂', enable: true },
]
