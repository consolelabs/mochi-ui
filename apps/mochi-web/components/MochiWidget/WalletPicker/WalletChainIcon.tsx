import React from 'react'
import { IconApt, IconEth, IconRon, IconSol, IconSui } from '@consolelabs/icons'
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
  [AddressChainType.EVM]: IconEth,
  [AddressChainType.SOL]: IconSol,
  [AddressChainType.APT]: IconApt,
  [AddressChainType.RON]: IconRon,
  [AddressChainType.SUI]: IconSui,
  [AddressChainType.NEAR]: MochiLogo,
  [AddressChainType.UNKNOWN]: MochiLogo,
}

export const WalletChainIcon = ({ platform }: { platform: string }) => {
  const Icon = chainIcons[platform as AddressChainType] ?? MochiLogo
  return <Icon className="flex-shrink-0 w-6 h-6" />
}
