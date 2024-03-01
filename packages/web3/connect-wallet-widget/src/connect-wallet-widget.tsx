import {
  PropsWithChildren,
  forwardRef,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import {
  ExclamationTriangleOutlined,
  CheckLine,
  CloseLine,
} from '@mochi-ui/icons'
import { Typography } from '@mochi-ui/typography'
import { Button } from '@mochi-ui/button'
import { connectWalletWidget } from '@mochi-ui/theme'
import WalletList from './wallet-list'
import getProviders, { ChainProvider, msg } from './providers'

export { ChainProvider, msg }

const { connectWalletState } = connectWalletWidget

enum Step {
  Idle,
  Connecting,
  Authenticating,
  Authenticated,
  QR,
}

interface ConnectWalletWidgetProps extends PropsWithChildren {
  chain?: string
  dispatch?: any
  onConnectSuccess?: (wallet: ChainProvider, data: any) => void
  onStartConnect?: (wallet: ChainProvider) => void
  onEndConnect?: (wallet: ChainProvider | null) => void
  walletId?: string
}

type Reducer = (
  state: {
    wallet: ChainProvider | null
    error: string | null
    step: Step
    uri?: string
  },
  action: any,
) => {
  uri?: string
  wallet: ChainProvider | null
  error: string | null
  step: Step
}

const ConnectWalletWidget = forwardRef<
  HTMLDivElement,
  ConnectWalletWidgetProps
>(
  ({
    chain,
    dispatch,
    onStartConnect,
    onEndConnect,
    onConnectSuccess,
    walletId,
  }) => {
    const debounce = useRef(0)
    const connectors = useMemo(() => getProviders(dispatch), [dispatch])

    const [state, setState] = useReducer<Reducer>(
      (state, action) => {
        return {
          ...state,
          ...action,
        }
      },
      {
        step: Step.Idle,
        wallet: null,
        error: null,
      },
    )

    useEffect(() => {
      const walletById = connectors.EVM.find((c) => c.id && c.id === walletId)

      setState({
        step: walletById ? Step.Connecting : Step.Idle,
        wallet: walletById || null,
        error: null,
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletId])

    useEffect(() => {
      window.clearTimeout(debounce.current)
      debounce.current = window.setTimeout(() => {
        if (state.error || !state.wallet) return
        state.wallet
          // connect and sign message
          .connect()
          .then((res) => {
            if (!res || !state.wallet) {
              const error = 'Something went wrong'
              setState({ error })
              return
            }
            onConnectSuccess?.(state.wallet, res)
            setState({ step: Step.Authenticated })
          })
      }, 100)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.wallet])

    useEffect(() => {
      if (state.step === Step.Idle) {
        onEndConnect?.(state.wallet)
        return
      }
      if (!state.wallet) return
      onStartConnect?.(state.wallet)
    }, [onEndConnect, onStartConnect, state.step, state.wallet])

    const Icon = state.wallet?.icon ?? ExclamationTriangleOutlined
    const innerClsx = connectWalletState().connecting
    const isSuccess = state.error
      ? -1
      : Number(state.step === Step.Authenticated)

    let content

    if (
      state.step === Step.Connecting ||
      state.step === Step.Authenticating ||
      state.step === Step.Authenticated
    ) {
      content = (
        <div className={innerClsx.container}>
          {/* <div className={innerClsx.header}> */}
          {/*   Connect to {state.wallet?.name} Wallet */}
          {/* </div> */}
          <div className={innerClsx.imgWrapper}>
            <img
              alt="mochi icon"
              className={innerClsx.img}
              src="https://mochi.gg/logo.png"
            />
            <div className={innerClsx.divider}>
              {isSuccess === 1 && (
                <div className={innerClsx['connect-icon-success']}>
                  <CheckLine className={innerClsx['connect-icon']} />
                </div>
              )}
              {isSuccess === -1 && (
                <div className={innerClsx['connect-icon-error']}>
                  <CloseLine className={innerClsx['connect-icon']} />
                </div>
              )}
            </div>
            <Icon className={innerClsx.icon} />
          </div>
          {isSuccess === -1 && (
            <>
              <div className={innerClsx.message}>
                {state.wallet?.name} connection failed
              </div>
              <div className={innerClsx['message-detail']}>
                Try again or use another wallet to connect
              </div>
            </>
          )}
          {isSuccess === 1 && (
            <>
              <div className={innerClsx.message}>Connection successful</div>
              <div className={innerClsx['message-detail']}>
                You have successfully connected your {state.wallet?.name} wallet
                to Mochi
              </div>
            </>
          )}
          {isSuccess === 0 && (
            <>
              <div className={innerClsx.message}>
                Opening {state.wallet?.name}
              </div>
              <div className={innerClsx['message-detail']}>
                Please wait...
                <br />
              </div>
            </>
          )}
          <div className={innerClsx.buttons}>
            {isSuccess === -1 && (
              <Button
                variant="solid"
                color="primary"
                size="lg"
                onClick={() => setState({ wallet: state.wallet, error: null })}
              >
                Try again
              </Button>
            )}
          </div>
          <Typography>
            Get the wallet:{' '}
            <Button
              variant="link"
              className="!h-auto !p-0"
              onClick={() =>
                window.open(
                  state.wallet?.metadata?.installUrl.extension,
                  '_blank',
                )
              }
            >
              Extension
            </Button>
            ,{' '}
            <Button
              variant="link"
              className="!h-auto !p-0"
              onClick={() =>
                window.open(state.wallet?.metadata?.installUrl.ios, '_blank')
              }
            >
              iOS
            </Button>
            ,{' '}
            <Button
              onClick={() =>
                window.open(
                  state.wallet?.metadata?.installUrl.android,
                  '_blank',
                )
              }
              variant="link"
              className="!h-auto !p-0"
            >
              Android
            </Button>
          </Typography>
        </div>
      )
    } else if (state.step !== Step.Idle) {
      content = (
        <div className={innerClsx.container}>
          <div className={innerClsx.header}>
            Connect to {state.wallet?.name} Wallet
          </div>
          <div className={innerClsx.message}>
            <div className={innerClsx['message-detail']}>
              Unfortunately, we did not receive the confirmation. Please, try
              again.
            </div>
          </div>
          <div className={innerClsx.buttons}>
            <Button
              variant="outline"
              color="neutral"
              size="lg"
              onClick={() =>
                setState({ step: Step.Idle, wallet: null, error: null })
              }
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="primary"
              size="lg"
              onClick={() => setState({ wallet: state.wallet, error: null })}
            >
              Try again
            </Button>
          </div>
        </div>
      )
    }

    if (state.step === Step.Idle)
      return (
        <WalletList
          chain={chain}
          connectors={connectors}
          onSelectWallet={(w) =>
            setState({ step: Step.Connecting, wallet: w, error: null })
          }
        />
      )

    return content
  },
)

ConnectWalletWidget.displayName = 'ConnectWalletWidget'

export { ConnectWalletWidget, type ConnectWalletWidgetProps }
