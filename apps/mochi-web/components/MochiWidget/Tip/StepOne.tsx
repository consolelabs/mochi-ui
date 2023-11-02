import { Icon } from '@iconify/react'
import { useAuthStore } from '~store'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { AuthPanel } from '~cpn/AuthWidget'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@consolelabs/ui-components'
import { SourcePicker } from '../SourcePicker'
import { Recipient } from '../Recipient'
import { AmountInput } from '../AmountInput'
import { useTipWidget } from '.'

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
        <button className="flex gap-x-1 justify-center items-center py-2.5 px-6 bg-blue-700 rounded-lg">
          <span className="font-semibold text-white-pure">
            Connect options
          </span>
          <Icon
            className={`w-5 h-5 text-white-pure transition ${
              isOpenLoginPopup ? 'rotate-180' : ''
            }`}
            icon="majesticons:chevron-down-line"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="bg-white-pure w-[412px] !p-0">
        <AuthPanel variant="dropdown" />
      </PopoverContent>
    </Popover>
  )
})

export default function StepOne() {
  const { setStep } = useTipWidget()
  const { token, isLoggedIn } = useAuthStore()
  const connectButtonRef = useRef<ConnectButtonRef>(null)

  function openLoginPopup() {
    connectButtonRef?.current?.openLogin()
  }

  return (
    <div className="flex flex-col flex-1 gap-y-3 min-h-0">
      <div className="flex overflow-y-auto flex-col gap-y-2 h-full">
        <div className="flex flex-col gap-y-2.5 items-center mt-3 py-3">
          <p className="text-xl text-[#343433] font-medium">Send a tip</p>
          <span className="text-[#848281] text-xs text-center">
            Celebrate someone&apos; birthday or achievement
            <br />
            by sending them money
          </span>
        </div>
        <SourcePicker accessToken={token} onLoginRequest={openLoginPopup} />
        <Recipient accessToken={token} onLoginRequest={openLoginPopup} />
        <AmountInput accessToken={token} onLoginRequest={openLoginPopup} />
      </div>
      {isLoggedIn ? (
        <button
          onClick={() => setStep(2)}
          className="flex gap-x-2 justify-center items-center py-3 px-6 bg-blue-700 rounded-lg"
        >
          <span className="font-semibold text-white-pure">Continue</span>
          <Icon className="w-5 h-5 text-white-pure" icon="ci:arrow-right-sm" />
        </button>
      ) : (
        <ConnectButton ref={connectButtonRef} />
      )}
    </div>
  )
}
