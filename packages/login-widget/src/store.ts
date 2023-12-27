import type { Profile } from '@consolelabs/mochi-rest'
import { ChainProvider } from '@mochi-web3/connect-wallet-widget'
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import reducer from './reducer'

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
  providers: ChainProvider[]
}

export type LoginWidgetState = {
  isLoggedIn: boolean
  isLoggingIn: boolean
  setIsLoggingIn: (b: boolean) => void
  isLoadingProfile: boolean
  setIsLoadingProfile: (b: boolean) => void
  wallets: Array<Wallet>
  profile: Profile | null
  token: string

  getProviderByAddress: (address: string) => ChainProvider | null
  isAddressConnected: (address: string) => boolean

  dispatch: (action: Action) => void
}

export const useLoginWidget = create<LoginWidgetState>((set, get) => {
  return {
    isLoggedIn: false,
    isLoggingIn: true,
    setIsLoggingIn: (isLoggingIn) => set({ isLoggingIn }),
    isLoadingProfile: false,
    setIsLoadingProfile: (isLoadingProfile) => {
      const newState: Partial<LoginWidgetState> = {
        isLoadingProfile,
      }
      if (!isLoadingProfile) {
        newState.isLoggingIn = false
      }
      set(newState)
    },
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

      // combine action + current state = new state
      const newState = reducer(action, state)

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
      isLoadingProfile: s.isLoadingProfile,
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
      logout: () => {
        localStorage.removeItem(STORAGE_KEY)
        s.dispatch({ type: 'logout', payload: null })
      },
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
    logout: () => {
      localStorage.removeItem(STORAGE_KEY)
      dispatch({ type: 'logout', payload: null })
    },
  }
}
