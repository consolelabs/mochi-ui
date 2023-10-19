import React from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import clsx from 'clsx'

interface ListProps<T> {
  rootClassName?: string
  rootStyle?: React.CSSProperties
  viewportClassName?: string
  viewportStyle?: React.CSSProperties
  listClassName?: string
  listStyle?: React.CSSProperties
  data: T[]
  renderItem: (item: T) => React.ReactNode
}

export default function List<T extends NonNullable<object> | string>({
  rootClassName,
  rootStyle,
  viewportClassName,
  viewportStyle,
  listClassName,
  listStyle,
  data,
  renderItem,
}: ListProps<T>) {
  return (
    <ScrollArea.Root
      className={clsx('overflow-hidden', rootClassName)}
      style={rootStyle}
    >
      <ScrollArea.Viewport
        className={clsx('w-full h-full border-inherit', viewportClassName)}
        style={viewportStyle}
      >
        <div className={clsx('space-y-1', listClassName)} style={listStyle}>
          {data.map(renderItem)}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-gray-200 transition-colors w-2 hover:bg-gray-300"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="flex-1 bg-gray-600 rounded-lg relative before:content-[''] before:absolute before:w-full before:h-full before:min-w-[44px] before:min-h-[44px] before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-gray-300" />
    </ScrollArea.Root>
  )
}
