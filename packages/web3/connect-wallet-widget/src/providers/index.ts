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
        .sync(dispatch),
      new ProviderEVM()
        .setId('io.rabby')
        .setName('Rabby')
        .setIcon(RabbyWallet)
        .sync(dispatch),
      new ProviderEVM()
        .setId('me.rainbow')
        .setName('Rainbow')
        .setIcon(RainbowWallet)
        .setMobileProtocol('rainbow://')
        .sync(dispatch),
      new ProviderEVM()
        .setName('Uniswap')
        .setIcon(UniswapWallet)
        .setMobileProtocol('uniswap://')
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
