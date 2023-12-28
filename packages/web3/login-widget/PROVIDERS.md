# 🔌 Provider

- A new provider must extends from the abstract class ChainProvider
- All abstract methods must be async
- Refer to example [`evm-provider.ts`](./evm-provider.ts)

```typescript
export abstract class ChainProvider {
  // the actual provider of the wallet
  // e.g. window.ethereum, window.phantom.solana, etc...
  public provider: any

  // unique identifier, can be rdns when supporting eip6963
  public id: string = ''

  // display name of the wallet
  public name: string = ''

  // icon
  public icon: (props: SVGProps<SVGSVGElement>) => JSX.Element = null

  // platform enum
  // values are "evm-chain", "solana-chain", "sui-chain", "ronin-chain", "near-chain", "ton-chain"
  public platform: string = ''

  // chain id, only useful when chain is evm-compatible
  public chainId: string = ''

  // setters
  setId(id: string): ChainProvider
  setIcon(icon: (props: SVGProps<SVGSVGElement>) => JSX.Element): ChainProvider
  setName(name: string): ChainProvider

  // transfer coin/token, returns tx hash
  abstract transfer(args: object): Promise<string>

  /* -------------- TO BE IMPLEMENTED -------------- */
  // connect user wallet
  abstract connect(): Promise<{
    addresses: string[]
    signature: string
    platform: string
  } | null>

  // check if at least one wallet that support this chain is installed
  abstract isInstalled(): Promise<boolean>

  // synchronize wallet state (install status, get provider, register event handlers, etc...)
  abstract sync(storeGetter?: any): ChainProvider
}
```
