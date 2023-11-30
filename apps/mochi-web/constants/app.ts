import {
  DesktopCodeSolid,
  DiscordColored,
  Github,
  GoogleColored,
  RedditColored,
  TelegramColored,
  WebSolid,
  X,
} from '@consolelabs/icons'

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
    key: 'externalWebsite',
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

const urlExpression =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi
export const urlRegex = new RegExp(urlExpression)
