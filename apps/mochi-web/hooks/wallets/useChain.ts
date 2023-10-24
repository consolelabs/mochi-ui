import { useAppWalletContext } from 'context/wallet-context'
import { solanaChain } from 'context/wallets/solana/chains'
import { useNetwork } from 'wagmi'

export const useChain = () => {
  const { blockchain, getChainById } = useAppWalletContext()
  const { chain: activeChain } = useNetwork()

  const evmChain = activeChain ? getChainById(activeChain.id) : undefined

  return {
    chain: blockchain === 'EVM' ? evmChain : solanaChain,
    unsupported: blockchain === 'EVM' ? activeChain?.unsupported : false,
  }
}
