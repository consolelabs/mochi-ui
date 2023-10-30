import { cva } from 'class-variance-authority'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import IconSidebarArrow from '../icons/components/icon-sidebar-arrow'
import type { Item } from './sidebar-item'
import type { Break } from './sidebar-item-list'
import SidebarItemList from './sidebar-item-list'

const sidebar = cva(
  ['group bg-white relative h-full border-r border-neutral-200 transition-all'],
  {
    variants: {
      expanded: {
        true: 'w-fit min-w-64 max-w-xs',
        false: 'w-18',
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
      <div className="flex flex-col justify-between h-full overflow-x-hidden overflow-y-auto">
        <div>
          {Header ? <Header expanded={expanded} /> : null}
          <div className="pt-2">
            <SidebarItemList
              {...{ expanded, isSelected }}
              items={headerItems}
            />
          </div>
        </div>
        <div className="border-t border-neutral-200">
          <SidebarItemList {...{ expanded, isSelected }} items={footerItems} />
          {Boolean(expanded) && (
            <div className="flex px-4 border-t border-neutral-200">
              <div className="p-2 text-xs tracking-tight text-neutral-600">
                Version 1.0.0
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="absolute top-0 hidden w-10 h-full -right-10 group-hover:block">
        <button
          className="items-center justify-center w-5 mt-4 bg-white border rounded-r-lg border-neutral-200 h-11"
          onClick={() => setExpanded(!expanded)}
          type="button"
        >
          <IconSidebarArrow
            className={clsx('text-neutral-800', { 'rotate-180': expanded })}
            height={25}
            width={13}
          />
        </button>
      </div>
    </div>
  )
}
