import { Connector, ConnectorAlreadyConnectedError, useConnect } from 'wagmi'
import { useWallet as useSolWallet } from '@solana/wallet-adapter-react'
import { useWallet as useSuiWallet } from '@suiet/wallet-kit'
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base'
import { useAppWalletContext } from 'context/wallet-context'
import { WalletInstance } from './Wallet'
import { getRecentWalletIds, addRecentWalletId } from './recentWalletIds'
import { walletDownloadUrls } from './solana/walletAdapters'
import { useCallback, useEffect, useRef, useState } from 'react'

export interface WalletConnector extends WalletInstance {
  ready?: boolean
  connect?: () => Promise<void>
  onConnecting: (fn: () => void) => void
  connecting?: boolean | ((fn: () => void) => void)
  // showWalletConnectModal?: () => void
  recent: boolean
}

function flatten<Item>(array: Item[][]) {
  const flattenedItems: Item[] = []

  for (const items of array) {
    flattenedItems.push(...items)
  }

  return flattenedItems
}

function groupBy<Item>(
  items: Item[],
  getKey: (item: Item) => string,
): Record<string, Item[]> {
  const groupedItems: Record<string, Item[]> = {}

  items.forEach((item) => {
    const key = getKey(item)

    if (!key) {
      return
    }

    if (!groupedItems[key]) {
      groupedItems[key] = []
    }

    groupedItems[key].push(item)
  })

  return groupedItems
}

function indexBy<Item>(
  items: Item[],
  getKey: (item: Item) => string,
): Record<string, Item> {
  const indexedItems: Record<string, Item> = {}

  items.forEach((item) => {
    const key = getKey(item)

    if (!key) {
      return
    }

    indexedItems[key] = item
  })

  return indexedItems
}

function isNotNullish<T>(value: T | null | undefined): value is T {
  return value != null
}

const MAX_RECENT_WALLETS = 3

