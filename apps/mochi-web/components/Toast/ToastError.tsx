import { Icon } from '@iconify/react'
import React from 'react'

export default function ToastError({
  message,
  description,
}: {
  message: React.ReactNode
  description?: React.ReactNode
}) {
  return (
    <div className="flex gap-x-3 items-start p-3 pr-4 bg-white rounded-lg shadow-full">
      <div className="flex items-baseline">
        &#8203;
        <Icon
          icon="tabler:square-rounded-x-filled"
          className="flex-shrink-0 w-5 h-5 text-dashboard-red-1"
        />
      </div>
      <div className="text-dashboard-red-1">
        <div className="text-sm font-semibold">{message}</div>
        <div className="text-xs font-medium">{description}</div>
      </div>
    </div>
  )
}
