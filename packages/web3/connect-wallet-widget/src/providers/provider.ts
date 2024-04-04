import { SVGProps } from 'react'
import { SignClient } from '@walletconnect/sign-client'
import { wcProfjectId } from '../constants'

export type WriteInput = {
  abi: string
  method: string
  args?: (string | number)[]
  from: string
  to: string
}

export type ReadInput = {
  abi: string
  method: string
  args?: (string | number)[]
  from?: string
  to: string
}

export type TransferInput = {
  chainId: string
  from: string
  to: string
  amount: string
  tokenAddress?: string
}

export type ConnectResponse = {
  addresses: string[]
  signature: string
  platform: string
} | null

export abstract class ChainProvider<RI = ReadInput, WI = WriteInput> {
  public mobileProtocol: string = ''
  public provider: any
  public id: string = ''
  public name: string = ''
  public icon: (props: SVGProps<SVGSVGElement>) => JSX.Element = null as any
  public platform: string = ''
  public chainId: string | string[] = ''
  public signClient: Awaited<ReturnType<typeof SignClient.init>> | null = null
  public metadata?: {
    installUrl: {
      ios: string
      android: string
      extension: string
    }
  }
  protected session: any | null = null

  setMobileProtocol(mobileProtocol: string) {
    return Object.assign(this, { mobileProtocol })
  }

  setId(id: string) {
    return Object.assign(this, { id })
  }

  setIcon(icon: (props: SVGProps<SVGSVGElement>) => JSX.Element) {
    return Object.assign(this, { icon })
  }

  setName(name: string) {
    return Object.assign(this, { name })
  }

  setChainId(chainId: string) {
    return Object.assign(this, { chainId })
  }

  setMetadata(metadata: {
    installUrl: { ios: string; android: string; extension: string }
  }) {
    return Object.assign(this, { metadata })
  }

  async initSignClient() {
    if (this.signClient) return

    this.signClient = await SignClient.init({
      projectId: wcProfjectId,
      metadata: {
        name: 'Mochi',
        description: 'Web3 finance made easy',
        url: 'https://beta.mochi.gg',
        icons: ['https://beta.mochi.gg/logo.png'],
      },
    })

    this.signClient.on('session_event', (...args) => {
      console.log('session_event', args)
    })

    this.signClient.on('session_request', (...args) => {
      console.log('session_request', args)
    })

    this.signClient.on('session_update', (...args) => {
      console.log('session_update', args)
    })
  }

  abstract write(i: WI): Promise<void | string>
  abstract read(i: RI): Promise<void | any>
  abstract transfer(args: TransferInput): Promise<string>
  abstract connect(): Promise<ConnectResponse>
  abstract connectMobile(): Promise<ConnectResponse>
  abstract isInstalled(): Promise<boolean>
  abstract sync(storeGetter?: any): ChainProvider<WI>
}

export const msg = 'Please sign this message to prove wallet ownership' as const
