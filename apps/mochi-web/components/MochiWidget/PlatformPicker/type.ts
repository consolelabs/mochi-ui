// TODO: replace it with Mochi Types
export type Platform = {
  id: string
  platform: PlatformType
}

export type PlatformType =
  | 'Discord'
  | 'Github'
  | 'Telegram'
  | 'X'
  | 'Email'
  | 'On-chain'
  | 'Reddit'
