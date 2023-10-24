import React, { ReactNode } from 'react'
import { Chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, fantom } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultWallets } from './getDefaultWallets'

const ronin: Chain = {
  id: 2020,
  name: 'Ronin Mainnet',
  network: 'ronin-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ronin',
    symbol: 'RON',
  },
  rpcUrls: {
    default: {
      http: ['https://api.roninchain.com/rpc'],
    },
    public: {
      http: ['https://api.roninchain.com/rpc'],
    },
  },
}

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, fantom, ronin],
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'Mochi',
  chains,
})

const client = createClient({
  autoConnect: false,
  provider,
  connectors,
})

export type EVMWalletProviderProps = {
  children: ReactNode
}

export const EVMWalletProvider = ({ children }: EVMWalletProviderProps) => {
  return <WagmiConfig client={client}>{children}</WagmiConfig>
}
