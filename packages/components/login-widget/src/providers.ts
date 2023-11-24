/* istanbul ignore file */
import bs58 from 'bs58'
import { useMochi } from '@consolelabs/mochi-store'
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
import type { WalletProps } from './wallet'

const msg = 'Please sign this message to prove that you own this wallet'
const signEVM =
  (p: any, platform = 'evm') =>
  (accounts: string[]) =>
    Promise.resolve(hexer(msg))
      .then((c) =>
        p.request({ method: 'personal_sign', params: [c, accounts.at(0)] }),
      )
      .then((signature: string) => {
        return {
          addresses: accounts,
          signature,
          msg,
          platform,
        }
      })
const signSol = (p: any) => () =>
  Promise.resolve(new TextEncoder().encode(msg))
    .then((m) => p.signMessage(m))
    .then(({ signature, publicKey: pb }) => {
      return {
        addresses: [pb.toString()],
        signature: bs58.encode(signature as Uint8Array),
        msg,
        platform: 'solana',
      }
    })

export default function getAvailableWallets() {
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
        connect: () =>
          window.ethereum
            .request({
              method: 'eth_requestAccounts',
              // params: [{ eth_accounts: {} }],
            })
            // .then(() =>
            //   window.ethereum.request({ method: 'eth_requestAccounts' }),
            // )
            .then(signEVM(window.ethereum))
            .catch(console.error),
      },
      {
        name: 'Rabby',
        icon: RabbyWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
      },
      {
        name: 'Rainbow',
        icon: RainbowWallet,
        isInstalled: false,
        connect: () => Promise.resolve(),
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
          window.phantom.solana.connect().then(signSol(window.phantom.solana)),
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
            .then(signEVM(window.ronin.provider, 'ronin')),
      },
    ],
    SOL: [
      {
        name: 'Phantom',
        icon: PhantomWallet,
        isInstalled: !isSSR && Boolean(window.phantom),
        connect: () =>
          window.phantom.solana.connect().then(signSol(window.phantom.solana)),
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

  if (isSSR) return connectors

  if (window.ethereum) {
    window.ethereum.on('accountsChanged', function handle(accounts: string[]) {
      useMochi.getState().connect(accounts, 'evm-chain')
    })
  }

  if (window.ronin) {
    window.ronin.provider.on(
      'accountsChanged',
      function handle(accounts: string[]) {
        useMochi.getState().connect(accounts, 'ronin-chain')
      },
    )
  }

  return connectors
}
