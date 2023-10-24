import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { useWallet } from '@solana/wallet-adapter-react'
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { ConnectorAlreadyConnectedError } from 'wagmi'
import Text from '~cpn/base/text'
import { useAppWalletContext } from '~context/wallet-context'
import {
  isMetaMask,
  metaMask,
} from '~context/wallets/ethereum/walletConnectors'
import {
  useWalletConnectors,
  WalletConnector,
} from '~context/wallets/useWalletConnectors'
import { useAccount } from '~hooks/wallets/useAccount'
import { useSignMessage } from '~hooks/wallets/useSignMessage'
import { isAndroid, isMobile } from '~utils/isMobile'
import { getWalletLoginSignMessage } from '~utils/string'
import { ConnectDetail } from './ConnectDetail'
import { ConnectWalletIntro } from './ConnectWalletIntro'
import { useAuthStore } from '~store'

type Props = {
  isOpen: boolean
  onClose: () => void
}

enum WalletStep {
  None = 'NONE',
  Get = 'GET',
  Connect = 'CONNECT',
  Download = 'DOWNLOAD',
  Instructions = 'INSTRUCTIONS',
}

type State = {
  selectedWallet?: WalletConnector
  qrCodeUri?: string
  isConnectionError: boolean
  selectedOptionId?: string
  walletStep: WalletStep
  initialWalletStep: WalletStep
}

