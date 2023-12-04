/* eslint-disable @typescript-eslint/return-await */
import bs58 from 'bs58'
import dlv from 'dlv'
import { SVGProps } from 'react'
import { SystemProgram, PublicKey, Transaction } from '@solana/web3.js'
import { msg, ChainProvider } from './provider'

export class ProviderSOL extends ChainProvider {
  public id = ''
  public icon = null as unknown as (
    props: SVGProps<SVGSVGElement>,
  ) => JSX.Element
  public name = ''
  public platform = 'solana-chain'
  public chainId = 'mainnet-beta'

  sync() {
    if (typeof window !== 'undefined') {
      this.provider = dlv(window, this.id)
    }

    return Object.assign(this)
  }

  async transfer(input: any) {
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

      if ('signAndSendTransaction' in this.provider) {
        return await this.provider.signAndSendTransaction(tx)
      }

      const signedTx = await this.provider.signTransaction(tx)
      return await this.provider.send(signedTx)
    } catch (e) {
      return null
    }
  }

  async connect() {
    try {
      const hexedMsg = new TextEncoder().encode(msg)

      const { signature, publicKey: pb } =
        await this.provider.signMessage(hexedMsg)

      return {
        addresses: [pb.toString()],
        signature: bs58.encode(signature as Uint8Array),
        platform: this.platform,
      }
    } catch (e) {
      return null
    }
  }

  async isInstalled() {
    if (typeof window === 'undefined') return false
    const provider = dlv(window, this.id)

    return !!provider && provider === this.provider
  }
}
