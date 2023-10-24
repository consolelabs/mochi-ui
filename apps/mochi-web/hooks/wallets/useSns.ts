import { getAllDomains, reverseLookup } from '@bonfida/spl-name-service'
import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'

export const useSns = (address: string) => {
  const [names, setNames] = useState<string[]>([])
  const { connection } = useConnection()

  useEffect(() => {
    try {
      const ownerWallet = new PublicKey(address)
      getAllDomains(connection, ownerWallet)
        .then((keys) => {
          return Promise.all(keys.map((k) => reverseLookup(connection, k)))
        })
        .then((names) => setNames(names))
    } catch (e) {}
  }, [address, connection])

  return { names }
}
