/* istanbul ignore file */
import { SVGProps, createContext, useContext } from 'react'

export enum LoginStep {
  Idle,
  Connecting,
  Authenticating,
  Authenticated,
  NotInstalled,
}

export type InternalState = {
  step: LoginStep
  wallet: {
    name: string
    icon: (p: SVGProps<SVGSVGElement>) => JSX.Element
    connect: () => Promise<any>
  } | null
  error: string | null
  onSuccess: (t: string) => void
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
