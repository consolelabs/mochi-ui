/* eslint-disable class-methods-use-this */
import { ChainProvider } from './provider'

export class ProviderDisabled extends ChainProvider {
  sync() {
    return Object.assign(this)
  }

  async method() {
    return ''
  }

  async transfer() {
    return ''
  }

  async connect() {
    return null
  }

  async connectMobile() {
    return null
  }

  async isInstalled() {
    return false
  }
}
