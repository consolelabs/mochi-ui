import React, { ReactNode } from 'react'
import {
  SuiDevnetChain,
  SuiTestnetChain,
  SuiMainnetChain,
  WalletProvider,
} from '@suiet/wallet-kit'

const chains = [SuiDevnetChain, SuiTestnetChain, SuiMainnetChain]

export type SUIWalletProviderProps = {
  children: ReactNode
}

export const SuiWalletProvider = ({ children }: SUIWalletProviderProps) => {
  return (
    <WalletProvider chains={chains} autoConnect={false}>
      {children}
    </WalletProvider>
  )
}
