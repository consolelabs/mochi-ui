import { create } from 'zustand'
import { API } from '~constants/api'
import { Theme } from '../ThemePicker/ThemePicker'

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
  transfer: () => Promise<void>
  reset: () => void
  isTransferring: boolean
  tx: any
}

export const useTipWidget = create<TipWidgetState>((set, get) => ({
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
  tx: null,
  reset: () => set((s) => ({ ...s, tx: null, isTransferring: false })),
  isTransferring: false,
  transfer: async () => {
    const { request } = get()

    // TODO
    try {
      set((s) => ({ ...s, isTransferring: true }))
      await new Promise<void>((r) => {
        setTimeout(r, 2000)
      })
      const tx = await API.MOCHI.post(
        {
          ...request,
          sender: '48438',
          recipients: ['50453'],
          platform: 'web',
          transfer_type: 'transfer',
          amount: 0.1,
          token: 'butt',
          chain_id: '250',
        },
        '/tip/transfer-v2',
      ).json((r) => r.data)
      set((s) => ({ ...s, tx }))
    } catch (e) {
      console.error(e)
    } finally {
      set((s) => ({ ...s, isTransferring: false }))
    }
  },
}))
