import {
  useSignMessage as useWagmiSignMessage,
  useAccount as useWagmiAccount,
} from 'wagmi'
import { useWallet as useSolWallet } from '@solana/wallet-adapter-react'
import { useWallet as useSuiWallet } from '@suiet/wallet-kit'
import { utils } from 'ethers'
import { useCallback, useEffect } from 'react'
import { useAppWalletContext } from '~context/wallet-context'
import { useDisclosure } from '@dwarvesf/react-hooks'

export const useSignMessage = () => {
  const { openInApp, connected, disconnect } = useAppWalletContext()
  const { signMessageAsync } = useWagmiSignMessage()
  const { connector } = useWagmiAccount()
  const { connected: isSolanaConnected, signMessage: signSolMessage } =
    useSolWallet()
  const { connected: isSuiConnected, signMessage: signSuiMessage } =
    useSuiWallet()

  const {
    isOpen: isSigning,
    onOpen: setIsSigning,
    onClose: setIsNotSigning,
  } = useDisclosure()

  const signEVM = useCallback(
    async (message: string) => {
      setIsSigning()
      try {
        const provider = await connector?.getProvider()
        if (provider?.connector?.uri) {
          openInApp(provider.connector.uri)
        }
        const signature = await signMessageAsync({ message })
        return signature ?? ''
      } catch (e) {
        setIsNotSigning()
        disconnect()

        throw e
      }
    },
    [
      connector,
      disconnect,
      openInApp,
      setIsNotSigning,
      setIsSigning,
      signMessageAsync,
    ],
  )

  const signSOL = useCallback(
    async (message: string) => {
      setIsSigning()
      try {
        const messageEncoded = new TextEncoder().encode(message)

        const signature = await signSolMessage?.(messageEncoded)

        return utils.base58.encode(signature as any)
      } catch (e) {
        setIsNotSigning()
        disconnect()

        throw e
      }
    },
    [disconnect, setIsNotSigning, setIsSigning, signSolMessage],
  )

  const signSui = useCallback(
    async (message: string) => {
      setIsSigning()
      try {
        const messageEncoded = new TextEncoder().encode(message)

        const { signature } = await signSuiMessage?.({
          message: messageEncoded,
        })

        return signature
      } catch (e) {
        setIsNotSigning()
        disconnect()

        throw e
      }
    },
    [disconnect, setIsNotSigning, setIsSigning, signSuiMessage],
  )

  useEffect(() => {
    if (!connected) {
      setIsNotSigning()
    }
  }, [connected, setIsNotSigning])

  return {
    isSigning,
    signMsg: isSuiConnected ? signSui : isSolanaConnected ? signSOL : signEVM,
  }
}
