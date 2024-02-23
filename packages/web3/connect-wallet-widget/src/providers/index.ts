/* istanbul ignore file */
import {
  ArgentWallet,
  BackpackWallet,
  Coin98Wallet,
  CoinbaseWallet,
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
} from '@mochi-ui/icons'
import { ProviderEVM } from './evm-provider'
import { ChainProvider, msg } from './provider'
import { ProviderSOL } from './sol-provider'
import { ProviderDisabled } from './disabled-provider'
import { ProviderRON } from './ron-provider'

export type ConnectorName = 'EVM' | 'RON' | 'SOL' | 'SUI' | 'TON'
export type Connectors = Record<ConnectorName, ChainProvider[]>
export { ChainProvider, msg }

export default function getProviders(dispatch: any) {
  const connectors: Connectors = {
    EVM: [
      new ProviderEVM()
        .setId('io.metamask')
        .setName('MetaMask')
        .setIcon(MetamaskWallet)
        .setMobileProtocol('metamask://')
        .setMetadata({
          installUrl: {
            ios: 'https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202',
            android:
              'https://play.google.com/store/apps/details?id=io.metamask',
            extension:
              'https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?utm_source=google.com',
          },
        })
        .sync(dispatch),
      new ProviderEVM()
        .setId('io.rabby')
        .setName('Rabby')
        .setIcon(RabbyWallet)
        .setMetadata({
          installUrl: {
            ios: '',
            android:
              'https://play.google.com/store/apps/details?id=com.debank.rabbymobile',
            extension:
              'https://chromewebstore.google.com/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch',
          },
        })
        .sync(dispatch),
      new ProviderEVM()
        .setId('me.rainbow')
        .setName('Rainbow')
        .setIcon(RainbowWallet)
        .setMobileProtocol('rainbow://')
        .setMetadata({
          installUrl: {
            ios: 'https://apps.apple.com/us/app/rainbow-ethereum-wallet/id1457119021?%24web_only=true&_branch_match_id=1261206776426563479&utm_source=branch&utm_campaign=web-home&utm_medium=marketing&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL8pLKk8sKNBLzs%2FV90%2F1TcnN9jLzr0gCAI5wN7gfAAAA',
            android:
              'https://play.google.com/store/apps/details?id=me.rainbow&%24web_only=true&_branch_match_id=1261206776426563479&utm_source=branch&utm_campaign=web-home&utm_medium=marketing&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL8pLKk8sKNBLzs%2FVD0s0MfQIDzbzr0gCAIiGbKYfAAAA',
            extension:
              'https://chromewebstore.google.com/detail/rainbow/opfgelmcmbiajamepnmloijbpoleiama',
          },
        })
        .sync(dispatch),
      new ProviderEVM()
        .setName('Uniswap')
        .setIcon(UniswapWallet)
        .setMobileProtocol('uniswap://')
        .setMetadata({
          installUrl: {
            ios: 'https://apps.apple.com/us/app/uniswap-crypto-nft-wallet/id6443944476?mt=8',
            android:
              'https://play.google.com/store/apps/details?id=com.uniswap.mobile&referrer=af_tranid%3DiDYGSyobTvStWkivbJlRZw%26c%3DEvergreen%26pid%3Dweb_microsite',
            extension: '',
          },
        })
        .sync(dispatch),
      new ProviderEVM()
        .setId('com.coinbase.wallet')
        .setName('Coinbase')
        .setIcon(CoinbaseWallet)
        .sync(dispatch),
      new ProviderEVM()
        .setId('com.okex.wallet')
        .setName('Okx')
        .setIcon(OkxWallet)
        .setMobileProtocol('okex://main/')
        .sync(dispatch),
      new ProviderEVM()
        .setName('Coin98')
        .setIcon(Coin98Wallet)
        .setMobileProtocol('coin98://')
        .sync(dispatch),
      new ProviderEVM()
        .setName('Trustwallet')
        .setIcon(TrustWallet)
        .setMobileProtocol('trust://')
        .sync(dispatch),
      new ProviderEVM()
        .setName('Argent')
        .setIcon(ArgentWallet)
        .setMobileProtocol('argent://')
        .sync(dispatch),
      new ProviderEVM()
        .setName('Safepal')
        .setIcon(SafepalWallet)
        .setMobileProtocol('safepalwallet://')
        .sync(dispatch),
      new ProviderEVM()
        .setId('app.phantom')
        .setName('Phantom')
        .setIcon(PhantomWallet)
        .setMobileProtocol('phantom://')
        .sync(dispatch),
      new ProviderEVM()
        .setId('app.backpack')
        .setName('Backpack')
        .setIcon(BackpackWallet)
        .setMobileProtocol('backpack://')
        .sync(dispatch),
    ],
    RON: [
      // ronin chain operates in the same manner as evm
      new ProviderRON()
        .setId('com.roninchain.wallet')
        .setName('Ronin')
        .setIcon(RoninWallet)
        .setMobileProtocol('roninwallet://')
        .sync(dispatch),
    ],
    SOL: [
      new ProviderSOL()
        .setId('backpack')
        .setName('Backpack')
        .setIcon(BackpackWallet)
        .setMobileProtocol('backpack://')
        .sync(),
      new ProviderSOL()
        .setId('phantom.solana')
        .setName('Phantom')
        .setIcon(PhantomWallet)
        .setMobileProtocol('phantom://')
        .sync(),
      new ProviderSOL()
        .setId('com.okex.wallet')
        .setName('Okx')
        .setIcon(OkxWallet)
        .setMobileProtocol('okex://main/')
        .sync(),
      new ProviderSOL()
        .setName('Coin98')
        .setIcon(Coin98Wallet)
        .setMobileProtocol('coin98://')
        .sync(),
      new ProviderSOL()
        .setName('Trustwallet')
        .setIcon(TrustWallet)
        .setMobileProtocol('trust://')
        .sync(),
      new ProviderSOL()
        .setName('Spot')
        .setIcon(SafepalWallet)
        .setMobileProtocol('spot://')
        .sync(),
    ],
    SUI: [
      new ProviderDisabled().setName('Suiet').setIcon(SuietWallet).sync(),
      new ProviderDisabled().setName('Okx').setIcon(OkxWallet).sync(),
      new ProviderDisabled().setName('Coin98').setIcon(Coin98Wallet).sync(),
      new ProviderDisabled()
        .setId('martian.sui')
        .setName('Martian')
        .setIcon(MartianWallet)
        .sync(),
    ],
    TON: [
      new ProviderDisabled().setName('TON').setIcon(Ton).sync(),
      new ProviderDisabled()
        .setName('Tonkeeper')
        .setIcon(TonKeeperWallet)
        .sync(),
      new ProviderDisabled().setName('Trustwallet').setIcon(TrustWallet).sync(),
      new ProviderDisabled().setName('Safepal').setIcon(SafepalWallet).sync(),
    ],
  }

  return connectors
}
