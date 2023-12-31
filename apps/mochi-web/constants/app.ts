import {
  DesktopCodeSolid,
  DiscordColored,
  Github,
  GoogleColored,
  RedditColored,
  TelegramColored,
  WebSolid,
  X,
} from '@mochi-ui/icons'

export const platforms = [
  {
    key: 'discord',
    label: 'Discord',
    Icon: DiscordColored,
  },
  {
    key: 'telegram',
    label: 'Telegram',
    Icon: TelegramColored,
  },
  {
    key: 'web',
    label: 'External Website',
    Icon: DesktopCodeSolid,
  },
] as const

export const urlPlatforms = [
  {
    key: 'discord',
    label: 'Discord',
    Icon: DiscordColored,
  },
  {
    key: 'telegram',
    label: 'Telegram',
    Icon: TelegramColored,
  },
  {
    key: 'email',
    label: 'Email',
    Icon: GoogleColored,
  },
  {
    key: 'twitter',
    label: 'Twitter',
    Icon: X,
  },
  {
    key: 'github',
    label: 'Github',
    Icon: Github,
  },
  {
    key: 'reddit',
    label: 'Reddit',
    Icon: RedditColored,
  },
  {
    key: 'website',
    label: 'Website',
    Icon: WebSolid,
  },
]
