import type { Action, LoginWidgetState, Wallet, Provider } from './store'

export type SupportedChain =
  | 'evm-chain'
  | 'ronin-chain'
  | 'solana-chain'
  | 'sui-chain'
  | 'ton-chain'

function toWallet(
  address: string,
  chain: string,
  provider: Provider[],
  isInstallChecker: (chain: string) => boolean,
): Wallet {
  const isInstalled = isInstallChecker(
    chain.replace('-chain', '').toUpperCase(),
  )

  const w: Wallet = {
    address,
    connectionStatus: 'disconnected',
    providers: [...provider],
  }

  if (!isInstalled) {
    w.connectionStatus = 'not_installed'
    return w
  }

  w.connectionStatus = 'connected'
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
        if (wallet.providers.every((p) => p !== provider)) continue
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
            [provider],
            isInstallChecker,
          )
          wallet.providers = updated.providers
          wallet.connectionStatus = updated.connectionStatus
          continue
        }

        wallet.connectionStatus = 'disconnected'
      }

      return {
        wallets: [...state.wallets],
      }
    }

    // logout reset state
    case 'logout': {
      return {
        isLoggedIn: false,
        wallets: [],
      }
    }

    // login initially fetch a list of user associated accounts,
    // then map a logged in wallet as 'connected'
    case 'login': {
      if (state.isLoggedIn) return state

      const { profile, addresses, chain, provider, isInstallChecker } =
        action.payload
      const onlyOnchainWallets = profile.associated_accounts.filter((aa: any) =>
        aa.platform.toLowerCase().includes('-chain'),
      )

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
          return toWallet(
            w.platform_identifier,
            w.platform,
            [provider],
            isInstallChecker,
          )
        }

        return wallet
      })

      return {
        isLoggedIn: true,
        wallets: newState,
      }
    }

    default:
      return state
  }
}
