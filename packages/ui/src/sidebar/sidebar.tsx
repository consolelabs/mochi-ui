import { cva } from 'class-variance-authority'
import React, { useState } from 'react'
import clsx from 'clsx'
import IconSidebarArrow from '../icons/components/icon-sidebar-arrow'
import type { Item } from './sidebar-item'
import type { Break } from './sidebar-item-list'
import SidebarItemList from './sidebar-item-list'

const sidebar = cva(
  ['ui-bg-white ui-relative ui-h-full ui-border-r ui-border-neutral-200'],
  {
    variants: {
      expanded: {
        true: 'ui-w-64',
        false: 'ui-w-18',
      },
    },
  },
)

interface HeaderProps {
  expanded?: boolean
}

interface SidebarProps {
  Header?: (props: HeaderProps) => React.ReactNode
  headerItems?: (Item | Break)[]
  footerItems?: (Item | Break)[]
  className?: string
}

export default function Sidebar({
  Header = () => null,
  headerItems = [],
  footerItems = [],
  className,
}: SidebarProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className={sidebar({ className, expanded })}>
      <div className="ui-flex ui-flex-col ui-justify-between ui-h-full ui-overflow-x-hidden ui-overflow-y-auto">
        <div>
          <Header expanded={expanded} />
          <SidebarItemList expanded={expanded} items={headerItems} />
        </div>
        <div className="ui-border-t ui-border-neutral-200">
          <SidebarItemList expanded={expanded} items={footerItems} />
          {Boolean(expanded) && (
            <div className="ui-flex ui-px-4 ui-border-t ui-border-neutral-200">
              <div className="ui-text-xs ui-text-neutral-600 ui-tracking-tight ui-p-2">
                Version 1.0.0
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        className="ui-absolute ui-top-4 ui--right-5 ui-bg-white ui-border ui-border-neutral-200 ui-rounded-r-lg ui-w-5 ui-h-11 ui-flex ui-justify-center ui-items-center"
        onClick={() => setExpanded(!expanded)}
        type="button"
      >
        <IconSidebarArrow
          className={clsx('ui-text-neutral-800', { 'ui-rotate-180': expanded })}
          height={25}
          width={13}
        />
      </button>
    </div>
  )
}
