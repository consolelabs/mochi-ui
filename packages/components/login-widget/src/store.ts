import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import reducer from './reducer'

export type Provider = any

type EventName = 'login' | 'update_wallets' | 'logout'

type ActionCreator<E extends EventName, P extends any = null> = {
  type: E
  payload: P
}

export type Action =
  | ActionCreator<
      'login',
      {
        profile: { associated_accounts: any[] }
        addresses: string[]
        chain: string
        provider: Provider
        isInstallChecker: (chain: string) => boolean
      }
    >
  | ActionCreator<
      'update_wallets',
      {
        addresses: string[]
        chain: string
        provider: Provider
        isInstallChecker: (chain: string) => boolean
      }
    >
  | ActionCreator<'logout'>

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
  wallets: Array<Wallet>
  getProviderByAddress: (address: string) => Provider | null

  dispatch: (action: Action) => Promise<void>
}

export const useLoginWidget = create<LoginWidgetState>((set, get) => {
  return {
    isLoggedIn: false,
    wallets: [],
    getProviderByAddress: (address) => {
      const wallet = get().wallets.find(
        (w) => w.address.toLowerCase() === address.toLowerCase(),
      )
      return wallet?.providers[0] ?? null
    },
    dispatch: async (action) => {
      // preload chainId to provider
      if (
        action.payload &&
        'provider' in action.payload &&
        action.payload.provider.chainId === undefined
      ) {
        try {
          const chainId = await action.payload.provider.request({
            method: 'eth_chainId',
          })
          action.payload.provider.chainId = chainId
        } catch (e: any) {
          void 0
        }
      }
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
      wallets: s.wallets,

      // utilities
      getProviderByAddress: s.getProviderByAddress,

      // state actions (changes state)
      login: (payload: Payload<'login'>) =>
        s.dispatch({ type: 'login', payload }),
      connect: (payload: Payload<'update_wallets'>) =>
        s.dispatch({ type: 'update_wallets', payload }),
      disconnect: (payload: Payload<'update_wallets'>) =>
        s.dispatch({ type: 'update_wallets', payload }),
      logout: () => s.dispatch({ type: 'logout', payload: null }),
    })),
  )

export const getLoginWidgetState = () => {
  const { dispatch, ...rest } = useLoginWidget.getState()

  return {
    ...rest,

    // state actions (changes state)
    login: (payload: Payload<'login'>) => dispatch({ type: 'login', payload }),
    connect: (payload: Payload<'update_wallets'>) =>
      dispatch({ type: 'update_wallets', payload }),
    disconnect: (payload: Payload<'update_wallets'>) =>
      dispatch({ type: 'update_wallets', payload }),
    logout: () => dispatch({ type: 'logout', payload: null }),
  }
}
