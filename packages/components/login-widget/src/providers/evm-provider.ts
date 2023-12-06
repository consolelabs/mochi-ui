import hexer from 'browser-string-hexer'
import { createStore } from 'mipd'
import { utils } from 'ethers'
import { msg, ChainProvider } from './provider'

const eip6963Store = typeof window !== 'undefined' ? createStore() : null

const iface = new utils.Interface([
  'function transfer(address to, uint amount)',
])

export class ProviderEVM extends ChainProvider {
  public platform = 'evm-chain'

  sync(get: any) {
    const provider = eip6963Store?.findProvider({ rdns: this.id })?.provider
    if (provider && !this.provider) {
      this.provider = provider

      provider.request({ method: 'eth_chainId' }).then((chainId) => {
        this.chainId = chainId
      })

      // register event handler
      provider.on('accountsChanged', (accounts) => {
        get().dispatch({
          type: 'update_wallets',
          payload: {
            addresses: accounts,
            chain: this.platform,
            provider,
          },
        })
      })

      provider.on('chainChanged', (chainId) => {
        this.chainId = chainId
        get().dispatch({
          type: 'refresh',
        })
      })
    }
    return Object.assign(this)
  }

  async transfer(input: any) {
    try {
      const { from, to, tokenAddress } = input

      // case custom token
      if (!tokenAddress) {
        const params = {
          from,
          to,
          value: (+input.amount).toString(16),
        }
        const tx = await this.provider.request({
          method: 'eth_sendTransaction',
          params: [params],
        })

        return tx
      }

      // case native coin
      const params = {
        from,
        to: input.tokenAddress,
        data: iface.encodeFunctionData('transfer', [to, input.amount]),
      }

      const tx = await this.provider.request({
        method: 'eth_sendTransaction',
        params: [params],
      })

      return tx
    } catch (e) {
      return null
    }
  }

  async connect() {
    try {
      const hexedMsg = hexer(msg)

      const accounts = await this.provider.request({
        method: 'eth_requestAccounts',
      })

      const sig = await this.provider.request({
        method: 'personal_sign',
        params: [hexedMsg, accounts.at(0)],
      })

      return {
        addresses: accounts,
        signature: sig,
        platform: this.platform,
      }
    } catch (e) {
      return null
    }
  }

  async isInstalled() {
    const provider = eip6963Store?.findProvider({ rdns: this.id })?.provider
    return !!provider && provider === this.provider
  }
}
