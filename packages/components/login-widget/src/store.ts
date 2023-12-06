import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import type { Profile } from '@consolelabs/mochi-rest'
import getProviders, { ConnectorName, Connectors } from './providers'
import reducer from './reducer'
import { ChainProvider } from './providers/provider'

export const STORAGE_KEY = 'mochi.token' as const

type EventName = 'login' | 'update_wallets' | 'logout' | 'refresh'

type ActionCreator<E extends EventName, P extends any = null> = {
  type: E
  payload: P
}

export type Action =
  | ActionCreator<
      'login',
      {
        profile: Profile
        addresses: string[]
        chain: string
        provider?: ChainProvider | null
        isInstallChecker?: (chain: string) => Promise<boolean>
        token: string
      }
    >
  | ActionCreator<
      'update_wallets',
      {
        addresses: string[]
        chain: string
        provider?: ChainProvider | null
        isInstallChecker?: (chain: string) => Promise<boolean>
      }
    >
  | ActionCreator<'logout'>
  | ActionCreator<'refresh'>

type Payload<E extends EventName> = Extract<Action, { type: E }>['payload']

export type Wallet = {
  address: string
  connectionStatus: 'connected' | 'disconnected' | 'not_installed'
  // provider = actual wallet extension
  // one address can be used in multiple wallet extension
  // that's why it's an array
  providers: any[]
}

export type LoginWidgetState = {
  isLoggedIn: boolean
  isLoggingIn: boolean
  wallets: Array<Wallet>
  profile: Profile | null
  token: string

  getProviderByAddress: (address: string) => ChainProvider | null
  isAddressConnected: (address: string) => boolean

  connectors: Connectors
  dispatch: (action: Action) => void
}

export const useLoginWidget = create<LoginWidgetState>((set, get) => {
  return {
    connectors: getProviders(get),
    isLoggedIn: false,
    isLoggingIn: false,
    profile: null,
    token: '',
    wallets: [],
    isAddressConnected: (address) => {
      return (
        get().wallets.find(
          (w) => w.address.toLowerCase() === address.toLowerCase(),
        )?.connectionStatus === 'connected'
      )
    },
    getProviderByAddress: (address) => {
      const wallet = get().wallets.find(
        (w) => w.address.toLowerCase() === address.toLowerCase(),
      )
      return wallet?.providers[0] ?? null
    },
    dispatch: (action) => {
      // current state
      const state = get()

      if (action.type === 'login') {
        set({ isLoggingIn: true })
      }

      if (action.payload) {
        action.payload.isInstallChecker = async function checker(
          chain: string,
        ) {
          const wallets = state.connectors[chain as ConnectorName]
          if (!wallets || !wallets.length) return false

          const installStates = await Promise.all(
            wallets.map((w) => w.isInstalled()),
          )

          return installStates.some(Boolean)
        }
      }

      // combine action + current state = new state
      const newState = reducer(action, state)

      set({ isLoggingIn: false })

      if (action.type === 'logout') {
        localStorage.removeItem(STORAGE_KEY)
      }

      // update state
      set(newState)
    },
  }
})

export const usePublicLoginWidget = () =>
  useLoginWidget(
    useShallow((s) => ({
      // state
      isLoggedIn: s.isLoggedIn,
      isLoggingIn: s.isLoggingIn,
      wallets: s.wallets,
      profile: s.profile,
      token: s.token,

      // utilities
      getProviderByAddress: s.getProviderByAddress,
      isAddressConnected: s.isAddressConnected,

      // state actions (changes state)
      login: (payload: Payload<'login'>) =>
        s.dispatch({
          type: 'login',
          payload,
        }),
      update: (payload: Payload<'update_wallets'>) =>
        s.dispatch({
          type: 'update_wallets',
          payload,
        }),
      refresh: () =>
        s.dispatch({
          type: 'refresh',
          payload: null,
        }),
      logout: () => s.dispatch({ type: 'logout', payload: null }),
    })),
  )

export const getLoginWidgetState = () => {
  const { dispatch, ...rest } = useLoginWidget.getState()

  return {
    ...rest,

    // state actions (changes state)
    login: (payload: Payload<'login'>) =>
      dispatch({
        type: 'login',
        payload,
      }),
    update: (payload: Payload<'update_wallets'>) =>
      dispatch({
        type: 'update_wallets',
        payload,
      }),
    refresh: () =>
      dispatch({
        type: 'refresh',
        payload: null,
      }),
    logout: () => dispatch({ type: 'logout', payload: null }),
  }
}
