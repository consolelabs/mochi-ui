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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@consolelabs/ui-components'
import { Button } from '@consolelabs/core'
import { IconArrowRight, IconChevronDown } from '@consolelabs/icons'
import { WalletPicker } from '../WalletPicker'
import { Recipient } from '../Recipient'
import { AmountInput } from '../AmountInput'
import { useTipWidget } from './store'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'

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

export default function StepOne() {
  const {
    fromWallet,
    recipients,
    asset,
    amount,
    setStep,
    updateSourceWallet,
    addRecipient,
    removeRecipient,
    setAsset,
    setAmount,
  } = useTipWidget()
  const { token, isLoggedIn } = useAuthStore()
  const connectButtonRef = useRef<ConnectButtonRef>(null)
  const amountErrorMgs = useMemo(() => {
    if ((amount ?? 0) > (asset?.asset_balance ?? 0)) {
      return 'Insufficient balance. Please add more tokens and try again.'
    }
    return ''
  }, [asset, amount])

  function openLoginPopup() {
    connectButtonRef?.current?.openLogin()
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-y-3">
      <div className="flex flex-col h-full overflow-y-auto gap-y-2">
        <div className="flex flex-col gap-y-2.5 items-center py-3 mt-3">
          <p className="text-xl text-[#343433] font-medium">Send a tip</p>
          <span className="text-[#848281] text-xs text-center">
            Celebrate someone&apos;s birthday or achievement
            <br />
            by sending them money
          </span>
        </div>
        <WalletPicker
          accessToken={token}
          onLoginRequest={openLoginPopup}
          onSelect={updateSourceWallet}
        />
        <Recipient
          accessToken={token}
          onLoginRequest={openLoginPopup}
          selectedRecipients={recipients}
          onSelectRecipient={addRecipient}
          onRemoveRecipient={removeRecipient}
        />
        <AmountInput
          accessToken={token}
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
