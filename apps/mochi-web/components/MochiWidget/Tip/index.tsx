import { useEffect } from 'react'
import Receipt from '~cpn/receipt'
import { useWidget } from '..'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import { create } from 'zustand'
import { Theme } from '../ThemePicker/data'

interface Request {
  message?: string
  theme?: Theme
}

interface TipWidgetState {
  step: number
  setStep: (s: number) => void
  request?: Request
  updateRequestMessage: (message: string) => void
  updateRequestTheme: (theme: Theme) => void
}

export const useTipWidget = create<TipWidgetState>((set) => ({
  step: 1,
  setStep: (step) => set((s) => ({ ...s, step })),
  updateRequestMessage: (message) =>
    set((s) => ({
      ...s,
      request: {
        ...s.request,
        message,
      },
    })),
  updateRequestTheme: (theme) =>
    set((s) => ({
      ...s,
      request: {
        ...s.request,
        theme,
      },
    })),
}))

export default function Tip() {
  const { setOverrideWidgetLayoutRender } = useWidget()
  const { step } = useTipWidget()

  useEffect(() => {
    if (step === 3) {
      setOverrideWidgetLayoutRender(
        <div className="flex-1 py-5">
          {/* FIXME */}
          <Receipt id="9a9f909494a4" />
        </div>,
      )
    }
  }, [setOverrideWidgetLayoutRender, step])

  if (step === 1) {
    return <StepOne />
  }

  if (step === 2) {
    return <StepTwo />
  }

  return null
}
