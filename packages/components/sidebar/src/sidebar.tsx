import { useEffect, useState } from 'react'
import { IconSidebarArrow } from '@consolelabs/icons'
import { sidebar } from '@consolelabs/theme'
import type { Item } from './sidebar-item'
import type { Break } from './sidebar-item-list'
import SidebarItemList from './sidebar-item-list'

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

const {
  sidebarCva,
  sidebarContentClsx,
  sidebarItemsWrapperClsx,
  sidebarFooterItemsWrapperClsx,
  sidebarFooterVersionWrapperClsx,
  sidebarFooterVersionTextClsx,
  sidebarToggleButtonClsx,
  sidebarToggleArrowClsx,
} = sidebar

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
    <div className={sidebarCva({ className, expanded })}>
      <div className={sidebarContentClsx()}>
        <div>
          {Header ? <Header expanded={expanded} /> : null}
          <div className={sidebarItemsWrapperClsx()}>
            <SidebarItemList
              {...{ expanded, isSelected }}
              items={headerItems}
            />
          </div>
        </div>
        <div className={sidebarFooterItemsWrapperClsx()}>
          <SidebarItemList {...{ expanded, isSelected }} items={footerItems} />
          {Boolean(expanded) && (
            <div className={sidebarFooterVersionWrapperClsx()}>
              <div className={sidebarFooterVersionTextClsx()}>
                Version 1.0.0
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        className={sidebarToggleButtonClsx()}
        onClick={() => setExpanded(!expanded)}
        type="button"
      >
        <IconSidebarArrow
          className={sidebarToggleArrowClsx({ expanded })}
          height={25}
          width={13}
        />
      </button>
    </div>
  )
}
