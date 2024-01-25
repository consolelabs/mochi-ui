import { DiscordColored, WebSolid, TelegramColored } from '@mochi-ui/icons'
import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'
import { DISCORD_LINK, TELEGRAM_LINK } from '~envs'

export function LivePlatforms({ className = '' }: { className?: string }) {
  return (
    <div className={clsx('flex flex-col', className)}>
      <span className="text-sm font-medium text-text-primary">
        Mochi is live on
      </span>
      <ul className="grid grid-cols-2 grid-rows-2 gap-2 mt-2">
        {[
          {
            wrapperClassname: 'col-span-2',
            className:
              'bg-neutral-800 text-primary-solid-fg border-transparent',
            text: (
              <div className="flex flex-col gap-y-px -mr-1.5">
                <span className="text-xs leading-[12px]">Run on the</span>
                <span className="text-base">Web</span>
              </div>
            ),
            icon: <WebSolid className="flex-shrink-0 w-8 h-8" />,
            href: '/',
          },
          {
            text: (
              <div className="flex flex-col gap-y-px -mr-1.5 text-neutral-outline-fg">
                <span className="text-xs leading-[12px]">Run on the</span>
                <span className="text-base">Discord</span>
              </div>
            ),
            icon: <DiscordColored className="flex-shrink-0 -ml-1.5 w-8 h-8" />,
            href: DISCORD_LINK,
          },
          {
            text: (
              <div className="flex flex-col gap-y-px -mr-1.5 text-neutral-outline-fg">
                <span className="text-xs leading-[12px]">Run on the</span>
                <span className="text-base">Telegram</span>
              </div>
            ),
            icon: <TelegramColored className="flex-shrink-0 -ml-1.5 w-8 h-8" />,
            href: TELEGRAM_LINK,
          },
        ].map(
          ({ text, href, icon, wrapperClassname = '', className = '' }, i) => (
            <li
              key={`mochi-is-live-on-${i}`}
              className={clsx('flex', wrapperClassname)}
            >
              <Link
                className={clsx(
                  'flex flex-1 gap-x-4 justify-center items-center py-2.5 pr-8 pl-6 rounded-xl border-2 transition md:min-h-0 min-h-[48px] group',
                  className,
                  {
                    'hover:border-primary-outline-border hover:bg-primary-outline-hover border-primary-outline-disable-border':
                      !className,
                  },
                )}
                href={href}
              >
                {icon}
                {text}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  )
}
