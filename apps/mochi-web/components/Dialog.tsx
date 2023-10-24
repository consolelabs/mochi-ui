import { Icon } from '@iconify/react'

type Props = {
  title: React.ReactNode
  children: React.ReactNode
  close: () => void
}

export default function Dialog({ children, close, title }: Props) {
  return (
    <div className="flex overflow-hidden flex-col rounded-xl min-w-[380px] max-w-[420px]">
      <div className="px-6 py-3 flex items-center justify-between bg-[#faf9f7] border-b border-gray-200">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <button
          type="button"
          onClick={close}
          className="p-1 w-6 h-6 rounded-full border border-gray-300 bg-white-pure"
        >
          <Icon icon="octicon:x-12" className="w-full h-full text-gray-400" />
        </button>
      </div>
      <div className="py-4 px-6 bg-white-pure">{children}</div>
    </div>
  )
}
