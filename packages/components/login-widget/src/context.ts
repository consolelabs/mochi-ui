import { createContext, useContext } from 'react'
import type { WalletProps } from './wallet'

export enum LoginState {
  Idle,
  Connecting,
  Authenticating,
  Authenticated,
  NotInstalled,
}

interface LoginWidgetContextType {
  state: LoginState
  setState: (state: LoginState) => void
  wallet?: WalletProps
  setWallet: (wallet?: WalletProps) => void
  error?: string
  setError: (error: string) => void
}

export const LoginWidgetContext = createContext<LoginWidgetContextType | null>(
  null,
)

export const useLoginWidgetContext = () => {
  const loginWidgetContext = useContext(LoginWidgetContext)

  if (!loginWidgetContext) {
    throw new Error(
      'useLoginWidgetContext has to be used within <LoginWidgetContext.Provider>',
    )
  }

  return loginWidgetContext
}
