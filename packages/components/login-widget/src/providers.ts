/* istanbul ignore file */
import bs58 from 'bs58'
import { useMochi } from '@consolelabs/mochi-store'
import hexer from 'browser-string-hexer'
import {
  IconMetamaskWallet,
  IconPhantomWallet,
  IconRoninWallet,
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
    'EVM' | 'RON' | 'SUI' | 'TON' | 'BTC' | 'Aptos' | 'Cosmos',
    WalletProps[]
  > = {
    EVM: [
      {
        name: 'MetaMask',
        icon: IconMetamaskWallet,
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
            .then(signEVM(window.ethereum)),
      },
      {
        name: 'Phantom',
        icon: IconPhantomWallet,
        isInstalled: !isSSR && Boolean(window.phantom),
        connect: () =>
          window.phantom.solana.connect().then(signSol(window.phantom.solana)),
      },
    ],
    // Solana: [],
    RON: [
      {
        name: 'Ronin',
        icon: IconRoninWallet,
        isInstalled: !isSSR && Boolean(window.ronin),
        connect: () =>
          window.ronin.provider
            .request({ method: 'eth_requestAccounts' })
            .then(signEVM(window.ronin.provider, 'ronin')),
      },
    ],
    SUI: [],
    TON: [],
    BTC: [],
    Aptos: [],
    Cosmos: [],
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
