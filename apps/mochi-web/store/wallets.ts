import { create } from 'zustand'
import { api } from '~constants/mochi'
import type { Profile, Token } from '@consolelabs/mochi-rest'
import UI, { AddressChainType, Platform, utils } from '@consolelabs/mochi-ui'
import { truncate } from '@dwarvesf/react-utils'

// Create map of payable platforms from AddressChainType
export const PaymentPlatforms: Map<string, string> = new Map(
  Object.keys(AddressChainType).map((key) => [
    AddressChainType[key as keyof typeof AddressChainType],
    key.toLowerCase(),
  ]),
)

export type Balance = {
  type: 'token'
  asset_balance: number
  usd_balance: number
  token: Token
}

export type Wallet = {
  id: string
  icon: string
  title: string
  subtitle: string
  usd_amount: string
  balances: Balance[]
  type: 'offchain' | 'onchain'
}

type State = {
  wallets: Wallet[]
  setWallets: (me: Profile) => Promise<void>
  isFetching: boolean
}

export const useWalletStore = create<State>((set) => ({
  isFetching: false,
  wallets: [],
  mochiWallet: null,
  setWallets: async (me) => {
    try {
      set((s) => ({ ...s, isFetching: true }))
      const wallets: Wallet[] = []

      // Default Mochi Wallets
      const { ok, data: mochiWallet } = await api.pay.mochiWallet.getBalance({
        profileId: me.id,
      })
      if (ok) {
        const [p] = UI.render(Platform.Web, me)
        wallets.push({
          id: 'mochi',
          icon: '',
          title: 'Mochi Wallet',
          subtitle: p?.plain ?? me.profile_name,
          usd_amount: utils.formatUsdDigit(mochiWallet.usd_total),
          balances: mochiWallet.balances.map((b) => ({
            type: 'token',
            token: b.token,
            asset_balance: parseInt(b.amount, 10) / 10 ** b.token.decimal,
            usd_balance:
              (parseInt(b.amount, 10) / 10 ** b.token.decimal) * b.token.price,
          })),
          type: 'offchain',
        })
      }

      // Payable platform from associated accounts.
      const payableAccounts = me.associated_accounts?.filter((a) =>
        PaymentPlatforms.has(a.platform || ''),
      )
      if (payableAccounts?.length) {
        // Fetch balances of associated accounts.
        const balRequestors = payableAccounts.map((w) =>
          api.base.users.getWalletAssets({
            profileId: me.id,
            address: w.platform_identifier,
            chainType: PaymentPlatforms.get(w.platform) ?? '',
          }),
        )
        const balances = await Promise.all(balRequestors)
        payableAccounts.forEach((w, i) => {
          const { ok, data, error } = balances[i]
          if (ok) {
            data.balance.sort((a, b) => {
              return (b.usd_balance ?? 0) - (a.usd_balance ?? 0)
            })
            wallets.push({
              id: w.platform_identifier,
              icon: w.platform,
              title: truncate(w.platform_identifier, 10, true),
              subtitle: w.platform.replace('-chain', ''),
              usd_amount: utils.formatUsdDigit(data.latest_snapshot_bal),
              balances: data.balance.map((b) => ({
                type: 'token',
                token: b.token as Token,
                asset_balance: b.asset_balance,
                usd_balance: b.usd_balance,
              })),
              type: 'onchain',
            })
          } else {
            console.log(error.issues)
          }
        })
      }

      set({ isFetching: false, wallets })
    } catch (e) {
      console.log(e)
      set((s) => ({ ...s, isFetching: false }))
    }
  },
}))
