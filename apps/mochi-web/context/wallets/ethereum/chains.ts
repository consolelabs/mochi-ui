import { Chain as WagmiChain } from 'wagmi'
import { Chain } from '../Wallet'

// Sourced from https://github.com/tmm/wagmi/blob/main/packages/core/src/constants/chains.ts
// This is just so we can clearly see which of wagmi's first-class chains we provide metadata for
type ChainName =
  | 'arbitrum'
  | 'arbitrumRinkeby'
  | 'avalanche'
  | 'avalancheFuji'
  | 'goerli'
  | 'hardhat'
  | 'kovan'
  | 'localhost'
  | 'mainnet'
  | 'optimism'
  | 'optimismKovan'
  | 'polygon'
  | 'polygonMumbai'
  | 'rinkeby'
  | 'ropsten'

type IconMetadata = {
  iconUrl: string
  iconBackground: string
}

type ChainMetadata = {
  chainId: number
} & IconMetadata

const arbitrumIcon: IconMetadata = {
  iconBackground: '#96bedc',
  iconUrl: '/svg/chain-icons/arbitrum.svg',
}

const avalancheIcon: IconMetadata = {
  iconBackground: '#e84141',
  iconUrl: '/svg/chain-icons/avalanche.svg',
}

const ethereumIcon: IconMetadata = {
  iconBackground: '#484c50',
  iconUrl: '/svg/chain-icons/ethereum.svg',
}

const hardhatIcon: IconMetadata = {
  iconBackground: '#f9f7ec',
  iconUrl: '/svg/chain-icons/hardhat.svg',
}

const optimismIcon: IconMetadata = {
  iconBackground: '#ff5a57',
  iconUrl: '/svg/chain-icons/optimism.svg',
}

const polygonIcon: IconMetadata = {
  iconBackground: '#9f71ec',
  iconUrl: '/svg/chain-icons/polygon.svg',
}

const chainMetadataByName: Record<ChainName, ChainMetadata | null> = {
  arbitrum: { chainId: 42_161, ...arbitrumIcon },
  arbitrumRinkeby: { chainId: 421_611, ...arbitrumIcon },
  avalanche: { chainId: 43_114, ...avalancheIcon },
  avalancheFuji: { chainId: 43_113, ...avalancheIcon },
  goerli: { chainId: 5, ...ethereumIcon },
  hardhat: { chainId: 31_337, ...hardhatIcon },
  kovan: { chainId: 42, ...ethereumIcon },
  localhost: { chainId: 1_337, ...ethereumIcon },
  mainnet: { chainId: 1, ...ethereumIcon },
  optimism: { chainId: 10, ...optimismIcon },
  optimismKovan: { chainId: 69, ...optimismIcon },
  polygon: { chainId: 137, ...polygonIcon },
  polygonMumbai: { chainId: 80_001, ...polygonIcon },
  rinkeby: { chainId: 4, ...ethereumIcon },
  ropsten: { chainId: 3, ...ethereumIcon },
}

const chainMetadataById = Object.fromEntries(
  (
    Object.values(chainMetadataByName).filter(
      (val) => val != null,
    ) as ChainMetadata[]
  ).map(({ chainId, ...metadata }) => [chainId, metadata]),
)

export const decorateChains = (chains: WagmiChain[]): Chain[] => {
  return chains.map((chain) => ({
    ...(chainMetadataById[chain.id] ?? {}),
    ...chain,
  }))
}
