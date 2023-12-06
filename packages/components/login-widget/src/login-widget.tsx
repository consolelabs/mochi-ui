import React, { useCallback, useEffect, useMemo, useReducer } from 'react'
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

interface LoginWidgetProps {
  raw?: boolean
  chain?: string
}

function LoginWidget({ raw = false, chain }: LoginWidgetProps) {
  const { state, dispatch } = useInternalLoginWidgetContext()

  const onSelectWallet = (wallet: InternalState['wallet']) => {
    dispatch({ step: LoginStep.Connecting, wallet, error: null })
  }

  useEffect(() => {
    if (state.step === LoginStep.Authenticated) {
      dispatch({ wallet: null, step: LoginStep.Idle, error: null })
    }
  }, [dispatch, state.step])

  return (
    <LoginContent raw={raw} chain={chain} onSelectWallet={onSelectWallet} />
  )
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
