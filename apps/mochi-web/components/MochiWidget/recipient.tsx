import { Icon } from '@iconify/react'
import { PlatformPicker } from './PlatformPicker'
import { ChainPicker } from './ChainPicker'

export default function Recipient() {
  return (
    <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <PlatformPicker />
        <Icon icon="solar:document-bold" className="w-5 h-5 text-[#adacaa]" />
      </div>
      <div className="flex gap-x-2 items-center py-4 px-2 rounded-lg bg-white-pure">
        {/* <span className="text-lg text-[#848281]">@</span> */}
        <ChainPicker />
        <input
          className="flex-1 h-full bg-transparent outline-none"
          placeholder="Enter username"
        />
      </div>
    </div>
  )
}
