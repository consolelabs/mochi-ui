import { Icon } from '@iconify/react'

export default function Recipient() {
  return (
    <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <button className="flex gap-x-2 items-center py-1 px-3 rounded-lg bg-white-pure">
          <Icon
            icon="logos:discord-icon"
            className="flex-shrink-0 w-4 h-4 text-discord"
          />
          <span className="text-sm font-medium">Discord</span>
          <Icon icon="majesticons:chevron-down-line" className="w-4 h-4" />
        </button>
        <Icon icon="solar:document-bold" className="w-5 h-5 text-[#adacaa]" />
      </div>
      <div className="flex gap-x-2 items-center py-5 px-4 rounded-lg bg-white-pure">
        <span className="text-lg text-[#848281]">@</span>
        <input
          className="flex-1 h-full bg-transparent outline-none"
          placeholder="Enter username"
        />
      </div>
    </div>
  )
}
