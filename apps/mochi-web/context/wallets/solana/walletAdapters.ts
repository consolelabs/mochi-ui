import {
  WalletAdapterNetwork,
  WalletReadyState,
} from '@solana/wallet-adapter-base'
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { Wallet } from '../Wallet'

export const walletDownloadUrls: Record<string, any> = {
  Glow: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/glow-solana-wallet-beta/ojbcfhjmpigfobfclfflafhblgemeidi?hl=en&authuser=0',
    ios: '',
  },
  Solflare: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/solflare-wallet/bhhhlbepdkbapadjdnnojkbgioiodbic',
    android:
      'https://play.google.com/store/apps/details?id=com.solflare.mobile',
    ios: 'https://apps.apple.com/us/app/solflare/id1580902717',
  },
  Phantom: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa',
    android: 'https://play.google.com/store/apps/details?id=app.phantom',
    ios: 'https://apps.apple.com/app/phantom-solana-wallet/1598432977',
    qrCode: 'https://phantom.app/download',
  },
}

export const glow = (): Wallet => {
  const adapter = new GlowWalletAdapter()
  return {
    id: 'Glow',
    name: 'Glow',
    shortName: 'Glow',
    isSolana: true,
    iconUrl: adapter.icon,
    iconBackground: '#cc62d5',
    installed: [WalletReadyState.Installed, WalletReadyState.Loadable].includes(
      adapter.readyState,
    ),
    downloadUrls: walletDownloadUrls.Glow,
    createConnector: () => {
      return {
        adapter,
      }
    },
  }
}

export const solflare = (network: WalletAdapterNetwork): Wallet => {
  const adapter = new SolflareWalletAdapter({ network })

  return {
    id: 'Solflare',
    name: 'Solflare',
    shortName: 'Solflare',
    isSolana: true,
    iconUrl: adapter.icon,
    iconBackground: '#FFF',
    installed: [WalletReadyState.Installed, WalletReadyState.Loadable].includes(
      adapter.readyState,
    ),
    downloadUrls: walletDownloadUrls.Solflare,
    createConnector: () => {
      return {
        adapter,
      }
    },
  }
}

export const phantom = (): Wallet => {
  const adapter = new PhantomWalletAdapter()

  return {
    id: 'Phantom',
    name: 'Phantom',
    shortName: 'Phantom',
    isSolana: true,
    iconUrl: adapter.icon,
    iconBackground: '#FFF',
    installed: [WalletReadyState.Installed, WalletReadyState.Loadable].includes(
      adapter.readyState,
    ),
    downloadUrls: walletDownloadUrls.Phantom,
    createConnector: () => {
      return {
        adapter,
      }
    },
  }
}
