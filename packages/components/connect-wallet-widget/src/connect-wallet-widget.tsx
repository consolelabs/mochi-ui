import {
  PropsWithChildren,
  forwardRef,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import {
  ExclamationTriangleOutlined,
  CheckLine,
  CloseLine,
} from '@mochi-ui/icons'
import { Button } from '@mochi-ui/button'
import { connectWalletWidget } from '@mochi-ui/theme'
import WalletList from './wallet-list'
import getProviders, { ChainProvider, msg } from './providers'

export { ChainProvider, msg }

const { connectWalletState } = connectWalletWidget

enum LoginStep {
  Idle,
  Connecting,
  Authenticating,
  Authenticated,
  NotInstalled,
}

interface ConnectWalletWidgetProps extends PropsWithChildren {
  chain?: string
  dispatch?: any
  onConnectSuccess?: (wallet: ChainProvider, data: any) => void
  hideDisabledWallets?: boolean
}

type Reducer = (
  state: {
    wallet: ChainProvider | null
    error: string | null
    step: LoginStep
  },
  action: any,
) => { wallet: ChainProvider | null; error: string | null; step: LoginStep }

const ConnectWalletWidget = forwardRef<
  HTMLDivElement,
  ConnectWalletWidgetProps
>(({ chain, dispatch, onConnectSuccess, hideDisabledWallets = true }) => {
  const connectors = useMemo(() => getProviders(dispatch), [dispatch])

  const [state, setState] = useReducer<Reducer>(
    (state, action) => {
      return {
        ...state,
        ...action,
      }
    },
    {
      step: LoginStep.Idle,
      wallet: null,
      error: null,
    },
  )

  useEffect(() => {
    if (state.error) return
    state.wallet
      // connect and sign message
      ?.connect()
      .then((res) => {
        if (!res || !state.wallet) {
          const error = 'Something went wrong'
          setState({ error })
          return
        }
        onConnectSuccess?.(state.wallet, res)
      })
  }, [onConnectSuccess, state.error, state.wallet])

  const Icon = state.wallet?.icon ?? ExclamationTriangleOutlined
  const innerClsx = connectWalletState().connecting
  const isSuccess = state.error
    ? -1
    : Number(state.step === LoginStep.Authenticated)

  let content

  if (
    state.step === LoginStep.Connecting ||
    state.step === LoginStep.Authenticating ||
    state.step === LoginStep.Authenticated
  ) {
    content = (
      <div className={innerClsx.container}>
        <div className={innerClsx.header}>
          Connect to {state.wallet?.name} Wallet
        </div>
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
              Please wait for connection...
              <br />
            </div>
          </>
        )}
        <div className={innerClsx.buttons}>
          <Button
            variant="outline"
            color="neutral"
            size="lg"
            onClick={() =>
              setState({ step: LoginStep.Idle, wallet: null, error: null })
            }
          >
            Back
          </Button>
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
      </div>
    )
  } else if (state.step !== LoginStep.Idle) {
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
              setState({ step: LoginStep.Idle, wallet: null, error: null })
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

  if (state.step === LoginStep.Idle)
    return (
      <WalletList
        chain={chain}
        connectors={connectors}
        onSelectWallet={(w) => setState({ wallet: w, error: null })}
        hideDisabledWallets={hideDisabledWallets}
      />
    )

  return content
})

ConnectWalletWidget.displayName = 'ConnectWalletWidget'

export { ConnectWalletWidget, type ConnectWalletWidgetProps }
