import { InjectedConnector } from 'wagmi/connectors/injected'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { Chain } from 'wagmi'
import { isAndroid, isIOS, isMobile } from 'utils/isMobile'
import { Wallet } from 'context/wallets/Wallet'
import { getWalletConnectConnector } from './getWalletConnectConnector'

export interface BraveOptions {
  chains: Chain[]
  shimDisconnect?: boolean
}

export const brave = ({ chains, shimDisconnect }: BraveOptions): Wallet => ({
  id: 'brave',
  name: 'Brave Wallet',
  iconUrl: '/svg/wallet-icons/brave.svg',
  iconBackground: '#fff',
  installed:
    typeof window !== 'undefined' && window.ethereum?.isBraveWallet === true,
  downloadUrls: {
    // We're opting not to provide a download prompt if Brave isn't the current
    // browser since it's unlikely to be a desired behavior for users. It's
    // more of a convenience for users who are already using Brave rather than
    // an explicit wallet choice for users coming from other browsers.
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options: { shimDisconnect },
    }),
  }),
})

export interface CoinbaseOptions {
  appName: string
  chains: Chain[]
}

export const coinbase = ({ appName, chains }: CoinbaseOptions): Wallet => {
  return {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    shortName: 'Coinbase',
    iconUrl: '/svg/wallet-icons/coinbase.svg',
    iconBackground: '#2c5ff6',
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
      android: 'https://play.google.com/store/apps/details?id=org.toshi',
      ios: 'https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455',
      qrCode: 'https://coinbase-wallet.onelink.me/q5Sx/fdb9b250',
    },
    // @ts-ignore
    createConnector: () => {
      const ios = isIOS()

      const connector = new CoinbaseWalletConnector({
        chains,
        options: {
          appName,
          headlessMode: true,
          reloadOnDisconnect: true,
        },
      })

      const getUri = async () => (await connector.getProvider()).qrUrl

      return {
        connector,
        ...(ios
          ? {}
          : {
              mobile: { getUri },
              qrCode: {
                getUri,
                instructions: {
                  learnMoreUrl:
                    'https://www.coinbase.com/learn/tips-and-tutorials/how-to-set-up-a-crypto-wallet',
                  steps: [
                    {
                      description:
                        'We recommend putting Coinbase Wallet on your home screen for quicker access.',
                      step: 'install',
                      title: 'Open the Coinbase Wallet app',
                    },
                    {
                      description:
                        'You can easily backup your wallet using the cloud backup feature.',
                      step: 'create',
                      title: 'Create or Import a Wallet',
                    },
                    {
                      description:
                        'After you scan, a connection prompt will appear for you to connect your wallet.',
                      step: 'scan',
                      title: 'Tap the scan button',
                    },
                  ],
                },
              },
            }),
      }
    },
  }
}

export interface InjectedOptions {
  chains: Chain[]
  shimDisconnect?: boolean
}

export const injected = ({
  chains,
  shimDisconnect,
}: InjectedOptions): Wallet => ({
  id: 'injected',
  name: 'Injected Wallet',
  iconUrl: '/svg/wallet-icons/injected.png',
  iconBackground: '#fff',
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options: { shimDisconnect },
    }),
  }),
})

export interface MetaMaskOptions {
  chains: Chain[]
  shimDisconnect?: boolean
}

export function isMetaMask(ethereum: NonNullable<(typeof window)['ethereum']>) {
  // Logic borrowed from agmi's MetaMaskConnector
  // https://github.com/tmm/wagmi/blob/main/packages/core/src/connectors/metaMask.ts
  const isMetaMask = Boolean(ethereum.isMetaMask)

  if (!isMetaMask) {
    return false
  }

  // Brave tries to make itself look like MetaMask
  // Could also try RPC `web3_clientVersion` if following is unreliable
  /* eslint-disable no-underscore-dangle */
  if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) {
    return false
  }

  if (ethereum.isTokenary) {
    return false
  }

  return true
}

export const metaMask = ({
  chains,
  shimDisconnect,
}: MetaMaskOptions): Wallet => {
  const isMetaMaskInjected =
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    isMetaMask(window.ethereum)

  const shouldUseWalletConnect = isMobile() && !isMetaMaskInjected

  return {
    id: 'metaMask',
    name: 'MetaMask',
    iconUrl: '/svg/wallet-icons/metaMask.svg',
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isMetaMaskInjected : undefined,
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
      android: 'https://play.google.com/store/apps/details?id=io.metamask',
      ios: 'https://apps.apple.com/us/app/metamask/id1438144202',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({ chains })
        : new MetaMaskConnector({
            chains,
            options: { shimDisconnect },
          })
      return {
        connector,
      }
    },
  }
}

export interface RainbowOptions {
  chains: Chain[]
}

