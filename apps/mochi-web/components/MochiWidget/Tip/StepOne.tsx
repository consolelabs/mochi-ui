import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useWalletStore } from '~store'
import { useEffect, useMemo } from 'react'
import { Button, useLoginWidget } from '@mochi-ui/core'
import { ArrowRightLine, ChevronDownLine } from '@mochi-ui/icons'
import { MAX_AMOUNT_PRECISION, formatTokenAmount } from '~utils/number'
import { BottomSheet } from '~cpn/BottomSheet'
import { WalletPicker } from '../WalletPicker'
import { Recipient } from '../Recipient'
import { AmountInput } from '../AmountInput'
import { useTipWidget } from './store'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { isToken } from '../TokenPicker/utils'

const notEnoughtBalMsg =
  'Insufficient balance. Please add more tokens and try again.'

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
      if (request.amount > (request.asset.asset_balance ?? 0))
        return notEnoughtBalMsg
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
      if (request.amount > currentMonikerAmount) return notEnoughtBalMsg
    }
    return ''
  }, [request.amount, request.asset, wallet?.balances])

  const {
    isFetching: isFetchingWallets,
    wallets,
    setWallets,
  } = useWalletStore()

  const canProceed =
    !amountErrorMgs && (request.recipients?.length ?? 0) > 0 && !!request.amount

  useEffect(() => {
    if (!isLoggedIn || !profile) return
    setWallets(profile)

    onClose()
  }, [isLoggedIn, onClose, profile, setWallets])

  return (
    <div className="flex flex-col flex-1 gap-y-3 h-full min-h-0">
      <ScrollArea.Viewport className="[&>div]:!block">
        <div className="flex flex-col gap-y-2 h-full">
          <div className="flex flex-col gap-y-2.5 items-center pb-3">
            <p className="text-xl text-[#343433] font-medium">Send a tip</p>
            <span className="text-[#848281] text-xs text-center">
              Celebrate someone&apos;s birthday or achievement
              <br />
              by sending them money
            </span>
          </div>
          <WalletPicker
            authorized={isLoggedIn}
            unauthorizedContent={unauthorizedContent}
            data={wallets}
            loading={isFetchingWallets}
            onSelect={updateSourceWallet}
          />
          <Recipient
            authorized={isLoggedIn}
            unauthorizedContent={unauthorizedContent}
            selectedRecipients={request.recipients ?? []}
            onUpdateRecipient={setRecipients}
            onRemoveRecipient={removeRecipient}
          />
          <AmountInput
            authorized={isLoggedIn}
            unauthorizedContent={unauthorizedContent}
            wallet={wallet}
            onSelectAsset={setAsset}
            onAmountChanged={setAmount}
            canProceed={canProceed}
          />
          <ErrorMessage>{amountErrorMgs}</ErrorMessage>
        </div>
      </ScrollArea.Viewport>
      {isLoggedIn ? (
        <Button
          size="lg"
          onClick={() => setStep(2)}
          className="flex justify-center"
          disabled={!canProceed}
        >
          Continue
          <ArrowRightLine className="w-4 h-4" />
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
      <BottomSheet isOpen={isOpen && !isLoggedIn} onClose={onClose}>
        {unauthorizedContent}
      </BottomSheet>
    </div>
  )
}
