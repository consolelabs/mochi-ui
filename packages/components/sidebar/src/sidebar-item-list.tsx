import clsx from 'clsx'
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
              className={clsx(
                'px-4 py-2 border-neutral-200 flex flex-col gap-y-0.5',
                {
                  'border-t': index > 0,
                },
              )}
              key={itemGroup[0].title}
            >
              {itemGroup.map((item) =>
                expanded ? (
                  <SidebarItem
                    key={item.title}
                    {...{ item, expanded }}
                    className="h-10"
                    selected={isSelected?.(item)}
                  />
                ) : (
                  <Tooltip
                    arrow="right-center"
                    className="z-10"
                    content={item.title}
                    key={item.title}
                  >
                    <SidebarItem
                      {...{ item, expanded }}
                      className="h-10"
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
