/* eslint-disable @typescript-eslint/return-await */
import dlv from 'dlv'
import { SystemProgram, PublicKey, Transaction } from '@solana/web3.js'
import isMobile from 'is-mobile'
import {
  msg,
  ChainProvider,
  TransferInput,
  type ConnectResponse,
} from './provider'
import { base } from './base'

const bs58 = base('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')

export class ProviderSOL extends ChainProvider {
  public platform = 'solana-chain'
  public chainId = '4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ'

  sync() {
    if (typeof window !== 'undefined') {
      this.provider = dlv(window, this.id)
    }

    return Object.assign(this)
  }

  async transfer(input: Omit<TransferInput, 'chainId'>) {
    try {
      const { from, to, amount, tokenAddress } = input

      if (tokenAddress) {
        return ''
      }

      const tx = new Transaction()

      tx.add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(from),
          toPubkey: new PublicKey(to),
          lamports: BigInt(amount),
        }),
      )

      // common func of all solana-providers
      if ('signAndSendTransaction' in this.provider) {
        return await this.provider.signAndSendTransaction(tx)
      }

      // backpack wallet
      const signedTx = await this.provider.signTransaction(tx)
      return await this.provider.send(signedTx)
    } catch (e) {
      console.error('sol-provider:transfer', e)
      return null
    }
  }

  async connect(): Promise<ConnectResponse> {
    try {
      const hexedMsg = new TextEncoder().encode(msg)

      if (isMobile()) {
        return await this.connectMobile()
      }

      await this.provider.connect()

      const signResult = await this.provider.signMessage(hexedMsg)
      let signature
      let pb = this.provider.publicKey
      if (signResult instanceof Uint8Array) {
        signature = signResult
      } else {
        signature = signResult.signature
      }

      if (!pb) {
        pb = signResult.publicKey
      }

      return {
        addresses: [pb.toString()],
        signature: bs58.encode(signature as Uint8Array),
        platform: this.platform,
      }
    } catch (e) {
      console.error('sol-provider:connect', e)

      // sometimes the Backpack wallet throw error with this message so we gotta try again automatically
      try {
        if (JSON.parse((e as Error).message).message === 'Plugin Closed') {
          return this.connect()
        }
      } catch (ee) {
        console.error('sol-provider:connect', ee)
        return null
      }
      return null
    }
  }

  async connectMobile() {
    try {
      const hexedMsg = new TextEncoder().encode(msg)
      await this.initSignClient()

      if (!this.signClient) throw new Error('Cannot init/find signClient')

      const { uri, approval } = await this.signClient.connect({
        requiredNamespaces: {
          solana: {
            methods: ['solana_signTransaction', 'solana_signMessage'],
            chains: [`solana:${this.chainId}`],
            events: [],
          },
        },
      })

      if (!uri || !this.mobileProtocol)
        throw new Error(`uri/mobile protocol not found - ${this.name}`)

      const href = `${this.mobileProtocol}wc?uri=${encodeURIComponent(uri)}`
      window.open(href, '_self', 'noreferrer noopener')

      const session = await approval()
      this.session = session
      const accounts = session.namespaces.solana.accounts
        .map((a) => a.split(':').pop() ?? '')
        .filter(Boolean)

      const { signature } = (await this.signClient.request({
        topic: this.session.topic,
        chainId: `solana:${this.chainId}`,
        request: {
          method: 'solana_signMessage',
          params: {
            message: bs58.encode(hexedMsg),
            pubkey: accounts[0],
          },
        },
      })) as { signature: string }

      return {
        addresses: accounts,
        signature,
        platform: this.platform,
      }
    } catch (e) {
      console.error('sol-provider:connectMobile', e)
      return null
    }
  }

  async isInstalled() {
    if (typeof window === 'undefined') return false
    const provider = dlv(window, this.id)

    return !!provider && provider === this.provider
  }
}
