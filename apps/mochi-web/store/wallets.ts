import { create } from 'zustand'
import { ModelBalance, ModelChain } from '~types/mochi-pay-schema'
import { API, GET_PATHS } from '~constants/api'
import { ViewAssociatedAccount, ViewProfile } from '~types/mochi-profile-schema'
import { AddressChainType } from '@consolelabs/mochi-ui'
import { epsilonToDecimalNumber } from '~utils/number'

export type Balance = ModelBalance & {
  asset_balance?: number
  usd_balance?: number
}

export type Wallet = {
  wallet: ViewAssociatedAccount
  chain?: ModelChain
  balances?: Balance[]
  total?: number
  loading?: boolean
}

export const MochiWalletBase: Wallet = Object.freeze({
  wallet: {
    id: 'mochi',
    platform: 'Mochi Wallet',
  },
  chain: {
    id: 'mochi',
    name: 'Mochi Wallet',
    icon: '/logo.png',
  },
  balances: [],
})

// Create map of payable platforms from AddressChainType
export const PaymentPlatforms: Map<string, string> = new Map(
  Object.keys(AddressChainType).map((key) => [
    AddressChainType[key as keyof typeof AddressChainType],
    key.toLowerCase(),
  ]),
)

type State = {
  wallets: Wallet[]
  setWallets: (me: ViewProfile) => Promise<void>
}

export const useWalletStore = create<State>((set) => ({
  wallets: [],
  setWallets: async (me) => {
    const wallets: Wallet[] = []
    // Payable platform from associated accounts.
    const payableAccounts = me.associated_accounts?.filter((a) =>
      PaymentPlatforms.has(a.platform || ''),
    )
    if (payableAccounts?.length) {
      // Fetch balances of associated accounts.
      const balRequestors = payableAccounts.map((w) =>
        API.MOCHI.get(
          GET_PATHS.FIND_ONE_WALLET(
            me.id ?? '',
            w.platform_identifier ?? '',
            PaymentPlatforms.get(w.platform ?? '') ?? '',
          ),
        ).json((r) => r.data),
      )
      const balances: PromiseSettledResult<any>[] =
        await Promise.allSettled(balRequestors)
      payableAccounts.forEach((w, i) => {
        if (balances[i].status === 'fulfilled') {
          const { value } = balances[i] as PromiseFulfilledResult<any>
          wallets.push({
            wallet: w,
            balances: value.balance,
            total: value.latest_snapshot_bal,
          })
        }
      })
    }

    // Default Mochi Wallets
    const mochiWallet: Wallet = structuredClone(MochiWalletBase)
    mochiWallet.wallet.platform_identifier = me.profile_name
    const mochiBalances: Balance[] = await API.MOCHI_PAY.get(
      GET_PATHS.MOCHI_BALANCES(me.id ?? ''),
    ).json((r) => r.data)
    // Calculate assets
    let total = 0
    mochiWallet.balances = mochiBalances.map((b) => {
      const assetBal = epsilonToDecimalNumber(b.amount ?? '0', b.token?.decimal)
      const usdBal = assetBal * (b.token?.price ?? 0)
      total += usdBal
      return {
        ...b,
        asset_balance: assetBal,
        usd_balance: usdBal,
      }
    })
    mochiWallet.total = total
    set({ wallets: [mochiWallet, ...wallets] })
  },
}))
