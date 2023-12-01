import * as Dialog from '@radix-ui/react-dialog'
import React, { useCallback, useEffect, useMemo, useReducer } from 'react'
import {
  CheckLine,
  CloseLine,
  ExclamationTriangleOutlined,
} from '@consolelabs/icons'
import { Button } from '@consolelabs/button'
import { loginWidget } from '@consolelabs/theme'
import {
  InternalLoginWidgetContext,
  useInternalLoginWidgetContext,
  LoginStep,
  InternalState,
} from './context'
import WalletList from './wallet-list'
import fetchers from './fetchers'
import {
  useLoginWidget,
  usePublicLoginWidget,
  getLoginWidgetState,
  type Provider,
} from './store'
import getProviders from './providers'

const { isExtensionForChainInstalled } = getProviders()

const {
  loginInnerStateClsx,
  /* loginWidgetTriggerClsx, */
  loginWidgetDialogOverlayClsx,
  loginWidgetDialogContentWrapperClsx,
} = loginWidget

interface LoginWidgetProps {
  isOpen?: boolean
  onOpenChange?: (o: boolean) => void
  fullModal?: boolean
  onSuccess: (t: string) => void
}

function LoginWidget({
  isOpen,
  fullModal = false,
  onOpenChange,
  onSuccess,
}: LoginWidgetProps) {
  const { state, dispatch } = useInternalLoginWidgetContext()

  const onReset = () => {
    dispatch({ step: LoginStep.Idle, wallet: null, error: null })
  }

  const onSelectWallet = (wallet: InternalState['wallet']) => {
    dispatch({ step: LoginStep.Connecting, wallet, error: null })
  }

  useEffect(() => {
    if (state.step === LoginStep.Authenticated) {
      dispatch({ wallet: null, step: LoginStep.Idle, error: null })
    }
  }, [dispatch, state.step])

  useEffect(() => {
    dispatch({ onSuccess })
  }, [dispatch, onSuccess])

  const Icon = state.wallet?.icon ?? ExclamationTriangleOutlined
  const innerClsx = loginInnerStateClsx().connecting
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
          {isSuccess === -1 ? (
            <Button
              variant="solid"
              color="primary"
              size="lg"
              onClick={() => {
                if (state.wallet) {
                  onSelectWallet(state.wallet)
                }
              }}
            >
              Try again
            </Button>
          ) : (
            <Button
              variant="outline"
              color="neutral"
              size="lg"
              onClick={onReset}
            >
              Back
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
          <Button variant="outline" color="neutral" size="lg" onClick={onReset}>
            Cancel
          </Button>
          <Button
            variant="solid"
            color="primary"
            size="lg"
            onClick={() => {
              if (state.wallet) {
                onSelectWallet(state.wallet)
              }
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Dialog.Root
      onOpenChange={(o) => {
        if (!o) {
          dispatch({ step: LoginStep.Idle })
        }
        onOpenChange?.(o)
      }}
      open={!fullModal ? state.step !== LoginStep.Idle : isOpen}
    >
      {!fullModal && <WalletList onSelectWallet={onSelectWallet} />}
      <Dialog.Portal>
        <Dialog.Overlay className={loginWidgetDialogOverlayClsx()} />
        <Dialog.Content asChild>
          <div
            style={{ boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.18)' }}
            className={loginWidgetDialogContentWrapperClsx()}
          >
            {fullModal && state.step === LoginStep.Idle ? (
              <WalletList onSelectWallet={onSelectWallet} />
            ) : (
              content
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

interface LoginWidgetProviderProps {
  children?: React.ReactNode
}

const LoginWidgetProvider = ({ children }: LoginWidgetProviderProps) => {
  // reducer for main state
  const { dispatch } = useLoginWidget()

  const [internal, setInternal] = useReducer<
    (s: InternalState, a: Partial<InternalState>) => InternalState,
    InternalState
  >(
    (state, action) => {
      return {
        ...state,
        ...action,
      }
    },
    {
      wallet: null,
      error: null,
      step: LoginStep.Idle,
      onSuccess: () => {},
    },
    (s) => s,
  )

  const value = useMemo(() => {
    return { state: internal, dispatch: setInternal }
  }, [internal])

  const handleAfterConnect = useCallback(
    async (data: {
      addresses: string[]
      signature: string
      msg: string
      platform: string
      provider: Provider
    }) => {
      // neu nhu da login (khong co signature)
      // thi vao flow connect
      if (!data.signature) {
        dispatch({
          type: 'update_wallets',
          payload: {
            addresses: data.addresses,
            chain: data.platform,
            provider: data.provider,
            isInstallChecker: isExtensionForChainInstalled,
          },
        })
        setInternal({ step: LoginStep.Authenticated })
        return
      }
      setInternal({ step: LoginStep.Authenticating })
      const token = await fetchers.getAccessToken(data)
      if (!token) {
        setInternal({ error: "Couldn't login" })
        return
      }

      internal.onSuccess(token)

      const profile = await fetchers.getOwnProfile(token)
      if (!profile) {
        setInternal({ error: "Couldn't get profile" })
        return
      }

      dispatch({
        type: 'login',
        payload: {
          profile,
          addresses: data.addresses,
          chain: data.platform,
          provider: data.provider,
          isInstallChecker: isExtensionForChainInstalled,
        },
      })

      setInternal({ step: LoginStep.Authenticated })
    },
    [dispatch, internal],
  )

  // handler cho wallet onSelect
  useEffect(() => {
    if (internal.error) return
    internal.wallet
      // connect and sign message
      ?.connect()
      .then(handleAfterConnect)
      .catch((e: { message?: string; cause?: string }) => {
        const error = e.message ?? e.cause ?? 'Something went wrong'
        setInternal({ error })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internal.wallet])

  return (
    <InternalLoginWidgetContext.Provider value={value}>
      {children}
    </InternalLoginWidgetContext.Provider>
  )
}

export {
  LoginWidgetProvider,
  LoginWidget,
  // is a hook, for react
  usePublicLoginWidget as useLoginWidget,
  // for non-react
  getLoginWidgetState,
}
