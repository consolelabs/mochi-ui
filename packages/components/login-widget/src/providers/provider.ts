import { SVGProps } from 'react'

export abstract class ChainProvider<
  TransferInput = {
    from: string
    to: string
    amount: string
    tokenAddress?: string
  },
> {
  public provider: any
  public id: string = ''
  public name: string = ''
  public icon: (props: SVGProps<SVGSVGElement>) => JSX.Element = null as any
  public platform: string = ''
  public chainId: string = ''

  setId(id: string) {
    return Object.assign(this, { id })
  }

  setIcon(icon: (props: SVGProps<SVGSVGElement>) => JSX.Element) {
    return Object.assign(this, { icon })
  }

  setName(name: string) {
    return Object.assign(this, { name })
  }

  abstract transfer(args: TransferInput): Promise<string>
  abstract connect(): Promise<{
    addresses: string[]
    signature: string
    platform: string
  } | null>
  abstract isInstalled(): Promise<boolean>
  abstract sync(store?: any): ChainProvider<TransferInput>
}

export const msg = 'Please sign this message to prove wallet ownership' as const
