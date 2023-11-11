import React, { useCallback, useRef } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { list } from '@consolelabs/theme'

const {
  listWrapperClsx,
  listViewportClsx,
  listViewportContentClsx,
  listScrollbarClsx,
  listThumbClsx,
  listCornerClsx,
} = list

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
  ListEmpty?: React.ReactNode
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
  ListEmpty,
  onEndReached,
  onEndReachedThreshold = 0,
}: ListProps<Item>) {
  const endReachedFired = useRef(false)

  const handleScroll = useCallback<React.UIEventHandler<HTMLDivElement>>(
    (event) => {
      if (!onEndReached) return
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
      const threshold = onEndReachedThreshold
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
      className={listWrapperClsx({ className: rootClassName })}
      style={rootStyle}
    >
      <ScrollArea.Viewport
        className={listViewportClsx({ className: viewportClassName })}
        onScroll={handleScroll}
        style={viewportStyle}
      >
        <ul
          className={listViewportContentClsx({ className: listClassName })}
          style={listStyle}
        >
          {data.length ? data.map(renderItem) : ListEmpty}
        </ul>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className={listScrollbarClsx()}
        orientation="vertical"
      >
        <ScrollArea.Thumb className={listThumbClsx()} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className={listCornerClsx()} />
    </ScrollArea.Root>
  )
}

export { type ListProps }