export const rainbow = ({ chains }: RainbowOptions): Wallet => ({
  id: 'rainbow',
  name: 'Rainbow',
  iconUrl: '/svg/wallet-icons/rainbow.svg',
  iconBackground: '#0c2f78',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=me.rainbow',
    ios: 'https://apps.apple.com/us/app/rainbow-ethereum-wallet/id1457119021',
    qrCode: 'https://rainbow.download',
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains })

    return {
      connector,
      mobile: {
        getUri: async () => {
          const uri = await connector.getURI()

          return isAndroid()
            ? uri
            : `https://rnbwapp.com/wc?uri=${encodeURIComponent(uri)}`
        },
      },
      qrCode: {
        getUri: async () => await connector.getURI(),
        instructions: {
          learnMoreUrl:
            'https://learn.rainbow.me/connect-your-wallet-to-a-website-or-app',
          steps: [
            {
              description:
                'We recommend putting Rainbow on your home screen for faster access to your wallet.',
              step: 'install',
              title: 'Open the Rainbow app',
            },
            {
              description:
                'You can easily backup your wallet using our backup feature on your phone.',
              step: 'create',
              title: 'Create or Import a Wallet',
            },
            {
              description:
                'After you scan, a connection prompt will appear for you to connect your wallet.',
              step: 'scan',
              title: 'Tap the scan button',
            },
          ],
        },
      },
    }
  },
})

export interface SteakOptions {
  chains: Chain[]
}

export const steak = ({ chains }: SteakOptions): Wallet => ({
  id: 'steak',
  name: 'Steakwallet',
  iconUrl: '/svg/wallet-icons/steak.svg',
  iconBackground: '#000',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=fi.steakwallet.app',
    ios: 'https://apps.apple.com/np/app/steakwallet/id1569375204',
    qrCode: 'https://steakwallet.fi/download',
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains })

    return {
      connector,
      mobile: {
        getUri: async () => {
          const uri = await connector.getURI()
          return isAndroid()
            ? uri
            : `https://links.steakwallet.fi/wc?uri=${encodeURIComponent(uri)}`
        },
      },
      qrCode: {
        getUri: async () => await connector.getURI(),
        instructions: {
          learnMoreUrl:
            'https://blog.steakwallet.fi/introducing-the-steakwallet-beta/',
          steps: [
            {
              description:
                'Add Steakwallet to your home screen for faster access to your wallet.',
              step: 'install',
              title: 'Open the Steakwallet app',
            },
            {
              description: 'Create a new wallet or import an existing one.',
              step: 'create',
              title: 'Create or Import a Wallet',
            },
            {
              description:
                'Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect.',
              step: 'scan',
              title: 'Tap the QR icon and scan',
            },
          ],
        },
      },
    }
  },
})

export interface TrustOptions {
  chains: Chain[]
  shimDisconnect?: boolean
}

export const trust = ({ chains, shimDisconnect }: TrustOptions): Wallet => ({
  id: 'trust',
  name: 'Trust Wallet',
  iconUrl: '/svg/wallet-icons/trust.svg',
  iconBackground: '#fff',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
    ios: 'https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409',
    qrCode: 'https://link.trustwallet.com',
  },
  createConnector: () => {
    const inAppBrowser = Boolean(
      typeof window !== 'undefined' && window.ethereum?.isTrust,
    )

    if (inAppBrowser) {
      return {
        connector: new InjectedConnector({
          chains,
          options: { shimDisconnect },
        }),
      }
    }

    const connector = getWalletConnectConnector({ chains })

    return {
      connector,
      mobile: {
        getUri: async () => {
          const uri = await connector.getURI()
          return isAndroid()
            ? uri
            : `https://link.trustwallet.com/wc?uri=${encodeURIComponent(uri)}`
        },
      },
      qrCode: {
        getUri: async () => await connector.getURI(),
        instructions: {
          learnMoreUrl:
            'https://trustwallet.com/blog/an-introduction-to-trustwallet',
          steps: [
            {
              description:
                'Put Trust Wallet on your home screen for faster access to your wallet.',
              step: 'install',
              title: 'Open the Trust Wallet app',
            },
            {
              description: 'Create a new wallet or import an existing one.',
              step: 'create',
              title: 'Create or Import a Wallet',
            },
            {
              description:
                'Choose New Connection, then scan the QR code and confirm the prompt to connect.',
              step: 'scan',
              title: 'Tap WalletConnect in Settings',
            },
          ],
        },
      },
    }
  },
})

export interface WalletConnectOptions {
  chains: Chain[]
}

export const walletConnect = ({ chains }: WalletConnectOptions): Wallet => ({
  id: 'walletConnect',
  name: 'WalletConnect',
  iconUrl: '/svg/wallet-icons/walletConnect.svg',
  iconBackground: '#3b99fc',
  createConnector: () => {
    const ios = isIOS()

    const connector = getWalletConnectConnector({
      chains,
      showQrModal: ios,
    })

    const getUri = async () => await connector.getURI()

    return {
      connector,
      ...(ios
        ? {}
        : {
            mobile: { getUri },
            qrCode: { getUri },
          }),
    }
  },
})

export const ronin = ({ chains }: { chains: Chain[] }): Wallet => ({
  id: 'ronin',
  name: 'Ronin',
  iconUrl: '/svg/wallet-icons/ronin.svg',
  iconBackground: '#0c2f78',
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/ronin-wallet/fnjhmkhhmkbjkkabndcnnogagogbneec',
    android:
      'https://play.google.com/store/apps/details?id=com.skymavis.genesis&hl=vi&pli=1',
    ios: 'https://apps.apple.com/us/app/ronin-wallet/id1592675001',
  },
  createConnector: () => {
    const connector = new InjectedConnector({
      chains: chains?.filter((c) => c.id === 2020),
      options: {
        getProvider: () => {
          if (!window.ronin) {
            throw new Error('No crypto wallet found. Please install it.')
          }
          const a = window.ronin.provider
          return a
        },
      },
    })
    return {
      connector,
    }
  },
})
