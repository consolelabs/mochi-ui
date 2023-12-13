// @ts-ignore
import hexer from 'browser-string-hexer'
import { createStore } from 'mipd'
import { utils } from 'ethers'
import isMobile from 'is-mobile'
import { msg, ChainProvider } from './provider'

const eip6963Store = typeof window !== 'undefined' ? createStore() : null

const iface = new utils.Interface([
  'function transfer(address to, uint amount)',
])

export class ProviderRON extends ChainProvider {
  public platform = 'ronin-chain'
  public chainId = '2020'

  sync(dispatch: any) {
    const provider = eip6963Store?.findProvider({ rdns: this.id })?.provider
    if (provider && !this.provider) {
      this.provider = provider

      provider.request({ method: 'eth_chainId' }).then((chainId) => {
        this.chainId = chainId
      })

      // register event handler
      provider.on('accountsChanged', (accounts) => {
        dispatch({
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
        dispatch({
          type: 'refresh',
        })
      })
    }
    return Object.assign(this)
  }

  async transfer(input: any) {
    if (!this.session || !this.signClient) return null

    try {
      const { from, to, tokenAddress } = input

      // case custom token
      if (!tokenAddress) {
        const params = {
          from,
          to,
          value: (+input.amount).toString(16),
        }
        if (isMobile() && this.session.topic && this.signClient) {
          return await this.signClient.request({
            topic: this.session.topic,
            chainId: `eip155:${(+input.chainId).toString(10)}`,
            request: {
              method: 'eth_sendTransaction',
              params: [params],
            },
          })
        }
        return this.provider.request({
          method: 'eth_sendTransaction',
          params: [params],
        })
      }

      // case native coin
      const params = {
        from,
        to: input.tokenAddress,
        data: iface.encodeFunctionData('transfer', [to, input.amount]),
      }

      if (isMobile() && this.session.topic && this.signClient) {
        return await this.signClient.request({
          topic: this.session.topic,
          chainId: `eip155:${(+input.chainId).toString(10)}`,
          request: {
            method: 'eth_sendTransaction',
            params: [params],
          },
        })
      }

      return this.provider.request({
        method: 'eth_sendTransaction',
        params: [params],
      })
    } catch (e) {
      console.error('ron-provider:transfer', e)
      return null
    }
  }

  async connect() {
    try {
      const hexedMsg = hexer(msg)

      if (isMobile()) {
        return await this.connectMobile()
      }

      const accounts = await this.provider.request({
        method: 'eth_requestAccounts',
      })

      const sig = await this.provider.request({
        method: 'personal_sign',
        params: [hexedMsg, accounts[0]],
      })

      return {
        addresses: accounts,
        signature: sig,
        platform: this.platform,
      }
    } catch (e) {
      console.error('ron-provider:connect', e)
      return null
    }
  }

  async connectMobile() {
    try {
      await this.initSignClient()
      const hexedMsg = hexer(msg)

      if (!this.signClient) throw new Error('Cannot init/find signClient')

      const { uri, approval } = await this.signClient.connect({
        requiredNamespaces: {
          eip155: {
            methods: ['eth_sendTransaction', 'personal_sign'],
            chains: [`eip155:${this.chainId}`],
            events: ['chainChanged', 'accountsChanged'],
          },
        },
      })

      if (!uri || !this.mobileProtocol)
        throw new Error(`uri/mobile protocol not found - ${this.name}`)

      const href = `${this.mobileProtocol}wc?uri=${encodeURIComponent(uri)}`
      window.open(href, '_self', 'noreferrer noopener')

      const session = await approval()
      this.session = session
      const accounts = session.namespaces.eip155.accounts
        .map((a) => a.split(':').pop() ?? '')
        .filter(Boolean)

      const sig = (await this.signClient.request({
        topic: this.session.topic,
        chainId: `eip155:${this.chainId}`,
        request: {
          method: 'personal_sign',
          params: [hexedMsg, accounts[0]],
        },
      })) as string

      return {
        addresses: accounts,
        signature: sig,
        platform: this.platform,
      }
    } catch (e) {
      console.error('ron-provider:connectMobile', e)
      return null
    }
  }

  async isInstalled() {
    const provider = eip6963Store?.findProvider({ rdns: this.id })?.provider
    return !!provider && provider === this.provider
  }
}
