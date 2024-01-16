import { useDisclosure } from '@dwarvesf/react-hooks'
import { useWalletStore } from '~store'
import { useCallback, useEffect, useMemo } from 'react'
import { Button } from '@mochi-ui/core'
import { ArrowRightLine, ChevronDownLine } from '@mochi-ui/icons'
import { MAX_AMOUNT_PRECISION, formatTokenAmount } from '~utils/number'
import { BottomSheet } from '~cpn/BottomSheet'
import { useLoginWidget } from '@mochi-web3/login-widget'
import { BalanceWithSource } from '~cpn/TokenTableList'
import { Recipient } from '../Recipient'
import { AmountInput } from '../AmountInput'
import { useTipWidget } from './store'
import { isToken } from '../TokenPicker/utils'
import { Moniker } from '../TokenPicker/type'

const notEnoughBalMsg = 'Insufficient balance'
const amountTooSmallMsg = 'Amount too small'
const amountTooBigMsg = 'Amount too big'

export default function StepOne() {
  const {
    unauthorizedContent,
    wallet,
    request,
    setStep,
    updateSourceWallet,
    setRecipients,
    removeRecipient,
    setAsset,
    setAmount,
  } = useTipWidget()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLoggedIn, profile } = useLoginWidget()
  const amountErrorMgs = useMemo(() => {
    if (!request.amount) return ''
    if (isToken(request.asset)) {
      if (request.amount > (request.asset?.asset_balance ?? 0))
        return notEnoughBalMsg

      if (request.amount < Number(`1e-${request.asset.token.decimal}`))
        return amountTooSmallMsg
      if (request.amount > Number(`1e${request.asset.token.decimal}`))
        return amountTooBigMsg
    } else {
      const assetAmount =
        wallet?.balances?.find(
          (b: any) =>
            !isToken(request.asset) &&
            b.token?.symbol === request.asset?.token.symbol,
        )?.asset_balance ?? 0

      const monikerAmount = request.asset?.asset_balance ?? 0
      const currentMonikerAmount = monikerAmount
        ? formatTokenAmount(
            (assetAmount / monikerAmount).toFixed(MAX_AMOUNT_PRECISION),
          ).value
        : 0
      if (request.amount > currentMonikerAmount) return notEnoughBalMsg
    }
    return ''
  }, [request.amount, request.asset, wallet?.balances])

  const { setWallets } = useWalletStore()

  const canProceed =
    !amountErrorMgs && (request.recipients?.length ?? 0) > 0 && !!request.amount

  const onSelectAsset = useCallback(
    (asset: BalanceWithSource | Moniker | null) => {
      setAsset(asset)
      if (asset) {
        updateSourceWallet(asset.source.id)
      }
    },
    [setAsset, updateSourceWallet],
  )

  useEffect(() => {
    if (!isLoggedIn || !profile) return
    setWallets(profile)

    onClose()
  }, [isLoggedIn, onClose, profile, setWallets])

  return (
    <div className="flex flex-col flex-1 gap-y-3 h-full min-h-0">
      <div className="flex flex-col gap-y-1 h-full">
        <div className="flex flex-col gap-y-2.5 items-center pb-3">
          <p className="text-xl text-[#343433] font-medium">Send a tip</p>
          <span className="text-[#848281] text-xs text-center">
            Celebrate someone&apos;s birthday or achievement
            <br />
            by sending them money
          </span>
        </div>
        {/* <WalletPicker */}
        {/*   authorized={isLoggedIn} */}
        {/*   unauthorizedContent={unauthorizedContent} */}
        {/*   data={wallets} */}
        {/*   loading={isFetchingWallets} */}
        {/*   onSelect={updateSourceWallet} */}
        {/* /> */}
        <AmountInput
          authorized={isLoggedIn}
          unauthorizedContent={unauthorizedContent}
          wallet={wallet}
          onSelectAsset={onSelectAsset}
          onAmountChanged={setAmount}
          canProceed={canProceed}
        />
        <Recipient
          authorized={isLoggedIn}
          unauthorizedContent={unauthorizedContent}
          selectedRecipients={request.recipients ?? []}
          onUpdateRecipient={setRecipients}
          onRemoveRecipient={removeRecipient}
        />
      </div>
      {isLoggedIn ? (
        <Button
          size="lg"
          onClick={() => setStep(2)}
          className="flex justify-center"
          disabled={!canProceed}
        >
          {amountErrorMgs || 'Continue'}
          {canProceed && <ArrowRightLine className="w-4 h-4" />}
        </Button>
      ) : (
        <Button
          onClick={onOpen}
          className="justify-center"
          size="lg"
          type="button"
        >
          Connect options
          <ChevronDownLine className="w-5 h-5 text-white-pure" />
        </Button>
      )}
      <BottomSheet
        isOpen={isOpen && !isLoggedIn}
        onClose={onClose}
        dynamic={!isLoggedIn}
      >
        {unauthorizedContent}
      </BottomSheet>
    </div>
  )
}
