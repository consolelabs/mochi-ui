import React from 'react'
import { Apt, Eth, Ron, Sol, Sui } from '@mochi-ui/icons'
import { AddressChainType } from '@consolelabs/mochi-ui'
import Image from 'next/image'

const MochiLogo = () => (
  <Image
    className="flex-shrink-0"
    width={24}
    height={24}
    src="/logo.png"
    alt="mochi logo"
  />
)

const chainIcons: Record<AddressChainType, (...props: any) => JSX.Element> = {
  [AddressChainType.EVM]: Eth,
  [AddressChainType.SOL]: Sol,
  [AddressChainType.APT]: Apt,
  [AddressChainType.RON]: Ron,
  [AddressChainType.SUI]: Sui,
  [AddressChainType.NEAR]: MochiLogo,
  [AddressChainType.UNKNOWN]: MochiLogo,
}

export const WalletChainIcon = ({ platform }: { platform: string }) => {
  const Icon = chainIcons[platform as AddressChainType] ?? MochiLogo
  return <Icon className="flex-shrink-0 w-6 h-6" />
}
