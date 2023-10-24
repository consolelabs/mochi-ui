import React, { ReactNode, useMemo } from 'react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  ConnectionProvider,
  WalletProvider as SolWalletProvider,
} from '@solana/wallet-adapter-react'
import { getDefaultSolanaWallets } from './getDefaultWallets'
import { isAndroid } from '~utils/isMobile'

export type SolanaWalletProviderProps = {
  children: ReactNode
}

export const SolanaWalletProvider = ({
  children,
}: SolanaWalletProviderProps) => {
  const network = WalletAdapterNetwork.Mainnet
  const endpoint = useMemo(() => 'https://rpc.ankr.com/solana', [])

  const wallets = useMemo(
    () => (isAndroid() ? [] : getDefaultSolanaWallets(network).adapters),
    [network],
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolWalletProvider autoConnect={false} wallets={wallets}>
        {children}
      </SolWalletProvider>
    </ConnectionProvider>
  )
}
