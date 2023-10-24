import { Icon } from '@iconify/react'
import React from 'react'

export default function ToastLoading({
  text = 'Loading...',
}: {
  text?: string
}) {
  return (
    <div className="flex gap-x-3 items-start p-3 pr-4 w-full bg-white rounded-lg shadow-full">
      <div className="flex items-baseline w-6 h-6">
        &#8203;
        <Icon
          icon="ei:spinner"
          className="flex-shrink-0 w-6 h-6 animate-spin"
        />
      </div>
      <span className="my-auto text-sm font-semibold break-all">{text}</span>
    </div>
  )
}
