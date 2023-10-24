import { Icon } from '@iconify/react'

export default function MoneySource() {
  return (
    <div className="flex gap-x-3 items-center py-3 px-2 bg-blue-50 rounded-lg">
      <img className="flex-shrink-0 w-6 h-6" src="/logo.png" alt="" />
      <div className="flex flex-col flex-1 justify-between">
        <span className="text-sm font-medium text-blue-700">Mochi Wallet</span>
        <span className="text-xs text-blue-500">baddeed</span>
      </div>
      <span className="flex-shrink-0 text-sm font-medium text-blue-700">
        $2,511.53
      </span>
      <Icon icon="majesticons:chevron-down-line" className="w-4 h-4" />
    </div>
  )
}
