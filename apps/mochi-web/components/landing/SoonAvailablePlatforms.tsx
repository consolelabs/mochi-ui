import React from 'react'
import clsx from 'clsx'
import { IconApple, IconSlackColored } from '@consolelabs/icons'

export function SoonAvailablePlatforms({
  className = '',
}: {
  className?: string
}) {
  return (
    <div className={clsx('flex flex-col', className)}>
      <span className="text-sm font-normal text-neutral-600">
        Soon available on
      </span>
      <ul className="flex flex-wrap gap-3 mt-2">
        {[
          {
            text: (
              <div className="flex flex-col text-neutral-900">
                <span className="text-[9px] leading-[9px]">Coming soon</span>
                <span className="text-[15px] leading-[15px]">Slack</span>
              </div>
            ),
            icon: <IconSlackColored className="w-6 h-6" />,
          },
          {
            text: (
              <div className="flex flex-col text-neutral-900">
                <span className="text-[9px] leading-[9px]">Coming soon</span>
                <span className="text-[15px] leading-[15px]">App Store</span>
              </div>
            ),
            icon: <IconApple className="w-6 h-6" />,
          },
        ].map(({ text, icon }, i) => (
          <li
            key={`soon-available-on-${i}`}
            className="flex gap-x-1 items-center py-1.5 px-2.5"
          >
            {icon}
            {text}
          </li>
        ))}
      </ul>
    </div>
  )
}
