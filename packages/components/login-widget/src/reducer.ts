import UI, { Platform } from '@consolelabs/mochi-ui'
import type { Action, LoginWidgetState, Wallet } from './store'
import { ChainProvider } from './providers/provider'

export type SupportedChain =
  | 'evm-chain'
  | 'ronin-chain'
  | 'solana-chain'
  | 'sui-chain'
  | 'ton-chain'

function toWallet(
  address: string,
  chain: string,
  provider: ChainProvider[],
  isInstallChecker?: (chain: string) => Promise<boolean>,
): Wallet {
  const w: Wallet = {
    address,
    connectionStatus: 'disconnected',
    providers: [...provider],
  }

  isInstallChecker?.(
    chain.replace('-chain', '').slice(0, 3).toUpperCase(),
  ).then((isInstalled) => {
    if (!isInstalled) w.connectionStatus = 'not_installed'
  })

  return w
}

export default function reducer(
  action: Action,
  state: LoginWidgetState,
): Partial<LoginWidgetState> {
  switch (action.type) {
    // update_wallets update underlying state as followed
    // 1. disconnected -> connected
    // 2. connected -> disconnected
    case 'update_wallets': {
      if (!state.isLoggedIn) return state

      const { addresses, chain, provider, isInstallChecker } = action.payload

      for (const wallet of state.wallets) {
        const isInList = addresses
          .map((a) => a.toLowerCase())
          .includes(wallet.address.toLowerCase())

        if (
          isInList &&
          ['connected_different_chain', 'connected', 'disconnected'].includes(
            wallet.connectionStatus,
          )
        ) {
          const updated = toWallet(
            wallet.address,
            chain,
            [...(provider ? [provider] : [])],
            isInstallChecker,
          )
          wallet.providers = updated.providers
          if (wallet.connectionStatus === 'disconnected') {
            wallet.connectionStatus = 'connected'
          }
          continue
        }

        wallet.connectionStatus = 'disconnected'
      }

      return {
        wallets: [...state.wallets],
      }
    }

    // trigger react re-render
    case 'refresh': {
      return {
        wallets: [...state.wallets],
      }
    }

    // logout reset state
    case 'logout': {
      return {
        isLoggedIn: false,
        wallets: [],
        profile: null,
        token: '',
      }
    }

    // login initially fetch a list of user associated accounts,
    // then map a logged in wallet as 'connected'
    case 'login': {
      if (state.isLoggedIn) return state

      const { profile, addresses, chain, provider, isInstallChecker, token } =
        action.payload
      const onlyOnchainWallets =
        profile.associated_accounts?.filter((aa: any) =>
          aa.platform.toLowerCase().includes('-chain'),
        ) ?? []

      const newState = onlyOnchainWallets.map((w: any) => {
        const wallet =
          state.wallets.find((wa) => wa.address === w.platform_identifier) ??
          toWallet(w.platform_identifier, w.platform, [], isInstallChecker)

        if (
          addresses
            .map((a: any) => a.toLowerCase())
            .includes(w.platform_identifier.toLowerCase()) &&
          w.platform.startsWith(chain) &&
          w.platform.endsWith('-chain')
        ) {
          const updated = toWallet(
            w.platform_identifier,
            w.platform,
            [...(provider ? [provider] : [])],
            isInstallChecker,
          )
          updated.connectionStatus = 'connected'
          return updated
        }

        return wallet
      })

      // handle convert profile
      // resolve username
      // fallback avatar if not found
      const [p] = UI.render(Platform.Web, profile)

      const avatar =
        profile.avatar ||
        `https://source.boringavatars.com/beam/120/${
          p?.plain ?? ''
        }?colors=665c52,74b3a7,a3ccaf,E6E1CF,CC5B14`

      const newProfile = {
        ...profile,
        profile_name: (profile.profile_name || p?.plain) ?? '',
        avatar,
        platform: p?.platform ?? '',
      }

      return {
        isLoggedIn: true,
        wallets: newState,
        profile: newProfile,
        token,
      }
    }

    default:
      return state
  }
}
