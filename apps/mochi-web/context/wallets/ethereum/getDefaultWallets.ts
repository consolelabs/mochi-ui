import { Connector, Chain } from 'wagmi'
import { isMobile } from 'utils/isMobile'
import { WalletConnectLegacyConnector as WalletConnectConnector } from 'wagmi/connectors/walletConnectLegacy'
import { WalletInstance, WalletList } from 'context/wallets/Wallet'
import { omitUndefinedValues } from 'utils/omitUndefinedValues'
import {
  brave,
  coinbase,
  injected,
  metaMask,
  isMetaMask,
  rainbow,
  walletConnect,
  ronin,
} from './walletConnectors'

export const connectorsForWallets = (walletList: WalletList) => {
  return () => {
    let index = -1

    const connectors: Connector[] = []

    walletList.forEach(({ groupName, wallets }) => {
      wallets.forEach(({ createConnector, ...walletMeta }) => {
        index++

        const { connector, ...connectionMethods } = omitUndefinedValues(
          createConnector(),
        )

        let walletConnectModalConnector: Connector | undefined
        if (
          walletMeta.id === 'walletConnect' &&
          connectionMethods.qrCode &&
          !isMobile()
        ) {
          // @ts-ignore
          const { chains, options } = connector

          walletConnectModalConnector = new WalletConnectConnector({
            chains,
            options: {
              ...options,
              qrcode: true,
            },
          })

          connectors.push(walletConnectModalConnector)
        }

        const walletInstance: WalletInstance = {
          connector,
          groupName,
          index,
          walletConnectModalConnector,
          ...walletMeta,
          ...connectionMethods,
        }
        // @ts-ignore
        if (!connectors.includes(connector)) {
          // @ts-ignore
          connectors.push(connector)

          // Reset private wallet list the first time we see
          // a connector to avoid duplicates after HMR,
          // otherwise we'll keep pushing wallets into
          // the old list. This is happening because we're
          // re-using the WalletConnectConnector instance
          // so the wallet list already exists after HMR.
          /* eslint-disable no-underscore-dangle */
          // @ts-expect-error
          connector._wallets = []
        }

        // Add wallet to connector's list of associated wallets
        /* eslint-disable no-underscore-dangle */
        // @ts-expect-error
        connector._wallets.push(walletInstance)
      })
    })

    return connectors
  }
}

export const getDefaultWallets = ({
  appName,
  chains,
}: {
  appName: string
  chains: Chain[]
}): {
  connectors: ReturnType<typeof connectorsForWallets>
  wallets: WalletList
} => {
  const needsInjectedWalletFallback =
    typeof window !== 'undefined' &&
    window.ethereum &&
    !isMetaMask(window.ethereum) &&
    !window.ethereum.isCoinbaseWallet &&
    !window.ethereum.isBraveWallet

  const needsInjectedRoninWallet = typeof window !== 'undefined' && window.ronin

  const wallets: WalletList = [
    {
      groupName: 'EVM',
      wallets: [
        rainbow({ chains }),
        coinbase({ appName, chains }),
        metaMask({ chains, shimDisconnect: true }),
        walletConnect({ chains }),
        brave({ chains, shimDisconnect: true }),
        ...(needsInjectedWalletFallback
          ? [injected({ chains, shimDisconnect: true })]
          : []),
      ],
    },
    ...(needsInjectedRoninWallet
      ? [
          {
            groupName: 'RONIN',
            wallets: [ronin({ chains })],
          },
        ]
      : []),
  ]

  return {
    connectors: connectorsForWallets(wallets),
    wallets,
  }
}
