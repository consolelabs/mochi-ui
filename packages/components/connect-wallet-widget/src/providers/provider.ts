import { SVGProps } from 'react'
import { SignClient } from '@walletconnect/sign-client'
import { wcProfjectId } from '../constants'

export type TransferInput = {
  chainId: string
  from: string
  to: string
  amount: string
  tokenAddress?: string
}

export abstract class ChainProvider<I = TransferInput> {
  public mobileProtocol: string = ''
  public provider: any
  public id: string = ''
  public name: string = ''
  public icon: (props: SVGProps<SVGSVGElement>) => JSX.Element = null as any
  public platform: string = ''
  public chainId: string | string[] = ''
  public signClient: Awaited<ReturnType<typeof SignClient.init>> | null = null
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

  abstract transfer(args: I): Promise<string>
  abstract connect(): Promise<{
    addresses: string[]
    signature: string
    platform: string
  } | null>
  abstract connectMobile(): Promise<{
    addresses: string[]
    signature: string
    platform: string
  } | null>
  abstract isInstalled(): Promise<boolean>
  abstract sync(storeGetter?: any): ChainProvider<I>
}

export const msg = 'Please sign this message to prove wallet ownership' as const
