import { WalletAdapterNetwork, Adapter } from '@solana/wallet-adapter-base'
import { omitUndefinedValues } from 'utils/omitUndefinedValues'
import { WalletInstance, WalletList } from 'context/wallets/Wallet'
import { glow, phantom, solflare } from './walletAdapters'

const adaptersForWallets = (wallets: WalletList) => {
  let index = -1
  const adapters: Adapter[] = []
  wallets.forEach(({ groupName, wallets }) => {
    wallets.forEach(({ createConnector, ...walletMeta }) => {
      index++
      const { adapter, ...connectionMethods } = omitUndefinedValues(
        createConnector(),
      )

      const walletInstance: WalletInstance = {
        adapter,
        groupName,
        index,
        ...walletMeta,
        ...connectionMethods,
      }

      if (!adapters.includes(adapter as Adapter)) {
        adapters.push(adapter as Adapter)
        /* eslint-disable no-underscore-dangle */
        // @ts-expect-error
        adapter._wallets = []
      }
      /* eslint-disable no-underscore-dangle */
      // @ts-expect-error
      adapter._wallets.push(walletInstance)
    })
  })

  return adapters
}

export const getDefaultSolanaWallets = (network: WalletAdapterNetwork) => {
  const supportedWallets = [phantom(), solflare(network), glow()]

  const walletsList: WalletList = [
    {
      groupName: 'Solana',
      wallets: supportedWallets,
    },
  ]

  return {
    wallets: walletsList,
    adapters: adaptersForWallets(walletsList),
  }
}
