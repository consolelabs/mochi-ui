import { useConnection } from '@solana/wallet-adapter-react'
import { utils, BigNumber } from 'ethers'
import useSWR from 'swr'
import { PublicKey } from '@solana/web3.js'
import { solanaChain } from 'context/wallets/solana/chains'

const FETCH_SOL_BALANCE_KEY = 'sol-balance'

export const useSolBalance = (publicKey: string) => {
  const { connection } = useConnection()

  const { data } = useSWR(
    publicKey ? [FETCH_SOL_BALANCE_KEY, publicKey] : null,
    (_: any, pubKey: string) => connection.getBalance(new PublicKey(pubKey)),
  )

  return {
    value: BigNumber.from(data ?? 0),
    formatted: utils.formatUnits(
      BigNumber.from(data ?? 0),
      solanaChain.nativeCurrency?.decimals,
    ),
    symbol: solanaChain.nativeCurrency!.symbol,
    decimals: solanaChain.nativeCurrency!.decimals,
  }
}
