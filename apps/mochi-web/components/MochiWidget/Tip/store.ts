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
