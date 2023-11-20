import { Balance } from '~store'
import { MonikerAsset } from './type'

export const DefaultBalances: Balance[] = [
  {
    id: '1',
    token: {
      id: '1',
      symbol: 'BTC',
      icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1696501400',
    },
  },
  {
    id: '2',
    token: {
      id: '2',
      symbol: 'ETH',
      icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1696479627',
    },
  },
  {
    id: '3',
    token: {
      id: '3',
      symbol: 'USDT',
      icon: 'https://assets.coingecko.com/coins/images/325/small/Tether.png?1696501661',
    },
  },
  {
    id: '4',
    token: {
      id: '4',
      symbol: 'BNB',
      icon: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850',
    },
  },
  {
    id: '5',
    token: {
      id: '5',
      symbol: 'FTM',
      icon: 'https://assets.coingecko.com/coins/images/4001/small/Fantom_round.png?1669652346',
    },
  },
  {
    id: '6',
    token: {
      id: '6',
      symbol: 'AAVE',
      icon: 'https://assets.coingecko.com/coins/images/12645/small/AAVE.png',
    },
  },
  {
    id: '7',
    token: {
      id: '7',
      symbol: 'MATIC',
      icon: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    },
  },
  {
    id: '8',
    token: {
      id: '8',
      symbol: 'USDC',
      icon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
    },
  },
  {
    id: '9',
    token: {
      id: '9',
      symbol: 'SOL',
      icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png?1696504756',
    },
  },
  {
    id: '10',
    token: {
      id: '10',
      symbol: 'ARB',
      icon: 'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg?1696516109',
    },
  },
  {
    id: '11',
    token: {
      id: '11',
      symbol: 'LINK',
      icon: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png?1696502009',
    },
  },
]

export const MonikerAssets: MonikerAsset[] = [
  {
    id: '1',
    moniker: {
      id: '1',
      moniker: 'coffee',
    },
    group: 'Default',
    token_amount: '0.01',
    token_unit: 'BNB',
    total_amount: '2.08',
  },
  {
    id: '2',
    moniker: {
      id: '2',
      moniker: 'cookie',
    },
    group: 'Default',
    token_amount: '3',
    token_unit: 'USDT',
    total_amount: '3',
  },
  {
    id: '3',
    moniker: {
      id: '3',
      moniker: 'beer',
    },
    group: 'Default',
    token_amount: '0.02',
    token_unit: 'DOGE',
    total_amount: '0.01',
  },
  {
    id: '4',
    moniker: {
      id: '4',
      moniker: 'pho',
    },
    group: 'Default',
    token_amount: '2',
    token_unit: 'USDT',
    total_amount: '2',
  },
  {
    id: '5',
    moniker: {
      id: '5',
      moniker: 'mochi',
    },
    group: "Dwarves network's moniker",
    token_amount: '100',
    token_unit: 'ICY',
    total_amount: '150',
  },
  {
    id: '6',
    moniker: {
      id: '6',
      moniker: 'diamon',
    },
    group: "Dwarves network's moniker",
    token_amount: '2',
    token_unit: 'ETH',
    total_amount: '4000',
  },
]