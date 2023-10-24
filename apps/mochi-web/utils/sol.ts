import { PublicKey } from '@solana/web3.js'

export const isSolAddress = (addr: string) => {
  try {
    return new PublicKey(addr) && PublicKey.isOnCurve(addr)
  } catch {
    return false
  }
}
