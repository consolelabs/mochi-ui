import { create } from 'zustand'
import { API } from '~constants/api'
import { Profile } from '@consolelabs/mochi-rest'
import { Balance, Wallet, useProfileStore } from '~store'
import { Theme } from '../ThemePicker/ThemePicker'

export const MAX_RECIPIENTS = 20

interface Request {
  message?: string
  theme?: Theme
}

interface TipWidgetState {
  step: number
  fromWallet?: Wallet
  recipients?: Profile[]
  asset?: Balance
  amount?: number
  setStep: (s: number) => void
  request?: Request
  updateRequestMessage: (message: string) => void
  updateRequestTheme: (theme: Theme) => void
  transfer: () => Promise<void>
  reset: () => void
  isTransferring: boolean
  tx: any
  updateSourceWallet: (s: Wallet) => void
  addRecipient: (recipient: Profile) => void
  removeRecipient: (recipient: Profile) => void
  setAsset: (asset?: Balance) => void
  setAmount: (amount: number) => void
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
  reset: () =>
    set((s) => ({
      ...s,
      recipients: [],
      request: undefined,
      fromWallet: undefined,
      amount: undefined,
      asset: undefined,
      tx: null,
      isTransferring: false,
    })),
  isTransferring: false,
  transfer: async () => {
    const { asset, request, amount, recipients } = get()
    const { me } = useProfileStore.getState()

    // TODO
    try {
      set((s) => ({ ...s, isTransferring: true }))
      await new Promise<void>((r) => {
        setTimeout(r, 1000)
      })
      const tx = await API.MOCHI.post(
        {
          sender: me?.id,
          recipients: recipients?.map((r) => r.id),
          platform: 'web',
          transfer_type: 'transfer',
          amount,
          token: asset?.token?.symbol,
          chain_id: asset?.token?.chain_id,
          ...(request?.theme?.id ? { theme_id: request.theme.id } : {}),
          ...(request?.message ? { message: request.message } : {}),
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
  updateSourceWallet: (wallet: Wallet) =>
    set((s) => ({ ...s, fromWallet: wallet })),
  addRecipient: (recipient) => {
    const isMax = (get().recipients?.length ?? 0) >= MAX_RECIPIENTS
    const isExist = get().recipients?.find(
      (r) =>
        r.associated_accounts?.[0].id === recipient.associated_accounts?.[0].id,
    )
    if (isMax || isExist) {
      return
    }
    return set((s) => ({
      ...s,
      recipients: [...(s.recipients || []), recipient],
    }))
  },
  removeRecipient: (recipient) =>
    set((s) => ({
      ...s,
      recipients: s.recipients?.filter(
        (r) =>
          r.associated_accounts?.[0].id !==
          recipient.associated_accounts?.[0].id,
      ),
    })),
  setAsset: (asset?: Balance) => set((s) => ({ ...s, asset })),
  setAmount: (amount: number) => set((s) => ({ ...s, amount })),
}))
