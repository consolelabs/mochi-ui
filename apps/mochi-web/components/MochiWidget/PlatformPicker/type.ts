import { SVGProps } from 'react'

// TODO: replace it with Mochi Types
export type Platform = {
  id: string
  name: PlatformType
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

export type PlatformType =
  | 'discord'
  | 'github'
  | 'telegram'
  | 'x'
  | 'email'
  | 'on-chain'
  | 'reddit'
