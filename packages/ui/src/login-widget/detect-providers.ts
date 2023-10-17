import hexer from 'browser-string-hexer'
import bs58 from 'bs58'
import IconMetamaskWallet from '../icons/components/icon-metamask-wallet'
import IconRainbowWallet from '../icons/components/icon-rainbow-wallet'
import IconCoinbaseWallet from '../icons/components/icon-coinbase-wallet'
import IconPhantomWallet from '../icons/components/icon-phantom-wallet'
import IconGlowWallet from '../icons/components/icon-glow-wallet'
import IconRoninWallet from '../icons/components/icon-ronin-wallet'
import IconSuietWallet from '../icons/components/icon-suiet-wallet'
import IconMartianWallet from '../icons/components/icon-martian-wallet'
import type { WalletProps } from './wallet'

const msg = 'Please sign this message to prove that you own this wallet'
const signEVM = (p: any) => (accounts: string[]) =>
  Promise.resolve(hexer(msg))
    .then((c) =>
      p.request({ method: 'personal_sign', params: [c, accounts.at(0)] }),
    )
    .then((signature: string) => {
      return {
        address: accounts.at(0),
        signature,
        msg,
      }
    })
const signSol = (p: any) => () =>
  Promise.resolve(new TextEncoder().encode(msg))
    .then((m) => p.signMessage(m))
    .then(({ signature, publicKey: pb }) => {
      return {
        address: pb.toString(),
        signature: bs58.encode(signature as Uint8Array),
        msg,
      }
    })

export default function getAvailableWallets() {
  const connectors: Record<'EVM' | 'Solana' | 'RONIN' | 'Sui', WalletProps[]> =
    {
      EVM: [],
      Solana: [],
      RONIN: [],
      Sui: [],
    }

  for (const p of window.ethereum?.providers ?? []) {
    if (p.isRainbow) {
      connectors.EVM.push({
        icon: IconRainbowWallet,
        name: 'Rainbow',
        connect: () =>
          p.request({ method: 'eth_requestAccounts' }).then(signEVM(p)),
      })
      continue
    }
    if (p.isCoinbaseWallet) {
      connectors.EVM.push({
        icon: IconCoinbaseWallet,
        name: 'Coinbase',
        connect: () =>
          p.request({ method: 'eth_requestAccounts' }).then(signEVM(p)),
      })
      continue
    } else if (p.providers?.length) {
      const coinbase = window.ethereum?.providers
        .find((provider: any) => provider.providerMap?.get('CoinbaseWallet'))
        .providerMap?.get('CoinbaseWallet')

      if (coinbase) {
        connectors.EVM.push({
          icon: IconCoinbaseWallet,
          name: 'Coinbase',
          connect: () =>
            coinbase
              .request({ method: 'eth_requestAccounts' })
              .then(signEVM(p)),
        })
        continue
      }
    }

    if (p.isMetaMask) {
      connectors.EVM.push({
        icon: IconMetamaskWallet,
        name: 'MetaMask',
        connect: () =>
          p.request(p, { method: 'eth_requestAccounts' }).then(signEVM(p)),
      })
      continue
    }
  }

  if (window.ronin) {
    connectors.RONIN.push({
      icon: IconRoninWallet,
      name: 'Ronin',
      connect: () =>
        window.ronin.provider
          .request({
            method: 'eth_requestAccounts',
          })
          .then(signEVM(window.ronin.provider)),
    })
  }

  if (window.phantom) {
    connectors.Solana.push({
      icon: IconPhantomWallet,
      name: 'Phantom',
      connect: () =>
        window.phantom.solana.connect().then(signSol(window.phantom.solana)),
    })
  }

  if (window.glow) {
    connectors.Solana.push({
      icon: IconGlowWallet,
      name: 'Glow',
      connect: () => window.glow.connect().then(signSol(window.glow)),
    })
  }

  if (window.martian) {
    connectors.Sui.push({
      icon: IconMartianWallet,
      name: 'Martian',
      connect: () =>
        window.martian
          .connect()
          .then(() =>
            window.martian.signMessage({
              address: true,
              message: msg,
              nonce: Date.now(),
            }),
          )
          .then((data: any) => {
            return {
              address: data.address,
              msg,
              signature: data.signature,
            }
          }),
    })
  }

  const walletStandard = {
    register: (wallet: any) => {
      if (wallet.name === 'Suiet') {
        window.suiet = wallet
        connectors.Sui.push({
          icon: IconSuietWallet,
          name: 'Suiet',
          connect: () =>
            wallet.features['standard:connect']
              .connect()
              .then(() => {
                return wallet.features['sui:signMessage'].signMessage({
                  message: new TextEncoder().encode(msg),
                })
              })
              .then((data: any) => {
                return {
                  address: wallet.accounts.at(0).address,
                  msg,
                  signature: data.signature,
                }
              }),
        })
      }
    },
  }

  const event = new CustomEvent('wallet-standard:app-ready', {
    detail: walletStandard,
  })
  window.dispatchEvent(event)

  return connectors
}
