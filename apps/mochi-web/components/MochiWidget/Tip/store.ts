import { api } from '~constants/mochi'
import { create } from 'zustand'
import { API } from '~constants/api'
import { Profile } from '@consolelabs/mochi-rest'
import { Balance, Wallet, useProfileStore } from '~store'
import { Theme } from '../ThemePicker/ThemePicker'
import { Moniker } from '../TokenPicker/type'
import { isToken } from '../TokenPicker/utils'

export const MAX_RECIPIENTS = 20

interface Request {
  recipients: Profile[] | null
  amount: number | null
  asset: Balance | Moniker | null
  message: string | null
  theme: Theme | null
}

interface TipWidgetState {
  step: number
  fromWallet?: Wallet
  amountUsd: string
  setAmountUsd: (usd: string) => void
  setStep: (s: number) => void
  request: Request
  updateRequestMessage: (message: string) => void
  updateRequestTheme: (theme: Theme) => void
  execute: () => Promise<void>
  reset: () => void
  isTransferring: boolean
  tx: any
  updateSourceWallet: (s: Wallet) => void
  addRecipient: (recipient: Profile) => void
  removeRecipient: (recipient: Profile) => void
  setAsset: (asset: Balance | Moniker) => void
  setAmount: (amount: number) => void
}

export const useTipWidget = create<TipWidgetState>((set, get) => ({
  request: {
    recipients: [],
    message: null,
    amount: null,
    asset: null,
    theme: null,
  },
  amountUsd: '',
  setAmountUsd: (amountUsd) => set((s) => ({ ...s, amountUsd })),
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
      request: {
        recipients: [],
        message: null,
        amount: null,
        asset: null,
        theme: null,
      },
      fromWallet: undefined,
      tx: null,
      isTransferring: false,
    })),
  isTransferring: false,
  execute: async () => {
    const { request } = get()
    const { me } = useProfileStore.getState()

    try {
      set((s) => ({ ...s, isTransferring: true }))
      await new Promise<void>((r) => {
        setTimeout(r, 1000)
      })
      const amount = request.amount ?? 0
      if (!amount) return
      const tx = await API.MOCHI.post(
        {
          sender: me?.id,
          recipients: request.recipients?.map((r) => r.id),
          platform: 'web',
          transfer_type: 'transfer',
          amount: isToken(request.asset)
            ? amount
            : amount * (request.asset?.token_amount ?? 0),
          token: request.asset?.token?.symbol,
          chain_id: request.asset?.token?.chain_id,
          // optional
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
  updateSourceWallet: (wallet: Wallet) => {
    const missingIconBalances = new Set(
      wallet.balances
        ?.filter((b) => !b.token?.icon)
        .map((b) => b.token?.symbol ?? '') ?? [],
    )
    api.base.metadata
      .getEmojis({
        codes: Array.from(missingIconBalances),
      })
      .then(({ data, ok }) => {
        if (ok) {
          const icons = Object.fromEntries(
            data.map((d) => [d.code, d.emoji_url]),
          )
          wallet.balances?.forEach((b) => {
            if (
              b.token &&
              !b.token.icon &&
              b.token.symbol &&
              icons[b.token.symbol]
            ) {
              b.token.icon = icons[b.token.symbol]
            }
          })
          set((s) => ({ ...s, fromWallet: wallet }))
        }
      })
  },
  addRecipient: (recipient) => {
    const { recipients } = get().request
    const isMax = (recipients?.length ?? 0) >= MAX_RECIPIENTS
    const isExist = recipients?.find(
      (r) =>
        r.associated_accounts?.[0].id === recipient.associated_accounts?.[0].id,
    )
    if (isMax || isExist) {
      return
    }
    return set((s) => ({
      ...s,
      request: {
        ...s.request,
        recipients: [...(s.request.recipients || []), recipient],
      },
    }))
  },
  removeRecipient: (recipient) =>
    set((s) => ({
      ...s,
      request: {
        ...s.request,
        recipients:
          s.request.recipients?.filter(
            (r) =>
              r.associated_accounts?.[0].id !==
              recipient.associated_accounts?.[0].id,
          ) ?? [],
      },
    })),
  setAsset: (asset) => set((s) => ({ ...s, request: { ...s.request, asset } })),
  setAmount: (amount) =>
    set((s) => ({ ...s, request: { ...s.request, amount } })),
}))
