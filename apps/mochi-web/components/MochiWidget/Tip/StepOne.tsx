import { SourcePicker } from '../SourcePicker'
import { Recipient } from '../Recipient'
import { AmountInput } from '../AmountInput'
import { Icon } from '@iconify/react'
import { useTipWidget } from '.'
import { useAuthStore } from '~store'
import { useState } from 'react'

interface ConnectButtonProps {
  isOpenLogin: boolean
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ isOpenLogin }) => {
  const [isOpenLoginPopup, openLoginPopup] = useState(false)

  function toggleLoginPopup() {
    openLoginPopup(!isOpenLoginPopup)
  }
  return (
    <button
      onClick={toggleLoginPopup}
      className="flex gap-x-1 justify-center items-center py-2.5 px-6 bg-blue-700 rounded-lg"
    >
      <span className="text-sm font-medium text-white-pure">
        Connect options
      </span>
      <Icon
        className={`w-5 h-5 text-white-pure transition ${
          isOpenLoginPopup ? 'rotate-180' : ''
        }`}
        icon="majesticons:chevron-down-line"
      />
    </button>
  )
}

export default function StepOne() {
  const { setStep } = useTipWidget()
  const { token, isLoggedIn } = useAuthStore()
  const [isOpenLogin, openLogin] = useState(false)

  function openLoginPopup() {
    openLogin(true)
  }

  return (
    <div className="flex flex-col flex-1 gap-y-3 min-h-0">
      <div className="flex overflow-y-auto flex-col gap-y-3 h-full">
        <div className="flex flex-col gap-y-2 items-center mt-3">
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
          className="flex gap-x-1 justify-center items-center py-2.5 px-6 bg-blue-700 rounded-lg"
        >
          <span className="text-sm font-medium text-white-pure">Continue</span>
          <Icon className="w-5 h-5 text-white-pure" icon="ci:arrow-right-sm" />
        </button>
      ) : (
        <ConnectButton isOpenLogin={isOpenLogin} />
      )}
    </div>
  )
}
