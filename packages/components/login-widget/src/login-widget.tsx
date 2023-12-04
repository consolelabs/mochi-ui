import React, { useCallback, useEffect, useMemo, useReducer } from 'react'
import {
  CheckLine,
  CloseLine,
  ExclamationTriangleOutlined,
} from '@mochi-ui/icons'
import { Button } from '@mochi-ui/button'
import { loginWidget, popover } from '@mochi-ui/theme'
import qs from 'query-string'
import { LazyMotion, domAnimation } from 'framer-motion'
import {
  InternalLoginWidgetContext,
  useInternalLoginWidgetContext,
  LoginStep,
  InternalState,
} from './context'
import fetchers from './fetchers'
import {
  useLoginWidget,
  usePublicLoginWidget,
  getLoginWidgetState,
  STORAGE_KEY,
} from './store'
import LoginContent from './login-content'

const {
  loginInnerStateClsx,
  /* loginWidgetTriggerClsx, */
  /* loginWidgetDialogOverlayClsx, */
  /* loginWidgetDialogContentWrapperClsx, */
} = loginWidget

// borrow popover's style
const { popoverContentClsx } = popover

interface LoginWidgetProps {
  raw?: boolean
  chain?: string
}

function LoginWidget({ raw = false, chain }: LoginWidgetProps) {
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
          <Button variant="outline" color="neutral" size="lg" onClick={onReset}>
            Back
          </Button>
          {isSuccess === -1 && (
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

  if (raw) {
    if (state.step === LoginStep.Idle)
      return <LoginContent raw chain={chain} onSelectWallet={onSelectWallet} />

    return content
  }

  // LoginContent = tab login social + tab login wallet
  if (state.step === LoginStep.Idle)
    return (
      <div className={popoverContentClsx({})}>
        <LoginContent chain={chain} onSelectWallet={onSelectWallet} />
      </div>
    )

  return <div className={popoverContentClsx({})}>{content}</div>
}

interface LoginWidgetProviderProps {
  children?: React.ReactNode
}

const LoginWidgetProvider = ({ children }: LoginWidgetProviderProps) => {
  // reducer for main state
  const { isLoggedIn, dispatch } = useLoginWidget()

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
      platform: string
    }) => {
      if (isLoggedIn) {
        dispatch({
          type: 'update_wallets',
          payload: {
            addresses: data.addresses,
            chain: data.platform,
            provider: value.state.wallet,
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
          provider: value.state.wallet,
          token,
        },
      })

      setInternal({ step: LoginStep.Authenticated })
    },
    [dispatch, isLoggedIn, value.state.wallet],
  )

  // handler cho wallet onSelect
  useEffect(() => {
    if (internal.error) return
    internal.wallet
      // connect and sign message
      ?.connect()
      .then((res) => {
        if (!res) {
          const error = 'Something went wrong'
          setInternal({ error })
          return
        }
        handleAfterConnect(res)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internal.wallet, internal.error])

  // handle login from url query `token`
  useEffect(() => {
    if (isLoggedIn) return
    const { token: _token, ...rest } = qs.parse(window.location.search)
    let token = _token
    if (!token) {
      token = localStorage.getItem(STORAGE_KEY)
      if (!token) return
    }
    fetchers.getOwnProfile(token as string).then((profile) => {
      const hasParams = Object.keys(rest).length > 0

      window.history.replaceState(
        '',
        '',
        `${window.location.href.replace(window.location.search, '')}${
          hasParams ? `?${qs.stringify(rest)}` : ''
        }`,
      )

      if (!profile) return

      localStorage.setItem(STORAGE_KEY, token as string)
      dispatch({
        type: 'login',
        payload: {
          addresses: [],
          chain: '',
          profile,
          token: token as string,
        },
      })
    })
  }, [dispatch, isLoggedIn])

  return (
    <LazyMotion features={domAnimation}>
      <InternalLoginWidgetContext.Provider value={value}>
        {children}
      </InternalLoginWidgetContext.Provider>
    </LazyMotion>
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
