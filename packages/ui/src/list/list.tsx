import React, { useCallback, useRef } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import clsx from 'clsx'

export type ListRenderItem<Item> = (
  item: Item,
  index?: number,
) => React.ReactNode

interface ListProps<Item> {
  rootClassName?: string
  rootStyle?: React.CSSProperties
  viewportClassName?: string
  viewportStyle?: React.CSSProperties
  listClassName?: string
  listStyle?: React.CSSProperties
  data: readonly Item[]
  renderItem: ListRenderItem<Item>
  onEndReached?: () => void
  onEndReachedThreshold?: number
}

export default function List<Item extends NonNullable<object> | string>({
  rootClassName,
  rootStyle,
  viewportClassName,
  viewportStyle,
  listClassName,
  listStyle,
  data,
  renderItem,
  onEndReached,
  onEndReachedThreshold,
}: ListProps<Item>) {
  const endReachedFired = useRef(false)

  const handleScroll = useCallback<React.UIEventHandler<HTMLDivElement>>(
    (event) => {
      if (!onEndReached) return
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
      const threshold = onEndReachedThreshold || 0
      // If we reach the end of the list, fire the end reached event.
      // The end reached event fires only once when scroll position is over the threshold
      if (scrollTop + clientHeight + threshold >= scrollHeight) {
        if (!endReachedFired.current) {
          onEndReached()
          endReachedFired.current = true
        }
      } else if (endReachedFired.current) {
        endReachedFired.current = false
      }
    },
    [onEndReached, onEndReachedThreshold],
  )

  return (
    <ScrollArea.Root
      className={clsx('ui-overflow-hidden', rootClassName)}
      style={rootStyle}
    >
      <ScrollArea.Viewport
        className={clsx('ui-w-full ui-h-full ui-border-inherit', viewportClassName)}
        onScroll={handleScroll}
        style={viewportStyle}
      >
        <div className={clsx('ui-space-y-1', listClassName)} style={listStyle}>
          {data.map(renderItem)}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="ui-flex ui-select-none ui-touch-none ui-p-0.5 ui-bg-gray-200 ui-transition-colors ui-w-2 hover:ui-bg-gray-300"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="ui-flex-1 ui-bg-gray-600 ui-rounded-lg ui-relative before:ui-content-[''] before:ui-absolute before:ui-w-full before:ui-h-full before:ui-min-w-[44px] before:ui-min-h-[44px] before:ui-top-1/2 before:ui-left-1/2 before:ui--translate-x-1/2 before:ui--translate-y-1/2" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ui-bg-gray-300" />
    </ScrollArea.Root>
  )
}
