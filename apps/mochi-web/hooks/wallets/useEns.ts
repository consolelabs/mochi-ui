import { useEnsAvatar, useEnsName } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { useAppWalletContext } from 'context/wallet-context'
import { isSSR } from '@dwarvesf/react-utils'
import { utils } from 'ethers'

export const useEns = (_address: string, enabled?: boolean) => {
  let address = _address
  try {
    address = utils.getAddress(address)
  } catch {
    address = ''
  }
  const { chains } = useAppWalletContext()
  const hasMainnet = chains.some((c) => c.id === mainnet.id)

  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: mainnet.id,
    enabled: enabled ?? (hasMainnet && !isSSR()),
  })

  const { data: ensAvatar } = useEnsAvatar({
    address: address as `0x${string}`,
    chainId: mainnet.id,
    enabled: enabled ?? (hasMainnet && !isSSR()),
  })

  return {
    ensName,
    ensAvatar,
  }
}
