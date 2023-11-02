import React, { useCallback, useRef } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import clsx from 'clsx'

type DefaultSection = Record<string, any>

interface SectionBase<Item> {
  data: readonly Item[]
  key?: string | undefined
}

export type SectionListData<
  Item,
  Section = DefaultSection,
> = SectionBase<Item> & Section

export type SectionListRenderItem<Item, Section = DefaultSection> = (
  item: Item,
  section: SectionListData<Item, Section>,
  index?: number,
) => React.ReactNode

interface SectionListProps<Item, Section = DefaultSection> {
  rootClassName?: string
  rootStyle?: React.CSSProperties
  viewportClassName?: string
  viewportStyle?: React.CSSProperties
  listClassName?: string
  listStyle?: React.CSSProperties
  sections: readonly SectionListData<Item, Section>[]
  renderItem: SectionListRenderItem<Item, Section>
  renderSectionHeader: (
    section: SectionListData<Item, Section>,
    index?: number,
  ) => React.ReactNode
  SectionEmpty?: React.ReactNode
  onEndReached?: () => void
  onEndReachedThreshold?: number
}

export default function SectionList<
  Item = NonNullable<object> | string,
  Section = DefaultSection,
>({
  rootClassName,
  rootStyle,
  viewportClassName,
  viewportStyle,
  listClassName,
  listStyle,
  sections,
  renderItem,
  renderSectionHeader,
  SectionEmpty,
  onEndReached,
  onEndReachedThreshold = 0,
}: SectionListProps<Item, Section>) {
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
      className={clsx('overflow-hidden', rootClassName)}
      style={rootStyle}
    >
      <ScrollArea.Viewport
        className={clsx('w-full h-full border-inherit', viewportClassName)}
        onScroll={handleScroll}
        style={viewportStyle}
      >
        <div className={clsx('space-y-1', listClassName)} style={listStyle}>
          {sections.length
            ? sections.map((section, sectionIndex) => {
                return (
                  <ul
                    className="space-y-1"
                    key={(section.key || '') + sectionIndex}
                  >
                    {renderSectionHeader(section, sectionIndex)}
                    {section.data.map((item, itemIndex) =>
                      renderItem(item, section, itemIndex),
                    )}
                  </ul>
                )
              })
            : SectionEmpty}
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
