import clsx from 'clsx'
import type { Item } from './sidebar-item'
import SidebarItem from './sidebar-item'

export interface Break {
  type: 'break'
}

interface SidebarItemListProps {
  items: (Item | Break)[]
  expanded: boolean
}

export default function SidebarItemList({
  items,
  expanded,
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
              className={clsx('ui-px-4 ui-py-2 ui-border-neutral-200', {
                'ui-border-t': index > 0,
              })}
              key={itemGroup[0].title}
            >
              {itemGroup.map((item) => (
                <SidebarItem
                  key={item.title}
                  {...{ item, expanded }}
                  className="ui-h-10"
                />
              ))}
            </div>
          ) : null,
        )}
    </>
  )
}
