import { MonikerAsset, TokenAsset } from './type'

export const TokenAssets: TokenAsset[] = [
  {
    id: 1,
    token: {
      id: 1,
      name: 'BTC',
    },
    token_amount: '1',
    total_amount: '30000',
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
  },
  {
    id: 2,
    token: {
      id: 2,
      name: 'ETH',
    },
    token_amount: '5',
    total_amount: '12000',
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
  },
  {
    id: 3,
    token: {
      id: 3,
      name: 'USDT',
    },
    token_amount: '25349',
    total_amount: '25502',
    icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
  },
  {
    id: 4,
    token: {
      id: 4,
      name: 'BNB',
    },
    token_amount: '0',
    total_amount: '0',
    icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
  },
  {
    id: 5,
    token: {
      id: 5,
      name: 'FTM',
    },
    token_amount: '0',
    total_amount: '0',
    icon: 'https://cryptologos.cc/logos/fantom-ftm-logo.png',
  },
  {
    id: 6,
    token: {
      id: 6,
      name: 'ADA',
    },
    token_amount: '0',
    total_amount: '0',
    icon: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
  },
  {
    id: 7,
    token: {
      id: 7,
      name: 'MATIC',
    },
    token_amount: '0',
    total_amount: '0',
    icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
  },
  {
    id: 8,
    token: {
      id: 8,
      name: 'AVAX',
    },
    token_amount: '0',
    total_amount: '0',
    icon: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
  },
  {
    id: 9,
    token: {
      id: 9,
      name: 'SOL',
    },
    token_amount: '0',
    total_amount: '0',
    icon: 'https://cryptologos.cc/logos/solana-sol-logo.png',
  },
  {
    id: 10,
    token: {
      id: 10,
      name: 'DOT',
    },
    token_amount: '0',
    total_amount: '0',
    icon: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
  },
  {
    id: 11,
    token: {
      id: 11,
      name: 'LINK',
    },
    token_amount: '0',
    total_amount: '0',
    icon: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
  },
]

export const MonikerAssets: MonikerAsset[] = [
  {
    id: 1,
    moniker: {
      id: 1,
      name: 'coffee',
      icon: '☕',
      group: 'default',
    },
    token_amount: '0.01',
    token_unit: 'BNB',
    total_amount: '2.08',
  },
  {
    id: 2,
    moniker: {
      id: 2,
      name: 'cookie',
      icon: '🍪',
      group: 'default',
    },
    token_amount: '3',
    token_unit: 'USDT',
    total_amount: '3',
  },
  {
    id: 3,
    moniker: {
      id: 3,
      name: 'beer',
      icon: '🍺',
      group: 'default',
    },
    token_amount: '0.02',
    token_unit: 'DOGE',
    total_amount: '0.01',
  },
  {
    id: 4,
    moniker: {
      id: 4,
      name: 'pho',
      icon: '🍜',
      group: 'default',
    },
    token_amount: '2',
    token_unit: 'USDT',
    total_amount: '2',
  },
  {
    id: 5,
    moniker: {
      id: 5,
      name: 'mochi',
      icon: '🍡',
      group: "Dwarves Network's Moniker",
    },
    token_amount: '100',
    token_unit: 'ICY',
    total_amount: '150',
  },
  {
    id: 6,
    moniker: {
      id: 6,
      name: 'diamon',
      icon: '💎',
      group: "Dwarves Network's Moniker",
    },
    token_amount: '2',
    token_unit: 'ETH',
    total_amount: '4000',
  },
]
