/* istanbul ignore file */
import bs58 from 'bs58'
import hexer from 'browser-string-hexer'
import {
  ArgentWallet,
  BackpackWallet,
  Coin98Wallet,
  CoinbaseWallet,
  LedgerWallet,
  MartianWallet,
  MetamaskWallet,
  OkxWallet,
  PhantomWallet,
  RabbyWallet,
  RainbowWallet,
  RoninWallet,
  SafepalWallet,
  SuietWallet,
  Ton,
  TonKeeperWallet,
  TrustWallet,
  UniswapWallet,
} from '@consolelabs/icons'
// EIP6963
import { createStore } from 'mipd'
import type { WalletProps } from './wallet'
import { useLoginWidget, type Provider } from './store'

const eip6963store = typeof window === 'undefined' ? null : createStore()

const msg = 'Please sign this message to prove that you own this wallet'
const signEVM =
  (p: Provider, isSign = true, platform = 'evm-chain') =>
  async (accounts: string[]) => {
    if (!isSign)
      return {
        addresses: accounts,
        signature: '',
        msg,
        platform,
        provider: p,
      }
    return Promise.resolve(hexer(msg))
      .then((c) =>
        p.request({ method: 'personal_sign', params: [c, accounts.at(0)] }),
      )
      .then((signature: string) => {
        return {
          addresses: accounts,
          signature,
          msg,
          platform,
          provider: p,
        }
      })
  }
const signSol =
  (p: Provider, isSign = true) =>
  async ({ publicKey: pb }: any) => {
    if (!isSign)
      return {
        addresses: [pb.toString()],
        signature: '',
        msg,
        platform: 'solana-chain',
        provider: p,
      }
    return Promise.resolve(new TextEncoder().encode(msg))
      .then((m) => p.signMessage(m))
      .then(({ signature, publicKey: pb }) => {
        return {
          addresses: [pb.toString()],
          signature: bs58.encode(signature as Uint8Array),
          msg,
          platform: 'solana-chain',
          provider: p,
        }
      })
  }

export default function getProviders(isSign = true) {
  const isSSR = typeof window === 'undefined'

  const connectors: Record<
    'EVM' | 'RON' | 'SOL' | 'SUI' | 'TON',
    WalletProps[]
  > = {
    EVM: [
      {
        name: 'MetaMask',
        icon: MetamaskWallet,
        isInstalled: !isSSR && Boolean(window.ethereum),
        rdns: 'io.metamask',
        connect: () =>
          window.ethereum
            .request({
              method: 'eth_requestAccounts',
            })
            .then(signEVM(window.ethereum, isSign))
            .catch(console.error),
      },
      {
        name: 'Rabby',
        icon: RabbyWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
        rdns: 'io.rabby',
      },
      {
        name: 'Rainbow',
        icon: RainbowWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
        rdns: 'me.rainbow',
      },
      {
        name: 'Uniswap',
        icon: UniswapWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
      {
        name: 'Coinbase',
        icon: CoinbaseWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
        rdns: 'com.coinbase.wallet',
      },
      {
        name: 'Okx',
        icon: OkxWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
        rdns: 'com.okex.wallet',
      },
      {
        name: 'Coin98',
        icon: Coin98Wallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
      {
        name: 'Trustwallet',
        icon: TrustWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
      {
        name: 'Argent',
        icon: ArgentWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
      {
        name: 'Safepal',
        icon: SafepalWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
      {
        name: 'Phantom',
        icon: PhantomWallet,
        isInstalled: !isSSR && Boolean(window.phantom),
        connect: () =>
          window.phantom.solana
            .connect()
            .then(signSol(window.phantom.solana, isSign)),
        rdns: 'app.phantom',
      },
      {
        name: 'Ledger Live',
        icon: LedgerWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
    ],
    RON: [
      {
        name: 'Ronin',
        icon: RoninWallet,
        isInstalled: !isSSR && Boolean(window.ronin),
        connect: () =>
          window.ronin.provider
            .request({ method: 'eth_requestAccounts' })
            .then(signEVM(window.ronin.provider, isSign, 'ronin-chain')),
      },
    ],
    SOL: [
      {
        name: 'Phantom',
        icon: PhantomWallet,
        isInstalled: !isSSR && Boolean(window.phantom),
        connect: () =>
          window.phantom.solana
            .connect()
            .then(signSol(window.phantom.solana, isSign)),
      },
      {
        name: 'Backpack',
        icon: BackpackWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
      {
        name: 'Okx',
        icon: OkxWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
      {
        name: 'Coin98',
        icon: Coin98Wallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
      {
        name: 'Trustwallet',
        icon: TrustWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
    ],
    SUI: [
      {
        name: 'Suiet',
        icon: SuietWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
      {
        name: 'Okx',
        icon: OkxWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
      {
        name: 'Coin98',
        icon: Coin98Wallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
      {
        name: 'Martian',
        icon: MartianWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
    ],
    TON: [
      {
        name: 'TON',
        icon: Ton,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
      {
        name: 'Tonkeeper',
        icon: TonKeeperWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
      {
        name: 'Trustwallet',
        icon: TrustWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
      {
        name: 'Safepal',
        icon: SafepalWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
    ],
  }

  function isExtensionForChainInstalled(chain: string) {
    const wallets = connectors[chain as keyof typeof connectors]
    if (!wallets || !wallets.length) return false

    return wallets.some((w) => w.isInstalled)
  }

  const detectedEvmProviders = eip6963store?.getProviders() ?? []

  for (const c of connectors.EVM) {
    if (!c.rdns) continue
    const provider = detectedEvmProviders.find((dp) => dp.info.rdns === c.rdns)
    if (!provider) continue
    c.isInstalled = true
    c.connect = () =>
      provider?.provider
        .request({ method: 'eth_requestAccounts' })
        .then(signEVM(provider.provider, isSign, 'evm-chain'))
        .catch(console.error)
    provider.provider.on('accountsChanged', (accounts) => {
      useLoginWidget.getState().dispatch({
        type: 'update_wallets',
        payload: {
          addresses: accounts,
          chain: 'evm-chain',
          provider: provider.provider,
          isInstallChecker: isExtensionForChainInstalled,
        },
      })
    })
  }

  // if (isSSR) return connectors
  //
  // if (window.ethereum) {
  //   window.ethereum.on('accountsChanged', function handle(accounts: string[]) {
  //     useMochi.getState().connect(accounts, 'evm-chain')
  //   })
  // }
  //
  // if (window.ronin) {
  //   window.ronin.provider.on(
  //     'accountsChanged',
  //     function handle(accounts: string[]) {
  //       useMochi.getState().connect(accounts, 'ronin-chain')
  //     },
  //   )
  // }

  return {
    connectors,
    connectorNames: Object.keys(connectors) as (keyof typeof connectors)[],
    isExtensionForChainInstalled,
  }
}
