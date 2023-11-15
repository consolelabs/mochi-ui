import React, { useCallback, useRef } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { sectionList } from '@consolelabs/theme'

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

const {
  sectionListClsx,
  sectionListViewportClsx,
  sectionListContentWrapperClsx,
  sectionListContentListClsx,
  sectionListScrollbarClsx,
  sectionListThumbClsx,
  sectionListCornerClsx,
} = sectionList

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
      className={sectionListClsx({ className: rootClassName })}
      style={rootStyle}
    >
      <ScrollArea.Viewport
        className={sectionListViewportClsx({ className: viewportClassName })}
        onScroll={handleScroll}
        style={viewportStyle}
        data-testid="section-list-viewport"
      >
        <div
          className={sectionListContentWrapperClsx({
            className: listClassName,
          })}
          style={listStyle}
        >
          {sections.length
            ? sections.map((section, sectionIndex) => {
                return (
                  <ul
                    className={sectionListContentListClsx()}
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
        className={sectionListScrollbarClsx()}
        orientation="vertical"
      >
        <ScrollArea.Thumb className={sectionListThumbClsx()} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className={sectionListCornerClsx()} />
    </ScrollArea.Root>
  )
}

export { type SectionListProps }
