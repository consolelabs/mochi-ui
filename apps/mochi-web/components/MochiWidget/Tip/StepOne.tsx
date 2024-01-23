import { useDisclosure } from '@dwarvesf/react-hooks'
import { useMochiWidget, useWalletStore } from '~store'
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
  const { setSelectedAsset } = useMochiWidget()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLoggedIn, profile } = useLoginWidget()
  const amountErrorMgs = useMemo(() => {
    if (!request.amount) return ''
    if (isToken(request.asset)) {
      if (request.amount > (request.asset?.asset_balance ?? 0))
        return notEnoughBalMsg

      const [_, rightStr] = request.amount.toString().split('.')
      if (rightStr?.length > 8 && Number(rightStr) !== 0)
        return amountTooSmallMsg
      if (request.amount < Number(`1e-8`)) return amountTooSmallMsg
      if (request.amount > Number(`1e8`)) return amountTooBigMsg
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
    setWallets(profile).then((wallets) => {
      // if there is previously chosen asset
      // refresh that assset's balance
      if (request.asset) {
        const chosenWallet = wallets.find((w) => w.id === wallet?.id)
        const asset = chosenWallet?.balances.find(
          (b) =>
            b.token.address.toLowerCase() ===
            request.asset?.token.address.toLowerCase(),
        )
        if (asset) {
          setSelectedAsset(asset)
        }
      }
    })

    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, onClose, profile])

  return (
    <div className="flex flex-col flex-1 gap-y-3 h-full min-h-0">
      <div className="flex flex-col gap-y-3 h-full">
        <div className="flex flex-col gap-y-1.5 items-center pb-1">
          <p className="text-xl font-medium text-text-primary">Send a tip</p>
          <span className="text-xs text-center text-text-tertiary">
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
