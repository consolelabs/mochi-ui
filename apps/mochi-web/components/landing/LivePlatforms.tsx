import {
  IconDiscordColored,
  IconMonitor,
  IconTelegramColored,
} from '@consolelabs/icons'
import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'

export function LivePlatforms({ className = '' }: { className?: string }) {
  return (
    <div className={clsx('flex flex-col', className)}>
      <span className="text-sm font-medium">Mochi is live on</span>
      <ul className="flex flex-col gap-2 mt-2 md:flex-row">
        {[
          {
            text: (
              <span className="text-sm font-medium transition group-hover:text-blue-700 text-neutral-900">
                Web
              </span>
            ),
            icon: <IconMonitor className="flex-shrink-0 w-4 h-4" />,
            href: '#',
          },
          {
            text: (
              <div className="flex flex-col -mr-1.5 text-neutral-900">
                <span className="text-[9px] leading-[9px]">Run on the</span>
                <span className="text-[15px] leading-[15px]">Discord</span>
              </div>
            ),
            icon: (
              <IconDiscordColored className="flex-shrink-0 -ml-1.5 w-6 h-6" />
            ),
            href: '#',
          },
          {
            text: (
              <div className="flex flex-col -mr-1.5 text-neutral-900">
                <span className="text-[9px] leading-[9px]">Run on the</span>
                <span className="text-[15px] leading-[15px]">Telegram</span>
              </div>
            ),
            icon: (
              <IconTelegramColored className="flex-shrink-0 -ml-1.5 w-6 h-6" />
            ),
            href: '#',
          },
        ].map(({ text, href, icon }, i) => (
          <li key={`mochi-is-live-on-${i}`} className="flex">
            <Link
              className="flex flex-1 gap-x-1.5 justify-center items-center py-2 px-4 rounded-lg border transition md:flex-initial hover:text-blue-700 hover:bg-blue-100 hover:border-blue-300 group border-neutral-300 bg-white-pure"
              href={href}
            >
              {icon}
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
