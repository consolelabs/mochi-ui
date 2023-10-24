import { truncate } from '@dwarvesf/react-utils'
import Image from 'next/image'
import { erc20ABI, useBalance } from 'wagmi'
import { useEns } from '~hooks/wallets/useEns'
import { useSns } from '~hooks/wallets/useSns'
import { useSolBalance } from '~hooks/wallets/useSolBalance'
import { DropdownButton } from './DropdownButton'
import { BigNumber } from 'ethers'
import { useCallback } from 'react'
import { useAppWalletContext } from '~context/wallet-context'
import { usePayRequest } from '~store/pay-request'
import { shallow } from 'zustand/shallow'
import { PublicKey } from '@solana/web3.js'

export const WalletButton = ({
  address,
  onClick: _onClick,
  image,
  type,
  disabled,
}: {
  type: string
  address: string
  image: string
  symbol: string
  onClick?: (args?: any) => void
  disabled: boolean
}) => {
  const { amount, payType, tokenAddress, chainId, isNative, isEVM } =
    usePayRequest(
      (s) => ({
        payType: s.payRequest.type,
        tokenAddress: s.payRequest.token.address,
        amount: s.payRequest.amount,
        chainId: Number(s.payRequest.token.chain.chain_id),
        isNative: s.payRequest.token.native,
        isEVM: s.payRequest.is_evm,
      }),
      shallow,
    )
  const { ensName } = useEns(address, type === 'evm')
  const { data } = useBalance({
    address: address as `0x${string}`,
    enabled: type === 'evm',
  })
  const solBalance = useSolBalance(address)
  const { names } = useSns(address)

  const defaultAddr = truncate(address, 8, true, '.')

  const { showConnectModal } = useAppWalletContext()

  const onClick = useCallback(() => {
    if (disabled) return
    if (payType === 'paylink') {
      _onClick?.({
        walletAddress: address,
      })
      return
    }

    showConnectModal(async ({ platform }) => {
      const isAddressEVM = platform === 'evm'
      _onClick?.(
        isEVM
          ? isNative
            ? {
                request: { to: address, value: BigNumber.from(amount) },
                isAddressEVM,
                chainId,
              }
            : {
                address: tokenAddress as `0x${string}`,
                abi: erc20ABI,
                functionName: 'transfer',
                args: [address, BigNumber.from(amount)],
                enabled: type === 'evm',
                chainId,
                isAddressEVM,
              }
          : isNative
          ? {
              recipientAddress: new PublicKey(address),
              amount: BigNumber.from(amount),
              isAddressEVM,
            }
          : {
              tokenMint: new PublicKey(tokenAddress),
              recipientAddress: new PublicKey(address),
              amount: BigNumber.from(amount),
              isAddressEVM,
            },
      )
    })
  }, [
    _onClick,
    address,
    amount,
    chainId,
    disabled,
    isEVM,
    isNative,
    payType,
    showConnectModal,
    tokenAddress,
    type,
  ])

  return (
    <DropdownButton
      disabled={disabled}
      title={
        type === 'evm'
          ? ensName ?? defaultAddr
          : names.find(Boolean) ?? defaultAddr
      }
      description={
        type === 'evm'
          ? `${data?.formatted ?? ''} ${data?.symbol ?? ''}`
          : `${solBalance.formatted ?? ''} ${solBalance.symbol ?? ''}`
      }
      image={<Image src={image} alt={`${type}-network-icon`} fill />}
      onClick={onClick}
    />
  )
}
