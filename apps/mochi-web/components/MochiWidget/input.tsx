import { Icon } from '@iconify/react'
import Button from '~cpn/base/button'

export default function Input() {
  return (
    <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <button className="flex gap-x-2 items-center py-1 px-3 rounded-lg bg-white-pure">
          <span className="text-base" role="img">
            ☕️
          </span>
          <span className="text-sm font-medium">coffee</span>
          <Icon icon="majesticons:chevron-down-line" className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-col gap-y-2 py-6 px-4 rounded-lg bg-white-pure">
        <div className="flex flex-1 justify-between items-center">
          <input
            className="outline-none flex-1 text-2xl font-medium text-[#343433]"
            value={1}
          />
          <span className="text-sm text-[#848281]">&#8776; 2.08 USD</span>
        </div>
        <div className="flex flex-1 justify-between items-center">
          <span className="text-[#848281] text-sm">Balance: 800 coffee</span>
          <div className="flex gap-x-2">
            <Button appearance="text" size="xs">
              1
            </Button>
            <Button appearance="text" size="xs">
              2
            </Button>
            <Button appearance="text" size="xs">
              5
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
