import { useShallow } from 'zustand/react/shallow'
import { useAuthStore } from '~store'
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { AuthPanel } from '~cpn/AuthWidget'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@consolelabs/core'
import { IconArrowRight, IconChevronDown } from '@consolelabs/icons'
import { MAX_AMOUNT_PRECISION, formatTokenAmount } from '~utils/number'
import { WalletPicker } from '../WalletPicker'
import { Recipient } from '../Recipient'
import { AmountInput } from '../AmountInput'
import { useTipWidget } from './store'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { isToken } from '../TokenPicker/utils'

interface ConnectButtonRef {
  openLogin: () => void
}

const ConnectButton = forwardRef<ConnectButtonRef, {}>((_, ref) => {
  const [isOpenLoginPopup, openLoginPopup] = useState(false)

  useImperativeHandle(
    ref,
    () => ({
      openLogin: () => openLoginPopup(true),
    }),
    [],
  )

  function onOpenChange(open: boolean) {
    openLoginPopup(open)
  }

  return (
    <Popover open={isOpenLoginPopup} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button className="justify-center" size="lg" type="button">
          Connect options
          <IconChevronDown
            className={`w-5 h-5 text-white-pure transition ${
              isOpenLoginPopup ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white-pure w-[412px] !p-0">
        <AuthPanel variant="dropdown" />
      </PopoverContent>
    </Popover>
  )
})

const notEnoughtBalMsg =
  'Insufficient balance. Please add more tokens and try again.'

export default function StepOne() {
  const {
    fromWallet,
    request,
    setStep,
    updateSourceWallet,
    addRecipient,
    removeRecipient,
    setAsset,
    setAmount,
  } = useTipWidget()
  const isLoggedIn = useAuthStore(useShallow((s) => s.isLoggedIn))
  const connectButtonRef = useRef<ConnectButtonRef>(null)
  const amountErrorMgs = useMemo(() => {
    if (!request.amount) return ''
    if (isToken(request.asset)) {
      if (request.amount > (request.asset?.asset_balance ?? 0))
        return notEnoughtBalMsg
    } else {
      const assetAmount =
        fromWallet?.balances?.find(
          (b) =>
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
  }, [request.amount, request.asset, fromWallet?.balances])

  function openLoginPopup() {
    connectButtonRef?.current?.openLogin()
  }

  return (
    <div className="flex flex-col flex-1 gap-y-3 min-h-0">
      <div className="flex overflow-y-auto flex-col gap-y-2 h-full">
        <div className="flex flex-col gap-y-2.5 items-center pb-3">
          <p className="text-xl text-[#343433] font-medium">Send a tip</p>
          <span className="text-[#848281] text-xs text-center">
            Celebrate someone&apos;s birthday or achievement
            <br />
            by sending them money
          </span>
        </div>
        <WalletPicker
          onLoginRequest={openLoginPopup}
          onSelect={updateSourceWallet}
        />
        <Recipient
          onLoginRequest={openLoginPopup}
          selectedRecipients={request.recipients ?? []}
          onSelectRecipient={addRecipient}
          onRemoveRecipient={removeRecipient}
        />
        <AmountInput
          onLoginRequest={openLoginPopup}
          wallet={fromWallet}
          onSelectAsset={setAsset}
          onAmountChanged={setAmount}
        />
        <ErrorMessage>{amountErrorMgs}</ErrorMessage>
      </div>
      {isLoggedIn ? (
        <Button
          size="lg"
          onClick={() => setStep(2)}
          className="flex justify-center"
          disabled={
            !!amountErrorMgs ||
            (request.recipients?.length ?? 0) <= 0 ||
            !request.amount
          }
        >
          Continue
          <IconArrowRight className="w-4 h-4" />
        </Button>
      ) : (
        <ConnectButton ref={connectButtonRef} />
      )}
    </div>
  )
}
