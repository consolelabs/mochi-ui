import { Icon } from '@iconify/react'
import { PlatformPicker } from './PlatformPicker'
import { ChainPicker } from './ChainPicker'
import { useState } from 'react'
import { Platform } from './PlatformPicker/type'

export default function Recipient() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>()
  const isOnChain = selectedPlatform?.platform === 'On-chain'

  return (
    <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <PlatformPicker onSelect={setSelectedPlatform} />
        <Icon icon="solar:document-bold" className="w-5 h-5 text-[#adacaa]" />
      </div>
      <div className="flex gap-x-2 items-center py-4 px-2 rounded-lg bg-white-pure">
        {isOnChain ? (
          <ChainPicker />
        ) : (
          <span className="text-lg text-[#848281]">@</span>
        )}
        <input
          className="flex-1 h-full bg-transparent outline-none"
          placeholder={isOnChain ? 'Enter address' : 'Enter username'}
        />
      </div>
    </div>
  )
}
