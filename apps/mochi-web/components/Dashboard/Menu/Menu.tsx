import clsx from 'clsx'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export type MenuItem = {
  id: string
  icon?: React.ReactNode
  text: string
  onClick?: () => void
  url?: string
  subItems?: { text: string; url?: string; onClick?: () => void }[]
}

type Props = {
  items: [string, MenuItem[]][]
  activeId?: string
  activeIdx?: number
  onClick?: (id: string, idx?: number) => void
}

export const Menu = (props: Props) => {
  const { items, activeId, activeIdx = -1, onClick } = props

  return (
    <div className="flex flex-col">
      {items.map((group, groupIdx) => {
        return (
          <div className="flex flex-col gap-y-1" key={`user-menu-${groupIdx}`}>
            {groupIdx != 0 && !group[0] ? (
              <hr className="my-2 mx-auto w-[85%] bg-black/20 h-[2px]" />
            ) : (
              <span
                className={clsx(
                  'uppercase mx-5 text-[10px] font-semibold text-dashboard-gray-4',
                  {
                    'mt-6': groupIdx !== 0,
                  },
                )}
              >
                {group[0]}
              </span>
            )}
            <div className="flex flex-col gap-y-2">
              {group[1].map((item) => {
                return (
                  <div
                    key={`user-menu-item-${item.id}`}
                    className="flex flex-col"
                  >
                    <Link
                      href={item.url ?? '#'}
                      onClick={() => {
                        item.onClick?.()
                        onClick?.(item.id)
                      }}
                      className={clsx(
                        'transition duration-100 ease-in-out',
                        'flex gap-x-2 items-center py-2 px-5 pr-7 whitespace-nowrap text-dashboard-gray-4',
                      )}
                    >
                      <div
                        className={clsx({
                          'text-mochi': item.id === activeId,
                        })}
                      >
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {item.text}
                      </span>
                      {item.subItems ? (
                        item.id === activeId ? (
                          <Icon
                            icon="octicon:chevron-down-16"
                            className="ml-auto text-foreground"
                          />
                        ) : (
                          <Icon
                            icon="octicon:chevron-left-16"
                            className="ml-auto text-foreground"
                          />
                        )
                      ) : null}
                    </Link>
                    {item.subItems && item.id === activeId ? (
                      <div className="flex flex-col">
                        {item.subItems.map((si, i) => {
                          return (
                            <Link
                              href={si.url ?? '#'}
                              onClick={() => {
                                si.onClick?.()
                                onClick?.(item.id, i)
                              }}
                              key={`user-menu-subitem-${item.id}-${i}`}
                              className={clsx(
                                'transition duration-100 ease-in-out',
                                'flex gap-x-2 py-2 px-3 pl-0 ml-3 rounded-lg text-sm font-medium text-foreground',
                                {
                                  'bg-dashboard-gray-3':
                                    activeId === item.id && i === activeIdx,
                                },
                              )}
                            >
                              <div className="w-5 h-5" />
                              {si.text}
                            </Link>
                          )
                        })}
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
