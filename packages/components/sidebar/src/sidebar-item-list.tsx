import { sidebar } from '@consolelabs/theme'
import { Tooltip } from '@consolelabs/tooltip'
import type { Item } from './sidebar-item'
import SidebarItem from './sidebar-item'

export interface Break {
  type: 'break'
}

interface SidebarItemListProps {
  items: (Item | Break)[]
  expanded: boolean
  isSelected?: (item: Item) => boolean | undefined
}

const {
  sidebarItemListWrapperClsx,
  sidebarItemListItemClsx,
  sidebarItemListTooltipClsx,
} = sidebar

export default function SidebarItemList({
  items,
  expanded,
  isSelected,
}: SidebarItemListProps) {
  return (
    <>
      {items
        .reduce<Item[][]>(
          (prev, item) =>
            item.type === 'break'
              ? [...prev, []]
              : [...prev.slice(0, -1), [...prev[prev.length - 1], item]],
          [[]],
        )
        .map((itemGroup, index) =>
          itemGroup.length ? (
            <div
              className={sidebarItemListWrapperClsx({ index })}
              key={itemGroup[0].title}
            >
              {itemGroup.map((item) =>
                expanded ? (
                  <SidebarItem
                    key={item.title}
                    {...{ item, expanded }}
                    className={sidebarItemListItemClsx()}
                    selected={isSelected?.(item)}
                  />
                ) : (
                  <Tooltip
                    arrow="top-start"
                    className={sidebarItemListTooltipClsx()}
                    content={item.title}
                    key={item.title}
                  >
                    <SidebarItem
                      {...{ item, expanded }}
                      className={sidebarItemListItemClsx()}
                      selected={isSelected?.(item)}
                    />
                  </Tooltip>
                ),
              )}
            </div>
          ) : null,
        )}
    </>
  )
}
