// TODO: replace it with Mochi Types
export type Platform = {
  id: string
  platform: PlatformType
}

export type PlatformType =
  | 'discord'
  | 'github'
  | 'telegram'
  | 'x'
  | 'email'
  | 'on-chain'
  | 'reddit'
