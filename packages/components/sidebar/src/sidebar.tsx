import { useEffect, useState } from 'react'
import { SidebarArrowLine } from '@mochi-ui/icons'
import { sidebar } from '@mochi-ui/theme'
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
  expanded?: boolean
  version?: string
}

const {
  sidebarCva,
  sidebarContentClsx,
  sidebarItemsWrapperClsx,
  sidebarFooterItemsWrapperClsx,
  sidebarFooterVersionWrapperClsx,
  sidebarFooterVersionTextClsx,
  sidebarToggleButtonClsx,
  sidebarToggleButtonInnerClsx,
  sidebarToggleArrowClsx,
} = sidebar

export default function Sidebar({
  headerItems = [],
  footerItems = [],
  className,
  isSelected,
  Header,
  expanded: expandedProp,
  version = '1.0.0',
}: SidebarProps) {
  const [expanded, setExpanded] = useState(expandedProp ?? true)

  useEffect(() => {
    const onResize = () => {
      if (expandedProp === undefined) {
        setExpanded(window.innerWidth > 1000)
      }
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [expandedProp])

  return (
    <div
      data-testid="sidebar-content"
      className={sidebarCva({ className, expanded })}
    >
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
                Version {version}
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        type="button"
        data-testid="collapsible-button"
        className={sidebarToggleButtonClsx()}
      >
        <div className={sidebarToggleButtonInnerClsx()}>
          <SidebarArrowLine
            className={sidebarToggleArrowClsx({ expanded })}
            height={25}
            width={13}
          />
        </div>
      </button>
    </div>
  )
}

export { type SidebarProps, Item, Break }
