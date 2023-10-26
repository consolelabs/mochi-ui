import { cva } from 'class-variance-authority'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import IconSidebarArrow from '../icons/components/icon-sidebar-arrow'
import type { Item } from './sidebar-item'
import type { Break } from './sidebar-item-list'
import SidebarItemList from './sidebar-item-list'

const sidebar = cva(
  [
    'ui-group ui-bg-white ui-relative ui-h-full ui-border-r ui-border-neutral-200 ui-transition-all',
  ],
  {
    variants: {
      expanded: {
        true: 'ui-w-fit ui-min-w-64 ui-max-w-xs',
        false: 'ui-w-18',
      },
    },
  },
)

interface HeaderProps {
  expanded?: boolean
}

interface SidebarProps {
  Header?: (props: HeaderProps) => JSX.Element
  headerItems?: (Item | Break)[]
  footerItems?: (Item | Break)[]
  className?: string
  isSelected?: (item: Item) => boolean
}

export default function Sidebar({
  headerItems = [],
  footerItems = [],
  className,
  isSelected,
  Header,
}: SidebarProps) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const onResize = () => {
      setExpanded(window.innerWidth > 1000)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className={sidebar({ className, expanded })}>
      <div className="ui-flex ui-flex-col ui-justify-between ui-h-full ui-overflow-x-hidden ui-overflow-y-auto">
        <div>
          {Header ? <Header expanded={expanded} /> : null}
          <div className="ui-pt-2">
            <SidebarItemList
              {...{ expanded, isSelected }}
              items={headerItems}
            />
          </div>
        </div>
        <div className="ui-border-t ui-border-neutral-200">
          <SidebarItemList {...{ expanded, isSelected }} items={footerItems} />
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
        className="ui-absolute ui-top-4 ui--right-5 ui-bg-white ui-border ui-border-neutral-200 ui-rounded-r-lg ui-w-5 ui-h-11 ui-justify-center ui-items-center ui-hidden group-hover:ui-flex"
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
