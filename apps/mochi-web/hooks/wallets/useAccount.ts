import { useWallet as useSolWallet } from '@solana/wallet-adapter-react'
import { useWallet as useSuiWallet } from '@suiet/wallet-kit'
import { BigNumber } from 'ethers'
import { useAccount as useWagmiAccount, useDisconnect } from 'wagmi'
import { useCallback, useEffect, useState } from 'react'

export interface Account {
  address?: string
  symbol?: string
  displayBalance?: string
  decimals?: number
  value?: BigNumber
  isEVMConnected: boolean
  isSolanaConnected: boolean
  isSuiConnected: boolean
  disconnect: () => Promise<any>
}

async function runAllDisconnectors(...disconnectors: Array<() => void>) {
  try {
    return await Promise.allSettled(disconnectors.map((d) => d()))
  } catch (e) {
    console.error(e)
  }
}

export const useAccount = (): Account => {
  const {
    address: addressSui,
    disconnect: disconnectSui,
    connected: isSuiConnected,
  } = useSuiWallet()

  const { address: addressEVM, isConnected: isEVMConnected } = useWagmiAccount()
  const { disconnectAsync: disconnectEVM } = useDisconnect()

  const {
    connected: isSolanaConnected,
    publicKey,
    disconnect: disconnectSOL,
    select,
  } = useSolWallet()
  const addressSOL = publicKey?.toBase58()

  const [activeAddress, setActiveAddress] = useState(
    addressSOL ?? addressEVM ?? '',
  )

  useEffect(() => {
    setActiveAddress(addressEVM ?? '')
    if (addressEVM) {
      runAllDisconnectors(disconnectSOL, disconnectSui)
    }
  }, [addressEVM, disconnectSOL, disconnectSui])

  useEffect(() => {
    setActiveAddress(addressSOL ?? '')
    if (addressSOL) {
      runAllDisconnectors(disconnectEVM, disconnectSui)
    }
  }, [addressSOL, disconnectEVM, disconnectSui])

  useEffect(() => {
    setActiveAddress(addressSui ?? '')
    if (addressSui) {
      runAllDisconnectors(disconnectEVM, disconnectSOL)
    }
  }, [addressSui, disconnectEVM, disconnectSOL])

  const disconnect = useCallback(async () => {
    select(null)
    setActiveAddress('')
    return await runAllDisconnectors(
      disconnectSOL,
      disconnectEVM,
      disconnectSui,
    )
  }, [disconnectEVM, disconnectSOL, disconnectSui, select])

  return {
    isEVMConnected,
    isSolanaConnected,
    isSuiConnected,
    address: activeAddress,
    disconnect,
  }
}
