import { Chain as WagmiChain } from 'wagmi'
import { Chain } from '../Wallet'

export const solanaChain: Chain & Omit<WagmiChain, 'rpcUrls'> = {
  id: -1,
  name: 'Solana',
  network: 'mainnet',
  iconUrl: '/svg/chain-icons/solana.svg',
  iconBackground: '#9945FF',
  nativeCurrency: { name: 'Sol', symbol: 'SOL', decimals: 9 },
  blockExplorers: {
    default: {
      name: 'Solscan',
      url: 'https://solscan.io',
    },
  },
  rpcUrls: {
    default: {
      http: [],
      webSocket: [],
    },
    public: {
      http: [],
      webSocket: [],
    },
  },
}