export default function ConnectWalletModal({ isOpen, onClose }: Props) {
  const { isLoggedIn } = useAuthStore()
  const { signMsg, isSigning } = useSignMessage()
  const {
    connected,
    openInApp,
    connectModalCallback,
    signCode,
    clearSignCode,
  } = useAppWalletContext()
  const code = signCode ?? String(Date.now())
  const { address, isEVMConnected, isSuiConnected, disconnect } = useAccount()
  const [state, setState] = useReducer(
    (prevState: State, action: Partial<State>) => {
      return {
        ...prevState,
        ...action,
      }
    },
    {
      initialWalletStep: WalletStep.None,
      walletStep: WalletStep.None,
      isConnectionError: false,
    },
  )
  const { errorMsg, wallets, groupedWallets } = useWalletConnectors()
  const { connect, wallet: solWallet } = useWallet()
  const [signError, setSignError] = useState(false)

  const filteredWallets = wallets.filter(
    (wallet) => wallet.ready || wallet.downloadUrls?.browserExtension,
  )

  const connectToWallet = useCallback(
    async (wallet: WalletConnector) => {
      setState({
        isConnectionError: false,
      })
      // special case for ronin
      if (wallet.id === 'ronin') {
        const msg = encodeURIComponent(getWalletLoginSignMessage(code))
        const accounts = await window.ronin.provider.request({
          method: 'eth_requestAccounts',
        })
        const signature = await window.ronin.provider.request({
          method: 'personal_sign',
          params: [msg, accounts[0]],
        })
        clearSignCode()
        if (connectModalCallback) {
          connectModalCallback({
            signature,
            address: accounts[0],
            msg,
            platform: 'ronin',
          })
        } else {
          disconnect()
        }
        return
      }
      await wallet.connect?.().catch((e) => {
        if (e instanceof ConnectorAlreadyConnectedError) {
          wallet.connect?.().catch(() => null)
          return
        }
        setState({
          isConnectionError: true,
        })
      })

      setTimeout(async () => {
        const getDesktopDeepLink = wallet.desktop?.getUri
        const getMobileURI = wallet.mobile?.getUri
        let uri
        if (isMobile()) {
          if (getMobileURI) {
            uri = await getMobileURI()
          } else if (wallet.id === metaMask({ chains: [] }).id) {
            // https://github.com/MetaMask/metamask-mobile/issues/3965#issuecomment-1122505112

            const isMetaMaskInjected =
              typeof window !== 'undefined' &&
              typeof window.ethereum !== 'undefined' &&
              isMetaMask(window.ethereum)

            if (isMetaMaskInjected) return

            uri = `dapp://${window.location.href.replace(
              `${window.location.protocol}//`,
              '',
            )}`
          }
        } else if (getDesktopDeepLink) {
          uri = await getDesktopDeepLink()
        }
        if (uri) {
          openInApp(uri)
        }
      }, 100)
    },
    [clearSignCode, code, connectModalCallback, disconnect, openInApp],
  )

  const changeWalletStep = useCallback(
    (newWalletStep: WalletStep, isBack: boolean = false) => {
      if (
        isBack &&
        newWalletStep === WalletStep.Get &&
        state.initialWalletStep === WalletStep.Get
      ) {
        setState({
          selectedOptionId: undefined,
          selectedWallet: undefined,
          qrCodeUri: undefined,
        })
      } else if (!isBack && newWalletStep === WalletStep.Get) {
        setState({
          initialWalletStep: WalletStep.Get,
        })
      } else if (!isBack && newWalletStep === WalletStep.Connect) {
        setState({
          initialWalletStep: WalletStep.Connect,
        })
      }
      setState({
        walletStep: newWalletStep,
      })
    },
    [state.initialWalletStep],
  )

  const onSelectWallet = async (wallet: WalletConnector) => {
    const sWallet = filteredWallets.find((w) => wallet.id === w.id)
    setSignError(false)
    setState({
      selectedOptionId: wallet.id,
      selectedWallet: sWallet,
      isConnectionError: false,
    })

    changeWalletStep(WalletStep.Connect)
    connectToWallet(wallet)

    if (!wallet.isSolana && !wallet.isSui) {
      setTimeout(async () => {
        // We need to guard against "onConnecting" callbacks being fired
        // multiple times since connector instances can be shared between
        // wallets. Ideally wagmi would let us scope the callback to the
        // specific "connect" call, but this will work in the meantime.
        let callbackFired = false
        wallet.onConnecting(async () => {
          if (callbackFired) return

          callbackFired = true
          const uri = await sWallet?.qrCode?.getUri()
          setState({
            qrCodeUri: uri,
          })
          callbackFired = false
        })
      }, 0)
    }
    setState({
      selectedWallet: wallet,
    })
  }

  const walletContent = useMemo(() => {
    switch (state.walletStep) {
      case WalletStep.None:
        return <ConnectWalletIntro />
      case WalletStep.Connect:
        return state.selectedWallet ? (
          <ConnectDetail
            connectionError={state.isConnectionError}
            connectionErrorMsg={errorMsg}
            signError={signError}
            qrCodeUri={state.qrCodeUri}
            reconnect={connectToWallet}
            wallet={state.selectedWallet}
          />
        ) : null
      default:
        return null
    }
  }, [
    connectToWallet,
    errorMsg,
    signError,
    state.isConnectionError,
    state.qrCodeUri,
    state.selectedWallet,
    state.walletStep,
  ])

  useEffect(() => {
    setState({
      isConnectionError: false,
    })
  }, [state.walletStep, state.selectedWallet])

  useEffect(() => {
    const handleError = () => {
      setState({
        isConnectionError: true,
      })
    }

    if (solWallet && solWallet.adapter) {
      solWallet.adapter.on('error', handleError)
      return () => {
        solWallet.adapter.off('error', handleError)
      }
    }
  }, [solWallet])

  useEffect(() => {
    if (!connected || !address || isSigning || isAndroid()) return
    const msg = getWalletLoginSignMessage(code)
    setSignError(false)
    signMsg(msg)
      .then((signature) =>
        connectModalCallback?.({
          signature,
          address,
          msg,
          platform: isSuiConnected ? 'sui' : isEVMConnected ? 'evm' : 'solana',
        }),
      )
      .catch(() => setSignError(true))
      .finally(() => {
        // clean up
        clearSignCode()
        // the idea is that if there is a callback then that callback must manually handle the disconnect
        if (connectModalCallback) return
        disconnect()
      })

    return () => {
      if (connectModalCallback) return
      disconnect()
    }
  }, [
    address,
    clearSignCode,
    code,
    connectModalCallback,
    connected,
    disconnect,
    isSigning,
    isEVMConnected,
    isSuiConnected,
    signMsg,
  ])

  useEffect(() => {
    if (!isOpen) {
      changeWalletStep(WalletStep.None)
    }
  }, [changeWalletStep, isOpen])

  useEffect(() => {
    if (!isLoggedIn) {
      setState({
        selectedWallet: undefined,
        walletStep: WalletStep.None,
        initialWalletStep: WalletStep.None,
        isConnectionError: false,
      })
    }
  }, [isLoggedIn])

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-40">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <div className="fixed inset-0">
          <div className="flex relative justify-center items-center w-full min-h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200 ease-in-out"
              enterFrom="lg:opacity-0 lg:scale-95 lg:translate-y-0 translate-y-full"
              enterTo="lg:opacity-100 lg:scale-100 translate-y-0"
              leave="ease-in duration-300 ease-in-out"
              leaveFrom="lg:opacity-100 lg:scale-100 translate-y-0"
              leaveTo="lg:opacity-0 lg:scale-95 lg:translate-y-0 translate-y-full"
            >
              <Dialog.Panel className="flex overflow-hidden absolute bottom-0 flex-col w-full bg-white rounded-t-2xl md:max-w-md lg:relative lg:flex-row lg:mx-auto lg:w-auto lg:max-w-none lg:rounded-lg lg:shadow-lg">
                <div className="flex flex-col flex-shrink-0 max-w-full border-b lg:p-5 lg:border-b-0 lg:border-r bg-dashboard-gray-9 border-dashboard-gray-3">
                  <Text
                    size={isMobile() ? 'xs' : 'sm'}
                    className="p-4 font-semibold text-center whitespace-nowrap lg:p-0 lg:text-left"
                  >
                    Choose your wallet
                  </Text>
                  <div className="flex overflow-x-auto flex-row gap-x-10 p-4 pt-0 lg:flex-col lg:gap-x-0 lg:gap-y-5 lg:p-0 lg:mt-5">
                    {isAndroid() && (
                      <div className="flex flex-col flex-shrink-0 gap-y-0.5 lg:gap-y-2">
                        <span className="text-xs font-semibold text-dashboard-gray-4">
                          Solana
                        </span>
                        <div className="flex flex-row gap-x-4 -ml-2 lg:flex-col lg:gap-x-0 lg:gap-y-1 lg:m-0">
                          <button
                            onClick={() => {
                              if (connected) {
                                const msg = getWalletLoginSignMessage(code)
                                setSignError(false)
                                signMsg(msg)
                                  .then((signature) => {
                                    if (address) {
                                      connectModalCallback?.({
                                        signature,
                                        address,
                                        msg,
                                        platform: 'solana',
                                      })
                                    }
                                  })
                                  .catch(() => setSignError(true))
                                  .finally(() => {
                                    // clean up
                                    clearSignCode()
                                    // the idea is that if there is a callback then that callback must manually handle the disconnect
                                    if (connectModalCallback) return
                                    disconnect()
                                  })
                              } else {
                                connect().catch(() => {})
                              }
                            }}
                            type="button"
                            className="flex flex-col gap-y-1 gap-x-2 items-center p-2 rounded-md lg:flex-row lg:gap-y-0 hover:bg-dashboard-gray-3"
                          >
                            <Icon
                              icon="cryptocurrency-color:sol"
                              className="flex-shrink-0 w-12 h-12 rounded-xl lg:w-6 lg:rounded-none"
                            />
                            <span className="text-xs font-medium lg:text-sm text-foreground">
                              {connected ? 'Sign Message' : 'Solana Wallets'}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                    {Object.entries(groupedWallets).map(
                      ([groupName, connectors]) => {
                        return (
                          <div
                            key={`connect-wallet-group-${groupName}`}
                            className="flex flex-col flex-shrink-0 gap-y-0.5 lg:gap-y-2"
                          >
                            <span className="text-xs font-semibold text-dashboard-gray-4">
                              {groupName}
                            </span>
                            <div className="flex flex-row gap-x-4 -ml-2 lg:flex-col lg:gap-x-0 lg:gap-y-1 lg:m-0">
                              {connectors.map((c) => {
                                return (
                                  <button
                                    onClick={() => onSelectWallet(c)}
                                    type="button"
                                    className="flex flex-col gap-y-1 gap-x-2 items-center p-2 rounded-md lg:flex-row lg:gap-y-0 hover:bg-dashboard-gray-3"
                                    key={`connect-wallet-connector-${c.id}`}
                                  >
                                    <img
                                      className="flex-shrink-0 w-12 rounded-xl lg:w-6 lg:rounded-none"
                                      src={c.iconUrl}
                                      alt=""
                                    />
                                    <span className="text-xs font-medium lg:text-sm text-foreground">
                                      {c.name}
                                    </span>
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )
                      },
                    )}
                  </div>
                </div>
                <div className="flex-1 p-5 lg:min-w-[500px]">
                  {walletContent}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
