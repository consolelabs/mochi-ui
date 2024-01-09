import { create } from 'zustand'
import { API } from '~constants/api'
import { immer } from 'zustand/middleware/immer'
import { api } from '~constants/mochi'
import { Profile } from '@consolelabs/mochi-rest'
import { LoginWidget, getLoginWidgetState } from '@mochi-web3/login-widget'
import { utils } from 'ethers'
import { Balance, Wallet, useWalletStore } from '~store'
import { Theme } from '../ThemePicker/ThemePicker'
import { Moniker } from '../TokenPicker/type'
import { isToken } from '../TokenPicker/utils'

export const MAX_RECIPIENTS = 20

interface Request {
  recipients: Array<Profile & { create_new?: boolean }> | null
  amount: number | null
  asset: Balance | Moniker | null
  message: string | null
  theme: Theme | null
}

interface TipWidgetState {
  step: number
  setStep: (s: number) => void
  direction: number

  unauthorizedContent: React.ReactNode

  wallet: Wallet | null
  amountUsd: string
  setAmountUsd: (usd: string) => void
  request: Request
  updateRequestMessage: (message: string) => void
  updateRequestTheme: (theme: Theme | null) => void
  updateSourceWallet: (id: string) => void
  setRecipients: (recipients: Profile[]) => void
  removeRecipient: (recipient: Profile) => void
  setAsset: (asset: Balance | Moniker | null) => void
  setAmount: (amount: number) => void

  execute: () => Promise<void>
  isTransferring: boolean

  tx: any
  error: any | null
  reset: () => void
  hardReset: () => void
}

export const useTipWidget = create(
  immer<TipWidgetState>((set, get) => ({
    wallet: null,

    unauthorizedContent: (
      <div className="flex justify-center">
        <LoginWidget raw />
      </div>
    ),

    request: {
      recipients: [],
      message: null,
      amount: null,
      asset: null,
      theme: null,
    },
    amountUsd: '',
    setAmountUsd: (amountUsd) => set({ amountUsd }),

    step: 1,
    setStep: (step) =>
      set((s) => {
        s.direction = s.step > step ? -1 : 1
        s.step = step
      }),
    direction: 0,

    updateRequestMessage: (message) =>
      set((s) => {
        s.request.message = message
      }),
    updateRequestTheme: (theme) =>
      set((s) => {
        s.request.theme = theme
      }),
    tx: null,
    error: null,
    reset: () =>
      set((s) => {
        s.direction = -1
        s.step = 1
        s.request = {
          recipients: [],
          message: null,
          amount: null,
          asset: s.request.asset,
          theme: null,
        }
        s.isTransferring = false
      }),
    hardReset: () =>
      set((s) => {
        s.direction = -1
        s.step = 1
        s.request = {
          recipients: [],
          message: null,
          amount: null,
          asset: s.request.asset,
          theme: null,
        }
        s.tx = null
        s.error = null
        s.isTransferring = false
      }),
    isTransferring: false,
    execute: async () => {
      try {
        const { wallet, request } = get()
        const { profile } = getLoginWidgetState()

        if (wallet?.type === 'onchain') {
          const { getProviderByAddress } = getLoginWidgetState()
          const provider = getProviderByAddress(wallet.id)
          if (!provider) return
          const tokenChainId = request.asset?.token.chain_id
          if (
            !tokenChainId ||
            (tokenChainId !== provider.chainId && provider.provider)
          )
            return

          set({ isTransferring: true })
          const tx = await provider.transfer({
            chainId: tokenChainId,
            from: wallet.id,
            to: request.recipients?.[0].profile_name ?? '',
            amount: utils
              .parseUnits(
                String(request.amount ?? 0),
                request.asset?.token.decimal,
              )
              .toString(),
            ...(request.asset?.token.native
              ? {}
              : { tokenAddress: request.asset?.token.address }),
          })

          set({ tx })
          get().reset()

          return
        }

        set({ isTransferring: true })
        const amount = request.amount ?? 0
        if (!amount) return

        let recipients = request.recipients?.map((r) => r.id ?? '')
        const hasNewProfile = request.recipients?.some((r) => r.create_new)
        if (hasNewProfile) {
          recipients = await Promise.all<string>(
            request.recipients?.map(async (r) => {
              if (!r.create_new && r.id) return r.id
              const acc = r.associated_accounts?.[0]
              if (!acc)
                throw new Error(`Cannot resolve profile ${r.profile_name}`)

              switch (acc.platform) {
                case 'discord': {
                  const { data, ok } = await api.profile.discord.getByUsername(
                    acc.platform_metadata.username ?? '',
                  )
                  if (ok) return data.id
                  throw new Error(
                    `Cannot resolve discord ${acc.platform_metadata.username}`,
                  )
                }
                case 'telegram': {
                  const { data, ok } = await api.profile.telegram.getByUsername(
                    acc.platform_metadata.username ?? '',
                  )
                  if (ok) return data.id
                  throw new Error(
                    `Cannot resolve telegram ${acc.platform_metadata.username}`,
                  )
                }
                case 'email': {
                  const { ok, data } = await api.profile.email.getByEmail({
                    email: acc.platform_metadata.username ?? '',
                    noFetchAmount: true,
                  })
                  if (ok) return data.id
                  throw new Error(
                    `Cannot resolve email ${acc.platform_metadata.username}`,
                  )
                }
                default:
                  throw new Error(
                    `Cannot resolve profile ${r.profile_name} on ${acc.platform}`,
                  )
              }
            }) ?? [],
          )
        }

        const originalAmount = isToken(request.asset)
          ? amount
          : amount * (request.asset?.asset_balance ?? 0)

        const tx = await API.MOCHI.post(
          {
            sender: profile?.id,
            recipients,
            platform: 'web',
            transfer_type: 'transfer',
            amount: originalAmount,
            token: request.asset?.token?.symbol,
            chain_id: parseInt(
              request.asset?.token?.chain_id ?? '',
              16,
            ).toString(),
            // optional
            ...(request?.theme?.id ? { theme_id: request.theme.id } : {}),
            ...(request?.message ? { message: request.message } : {}),
            metadata: {
              original_amount: originalAmount,
              channel_name:
                window.location.hostname === 'localhost'
                  ? 'beta.mochi.gg'
                  : window.location.hostname,
            },
          },
          '/tip/transfer-v2',
        ).json((r) => r.data)
        set({ tx })
        get().reset()
      } catch (e) {
        console.error(e)
        set({ error: e })
      } finally {
        set({ isTransferring: false })
      }
    },
    updateSourceWallet: (walletId) => {
      const { wallets } = useWalletStore.getState()
      const wallet = wallets.find((w) => w.id === walletId)
      if (!wallet) return
      set({ wallet })
    },
    setRecipients: (recipients) => {
      const isMax = (recipients?.length ?? 0) >= MAX_RECIPIENTS
      if (isMax) return
      set((s) => {
        s.request.recipients = recipients
      })
    },
    removeRecipient: (recipient) =>
      set((s) => {
        s.request.recipients =
          s.request.recipients?.filter(
            (r: any) =>
              r.associated_accounts?.[0].id !==
              recipient.associated_accounts?.[0].id,
          ) ?? []
      }),
    setAsset: (asset) =>
      set((s) => {
        s.request.asset = asset
      }),
    setAmount: (amount) =>
      set((s) => {
        s.request.amount = amount
      }),
  })),
)