export const useWalletConnectors = () => {
  const interacted = useRef(false)
  const { initialChainId, disconnect } = useAppWalletContext()
  const { connectAsync, connectors: defaultConnectors_untyped } = useConnect({
    chainId: initialChainId,
  })
  const {
    select: selectSolWallet,
    connecting: solConnecting,
    wallets,
    wallet: selectedWallet,
    connect,
  } = useSolWallet()
  const {
    select: selectSuiWallet,
    configuredWallets,
    detectedWallets,
    connecting: suiConnecting,
  } = useSuiWallet()
  const [errorMsg, setErrorMsg] = useState('')
  const defaultConnectors = defaultConnectors_untyped as Connector[]

  const suiWalletInstances = [
    ...configuredWallets,
    ...detectedWallets,
  ].map<WalletInstance>((w, i) => {
    return {
      groupName: 'Sui',
      id: `${w.name}-${w.label}`,
      name: w.name,
      index: i,
      isSui: true,
      iconUrl: w.iconUrl,
      installed: w.installed,
      iconBackground: 'white',
    }
  })

  const evmWalletInstances = flatten(
    defaultConnectors.map(
      /* eslint-disable no-underscore-dangle */
      // @ts-expect-error
      (connector) => (connector._wallets as WalletInstance[]) ?? [],
    ),
  ).sort((a, b) => a.index - b.index)

  const solanaWalletInstances = flatten(
    wallets.map((wallet, index) => {
      // @ts-ignore
      if (wallet.adapter.standard) {
        return [
          {
            adapter: wallet.adapter,
            groupName: 'Solana',
            index,
            name: wallet.adapter.name,
            id: wallet.adapter.name,
            shortName: wallet.adapter.name,
            isSolana: true,
            iconUrl: wallet.adapter.icon,
            iconBackground: '#FFF',
            installed: [
              WalletReadyState.Installed,
              WalletReadyState.Loadable,
            ].includes(wallet.adapter.readyState),
            downloadUrls: walletDownloadUrls[wallet.adapter.name],
          },
        ] as WalletInstance[]
      }
      /* eslint-disable no-underscore-dangle */
      // @ts-expect-error
      return (wallet.adapter._wallets as WalletInstance[]) ?? []
    }),
  ).sort((a, b) => a.index - b.index)

  const walletInstances = [
    ...solanaWalletInstances,
    ...suiWalletInstances,
    ...evmWalletInstances,
  ]

  const walletInstanceById = indexBy(
    walletInstances,
    (walletInstance) => walletInstance.id,
  )

  const recentWallets: WalletInstance[] = getRecentWalletIds()
    .map((walletId) => walletInstanceById[walletId])
    .filter(isNotNullish)
    .slice(0, MAX_RECENT_WALLETS)

  const groupedWallets: WalletInstance[] = [
    ...recentWallets,
    ...walletInstances.filter(
      (walletInstance) => !recentWallets.includes(walletInstance),
    ),
  ]

  const walletConnectors: WalletConnector[] = []

  const suiConnectWallet = useCallback(
    async (wallet: WalletInstance) => {
      selectSuiWallet(wallet.name)

      addRecentWalletId(wallet.name)
    },
    [selectSuiWallet],
  )

  const evmConnectWallet = useCallback(
    async (walletId: string, connector: Connector) => {
      const result = await connectAsync({ connector })
      if (result) {
        addRecentWalletId(walletId)
      }
    },
    [connectAsync],
  )

  const solConnectWallet = useCallback(
    async (wallet: WalletInstance) => {
      if (selectedWallet?.adapter.name !== wallet.adapter?.name) {
        selectSolWallet(wallet.adapter?.name as WalletName)
      } else {
        connect()
      }

      addRecentWalletId(wallet.adapter?.name as string)
    },
    [connect, selectSolWallet, selectedWallet?.adapter.name],
  )

  useEffect(() => {
    if (selectedWallet?.adapter.name.toLowerCase() === 'mobile wallet adapter')
      return
    if (selectedWallet?.adapter.name && interacted.current) {
      connect().catch((e) => {
        setErrorMsg(e.message || 'Something went wrong')
      })
    }

    return () => {
      disconnect()
    }
  }, [connect, disconnect, selectedWallet])

  groupedWallets.forEach((wallet: WalletInstance) => {
    if (!wallet) {
      return
    }
    const recent = recentWallets.includes(wallet)
    const { isSui, isSolana } = wallet

    const ready =
      isSolana || isSui
        ? wallet.installed ?? true
        : (wallet.installed ?? true) && wallet?.connector?.ready

    walletConnectors.push({
      ...wallet,
      connect: async () => {
        try {
          setErrorMsg('')
          if (wallet.isSui) {
            return await suiConnectWallet(wallet)
          } else if (wallet.isSolana) {
            interacted.current = true
            return await solConnectWallet(wallet)
          } else {
            return await evmConnectWallet(wallet.id, wallet.connector!)
          }
        } catch (e: any) {
          if (!(e instanceof ConnectorAlreadyConnectedError)) {
            setErrorMsg(e.message || 'Something went wrong')
          }
          await disconnect()
          return Promise.reject(e)
        }
      },
      groupName: recent ? 'Recent' : wallet.groupName,
      onConnecting: (fn: () => void) => {
        if (!wallet.isSolana && !wallet.isSui && wallet.connector) {
          wallet.connector.on('message', ({ type }) => {
            type === 'connecting' && fn()
          })
        }
      },
      connecting: wallet.isSui
        ? suiConnecting
        : wallet.isSolana
        ? solConnecting
        : false,
      ready,
      recent,
      // showWalletConnectModal:
      //   !wallet.isSolana && !wallet.isSui && wallet.walletConnectModalConnector
      //     ? async () => {
      //         try {
      //           await evmConnectWallet(
      //             wallet.id,
      //             wallet.walletConnectModalConnector!,
      //           )
      //         } catch (err) {
      //           // @ts-expect-error
      //           const isUserRejection = err.name === 'UserRejectedRequestError'
      //
      //           if (!isUserRejection) {
      //             throw err
      //           }
      //         }
      //       }
      //     : undefined,
    })
  })

  return {
    errorMsg,
    wallets: walletConnectors,
    groupedWallets: groupBy(
      walletConnectors.filter(
        (wallet) => wallet.ready || wallet.downloadUrls?.browserExtension,
      ),
      (wallet) => wallet.groupName,
    ),
  }
}
