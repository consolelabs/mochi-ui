import { useState } from 'react'
import { ChainPicker } from '../ChainPicker'
import { Platform } from '../PlatformPicker/type'

interface RecipientProps {
  accessToken: string | null
  onLoginRequest?: () => void
}

export const Recipient: React.FC<RecipientProps> = ({
  accessToken,
  onLoginRequest,
}) => {
  const [selectedPlatform] = useState<Platform>()
  const isOnChain = selectedPlatform?.platform === 'On-chain'

  function handleFocusInput() {
    if (!accessToken) {
      onLoginRequest?.()
    }
  }

  return (
    <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-3">
      <div className="flex justify-between items-center px-4 h-[34px]">
        <label
          htmlFor="recipients"
          className="text-sm font-semibold text-neutral-600"
        >
          Recipients
        </label>
        <span className="text-sm font-semibold text-neutral-600">0/20</span>
      </div>
      <div className="flex gap-x-2 items-center py-2.5 px-4 rounded-lg bg-white-pure">
        {isOnChain ? (
          <ChainPicker />
        ) : (
          <span className="h-[34px] text-lg text-[#848281] pt-0.5">@</span>
        )}
        <input
          id="recipients"
          className="flex-1 h-full bg-transparent outline-none"
          placeholder={isOnChain ? 'Enter address' : 'Enter username'}
          onFocus={handleFocusInput}
        />
      </div>
    </div>
  )
}
