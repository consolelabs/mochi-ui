/* istanbul ignore file */
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
} from '@mochi-ui/icons'
import { ProviderEVM } from './evm-provider'
import { ChainProvider } from './provider'
import { ProviderSOL } from './sol-provider'
import { ProviderDisabled } from './disabled-provider'

export type ConnectorName = 'EVM' | 'RON' | 'SOL' | 'SUI' | 'TON'
export type Connectors = Record<ConnectorName, ChainProvider[]>

export default function getProviders(store: any) {
  const connectors: Connectors = {
    EVM: [
      new ProviderEVM()
        .setId('io.metamask')
        .setName('MetaMask')
        .setIcon(MetamaskWallet)
        .sync(store),
      new ProviderEVM()
        .setId('io.rabby')
        .setName('Rabby')
        .setIcon(RabbyWallet)
        .sync(store),
      new ProviderEVM()
        .setId('me.rainbow')
        .setName('Rainbow')
        .setIcon(RainbowWallet)
        .sync(store),
      new ProviderEVM().setName('Uniswap').setIcon(UniswapWallet).sync(store),
      new ProviderEVM()
        .setId('com.coinbase.wallet')
        .setName('Coinbase')
        .setIcon(CoinbaseWallet)
        .sync(store),
      new ProviderEVM()
        .setId('com.okex.wallet')
        .setName('Okx')
        .setIcon(OkxWallet)
        .sync(store),
      new ProviderEVM().setName('Coin98').setIcon(Coin98Wallet).sync(store),
      new ProviderEVM().setName('Trustwallet').setIcon(TrustWallet).sync(store),
      new ProviderEVM().setName('Argent').setIcon(ArgentWallet).sync(store),
      new ProviderEVM().setName('Safepal').setIcon(SafepalWallet).sync(store),
      new ProviderEVM()
        .setId('app.phantom')
        .setName('Phantom')
        .setIcon(PhantomWallet)
        .sync(store),
      new ProviderEVM().setName('Ledger').setIcon(LedgerWallet).sync(store),
    ],
    RON: [
      // ronin chain operates in the same manner as evm
      new ProviderEVM()
        .setId('com.roninchain.wallet')
        .setName('Ronin')
        .setIcon(RoninWallet)
        .sync(store),
    ],
    SOL: [
      new ProviderSOL()
        .setId('phantom.solana')
        .setName('Phantom')
        .setIcon(PhantomWallet)
        .sync(),
      new ProviderSOL()
        .setId('backpack')
        .setName('Backpack')
        .setIcon(BackpackWallet)
        .sync(),
      new ProviderSOL().setName('Okx').setIcon(OkxWallet).sync(),
      new ProviderSOL().setName('Coin98').setIcon(Coin98Wallet).sync(),
      new ProviderSOL().setName('Trustwallet').setIcon(TrustWallet).sync(),
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

  return connectors
}
