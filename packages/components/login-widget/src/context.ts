/* istanbul ignore file */
import { createContext, useContext } from 'react'
import { ChainProvider } from './providers/provider'

export enum LoginStep {
  Idle,
  Connecting,
  Authenticating,
  Authenticated,
  NotInstalled,
}

export type InternalState = {
  step: LoginStep
  wallet: ChainProvider | null
  error: string | null
}

interface InternalLoginWidgetContextType {
  state: InternalState
  dispatch: (s: Partial<InternalState>) => void
}

export const InternalLoginWidgetContext =
  createContext<InternalLoginWidgetContextType | null>(null)

export const useInternalLoginWidgetContext = () => {
  const loginWidgetContext = useContext(InternalLoginWidgetContext)

  if (!loginWidgetContext) {
    throw new Error(
      'useInternalLoginWidgetContext has to be used within <LoginWidgetContext.Provider>',
    )
  }

  return loginWidgetContext
}
