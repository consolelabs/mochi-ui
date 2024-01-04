import { BottomSheet } from '~cpn/BottomSheet'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useCallback, useEffect, useMemo } from 'react'
import { formatTokenAmount } from '~utils/number'
import { Button } from '@mochi-ui/core'
import { LoginWidget, useLoginWidget } from '@mochi-web3/login-widget'
import { CheckLine, ChevronLeftLine, Spinner } from '@mochi-ui/icons'
import Amount from '~cpn/Amount'
import { useTipWidget } from './store'
import MessagePicker from '../MessagePicker/MessagePicker'
import ThemePicker from '../ThemePicker/ThemePicker'
import TransactionPreview from '../TransactionPreview/TransactionPreview'
import { isToken } from '../TokenPicker/utils'

export default function StepTwo() {
  const {
    isTransferring,
    execute,
    setStep,
    updateRequestTheme,
    updateRequestMessage,
    request,
    wallet,
    amountUsd,
  } = useTipWidget()

  const { wallets, isAddressConnected, getProviderByAddress } = useLoginWidget()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const incorrectParams = useMemo(() => {
    const params: Record<string, any> = {
      chainType: null,
      chainIdHex: null,
      address: null,
    }
    if (wallet?.type === 'offchain') return params

    const provider = getProviderByAddress(wallet?.id ?? '')
    if (!provider && wallet?.id) {
      params.address = wallet.id
      params.chainType = request.asset?.token.chain?.type
      return params
    }

    if (wallet?.id && !isAddressConnected(wallet.id)) {
      params.address = wallet.id
      return params
    }

    if (
      provider?.provider &&
      provider?.chainId !== request.asset?.token.chain_id
    ) {
      params.chainIdHex = request.asset?.token.chain_id
    }

    return params
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isOpen,
    request.asset?.token.chain?.type,
    request.asset?.token.chain_id,
    wallet?.id,
    wallet?.type,
    wallets,
  ])

  const allGood =
    !incorrectParams.chainType &&
    !incorrectParams.chainIdHex &&
    !incorrectParams.address

  const handleIncorrectParams = useCallback(async () => {
    const provider = getProviderByAddress(wallet?.id ?? '')

    if (
      incorrectParams.chainIdHex &&
      provider &&
      provider.provider &&
      provider.chainId !== incorrectParams.chainIdHex
    ) {
      await provider.provider
        ?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: incorrectParams.chainIdHex }],
        })
        .then(() => onClose())
        .catch(() => void 0)
      return
    }

    onOpen()
  }, [
    getProviderByAddress,
    incorrectParams.chainIdHex,
    onClose,
    onOpen,
    wallet?.id,
  ])

  useEffect(() => {
    if (!wallet?.id) return
    const provider = getProviderByAddress(wallet.id)
    if (provider) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets])

  return (
    <div className="flex flex-col flex-1 gap-y-3 h-full min-h-0">
      <div className="flex flex-col justify-between h-full">
        <button onClick={() => setStep(1)} className="self-start outline-none">
          <ChevronLeftLine className="w-5 h-5" />
        </button>
        <span className="mx-auto text-base text-neutral-800">You send</span>
        <Amount
          value={formatTokenAmount(request.amount ?? 0).display}
          valueUsd={`${amountUsd} USD`}
          unit={
            isToken(request.asset)
              ? request.asset?.token?.symbol ?? ''
              : request.asset?.name ?? ''
          }
          tokenIcon={request.asset?.token.icon ?? ''}
        />
        {/* <div className="flex flex-col"> */}
        {/*   {!isToken(request.asset) && ( */}
        {/*     <span className="text-sm text-[#7a7e85] mx-auto"> */}
        {/*       &#8776;{' '} */}
        {/*       { */}
        {/*         formatTokenAmount( */}
        {/*           ( */}
        {/*             (request.amount ?? 0) * (request.asset?.token_amount ?? 0) */}
        {/*           ).toFixed(MAX_AMOUNT_PRECISION), */}
        {/*         ).display */}
        {/*       }{' '} */}
        {/*       {request.asset?.token.symbol} */}
        {/*     </span> */}
        {/*   )} */}
        {/*   <span className="text-sm text-[#7a7e85] mx-auto"> */}
        {/*     &#8776; {amountUsd} USD */}
        {/*   </span> */}
        {/* </div> */}

        <TransactionPreview.Tip />

        <div
          onKeyUpCapture={(e) => {
            if (e.key !== 'Enter' || isTransferring) return
            execute()
          }}
        >
          <MessagePicker
            value={request.message ?? ''}
            onChange={updateRequestMessage}
          />
        </div>

        <ThemePicker value={request.theme} onChange={updateRequestTheme} />
      </div>
      <Button
        type="button"
        onClick={allGood ? execute : handleIncorrectParams}
        className="flex justify-center mt-auto shrink-0"
        size="lg"
        disabled={isTransferring}
      >
        {isTransferring ? <>&#8203;</> : 'Send'}
        {isTransferring ? <Spinner /> : <CheckLine />}
      </Button>
      <BottomSheet isOpen={isOpen} onClose={onClose} title="Connect wallet">
        <LoginWidget raw chain={incorrectParams.chainType} />
      </BottomSheet>
    </div>
  )
}
