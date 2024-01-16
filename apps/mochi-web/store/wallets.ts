import { create } from 'zustand'
import { api } from '~constants/mochi'
import type { Profile, Token } from '@consolelabs/mochi-rest'
import UI, {
  AddressChainType,
  Platform,
  utils,
} from '@consolelabs/mochi-formatter'
import { getLoginWidgetState } from '@mochi-web3/login-widget'
import { coinIcon } from '~utils/image'

// Create map of payable platforms from AddressChainType
const PaymentPlatforms: Map<string, string> = new Map(
  Object.keys(AddressChainType).map((key) => [
    AddressChainType[key as keyof typeof AddressChainType],
    key.toLowerCase(),
  ]),
)

const ChainDisplayNames = new Map<string, string>([
  [AddressChainType.EVM, 'Ethereum'],
  [AddressChainType.SOL, 'Solana'],
  [AddressChainType.SUI, 'Sui'],
  [AddressChainType.RON, 'Ronin'],
  [AddressChainType.APT, 'Aptos'],
  [AddressChainType.NEAR, 'Near'],
])

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
  chainSymbol: string
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
            source: {
              id: 'mochi',
              title: 'Mochi Wallet',
            },
            type: 'token',
            token: {
              ...b.token,
              chain_id: `0x${(+b.token.chain_id).toString(16)}`,
            },
            asset_balance: parseInt(b.amount, 10) / 10 ** b.token.decimal,
            usd_balance:
              (parseInt(b.amount, 10) / 10 ** b.token.decimal) * b.token.price,
          })),
          type: 'offchain',
          chainSymbol: 'MOCHI',
        })
      }

      // Payable platform from associated accounts.
      const payableAccounts = me.associated_accounts?.filter((a) =>
        PaymentPlatforms.has(a.platform || ''),
      )
      if (payableAccounts?.length) {
        // Fetch balances of associated accounts.
        const balRequestors = payableAccounts.map(async (w) => {
          return {
            id: w.id,
            balance: await api.base.users.getWalletAssets({
              profileId: me.id,
              address: w.platform_identifier,
              chainType: PaymentPlatforms.get(w.platform) ?? '',
            }),
          }
        })
        const balances = await Promise.all(balRequestors)
        payableAccounts.sort((a, b) => {
          // prioritize sol
          if (a.platform === 'solana-chain') return -1
          if (b.platform === 'solana-chain') return 1

          const balA = balances.find((bal) => bal.id === a.id)
          const balB = balances.find((bal) => bal.id === b.id)

          if (!balA || !balA.balance.ok) return 1
          if (!balB || !balB.balance.ok) return -1
          if (
            balA.balance.data.latest_snapshot_bal <
            balB.balance.data.latest_snapshot_bal
          )
            return 1
          if (
            balA.balance.data.latest_snapshot_bal >
            balB.balance.data.latest_snapshot_bal
          )
            return -1
          return 0
        })
        payableAccounts.forEach((w) => {
          const balResult = balances.find((b) => b.id === w.id)
          const { ok, data, error } = balResult?.balance ?? {
            ok: false,
            error: {},
          }
          if (ok) {
            data.balance.sort((a, b) => {
              // prioritize sol
              if (a.token.chain_id === '999') return -1
              if (b.token.chain_id === '999') return 1

              return (b.usd_balance ?? 0) - (a.usd_balance ?? 0)
            })
            wallets.push({
              id: w.platform_identifier,
              icon: w.platform,
              title: utils.string.formatAddressUsername(w.platform_identifier),
              subtitle: ChainDisplayNames.get(w.platform) || '',
              usd_amount: utils.formatUsdDigit(data.latest_snapshot_bal),
              balances: data.balance.map((b) => ({
                source: {
                  id: w.platform_identifier,
                  title: utils.string.formatAddressUsername(
                    w.platform_identifier,
                  ),
                },
                type: 'token',
                token: {
                  ...b.token,
                  chain_id: `0x${b.chain_id.toString(16)}`,
                } as Token,
                asset_balance: b.asset_balance,
                usd_balance: b.usd_balance,
              })),
              type: 'onchain',
              chainSymbol: w.platform.slice(0, 3).toUpperCase(),
            })
          } else {
            console.error(error.issues)
          }
        })
      }

      // preload wallet's balances emojis
      const symbolsSet = new Set<string>()
      for (const wallet of wallets) {
        for (const bal of wallet.balances) {
          symbolsSet.add(bal.token.symbol)
          const chainSymbol = bal.token.symbol
          if (chainSymbol) {
            symbolsSet.add(chainSymbol)
          }
        }
      }

      const { ok: okEmoji, data } = await api.base.metadata.getEmojis({
        codes: Array.from(symbolsSet),
      })
      if (okEmoji) {
        for (const wallet of wallets) {
          for (const bal of wallet.balances) {
            const tokenEmoji = data?.find((d) => d.code === bal.token.symbol)
            const chainEmoji = data?.find(
              (d) => d.code === bal.token.chain?.symbol,
            )
            bal.token.icon = tokenEmoji?.emoji_url || coinIcon.src
            if (bal.token.chain?.icon)
              bal.token.chain.icon = chainEmoji?.emoji_url || coinIcon.src
          }
        }
      }

      if (getLoginWidgetState().isLoggedIn) {
        set({ isFetching: false, wallets })
      }
    } catch (e) {
      console.error(e)
      set((s) => ({ ...s, isFetching: false }))
    }
  },
}))
