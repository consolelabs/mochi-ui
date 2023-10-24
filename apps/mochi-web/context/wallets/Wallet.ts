import { Connector, Chain as WagmiChain } from 'wagmi'
import { Adapter as SolAdapter } from '@solana/wallet-adapter-base'

export type InstructionStepName = 'install' | 'create' | 'scan'

export interface Chain extends WagmiChain {
  id: number
  iconUrl?: string
  iconBackground?: string
}

type AppConnector<
  C extends Connector = Connector,
  A extends SolAdapter = SolAdapter,
> = {
  connector?: C
  adapter?: A
  mobile?: {
    getUri?: () => Promise<string>
  }
  desktop?: {
    getUri?: () => Promise<string>
  }
  qrCode?: {
    getUri: () => Promise<string>
    instructions?: {
      learnMoreUrl: string
      steps: {
        step: InstructionStepName
        title: string
        description: string
      }[]
    }
  }
}

export type Wallet<
  C extends Connector = Connector,
  A extends SolAdapter = SolAdapter,
> = {
  id: string
  name: string
  isSolana?: boolean
  isEVM?: boolean
  isSui?: boolean
  shortName?: string
  iconUrl: string
  iconBackground: string
  installed?: boolean
  downloadUrls?: {
    android?: string
    ios?: string
    browserExtension?: string
    qrCode?: string
  }
  createConnector: () => AppConnector<C, A>
}

export type WalletList = { groupName: string; wallets: Wallet[] }[]

export type WalletInstance = Omit<Wallet, 'createConnector'> &
  ReturnType<Wallet['createConnector']> & {
    index: number
    groupName: string
    walletConnectModalConnector?: Connector
  }

export enum WalletStep {
  None = 'NONE',
  Get = 'GET',
  Connect = 'CONNECT',
  Download = 'DOWNLOAD',
  Instructions = 'INSTRUCTIONS',
}
