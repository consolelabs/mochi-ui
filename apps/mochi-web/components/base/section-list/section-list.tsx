import {
  ScrollArea,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@mochi-ui/core'
import clsx from 'clsx'
import { useCallback, useRef } from 'react'

type DefaultSection = Record<string, any>

interface SectionBase<Item> {
  data: readonly Item[]
  key?: string | undefined
}

type SectionListData<Item, Section = DefaultSection> = SectionBase<Item> &
  Section

type SectionListRenderItem<Item, Section = DefaultSection> = (
  item: Item,
  section: SectionListData<Item, Section>,
  index?: number,
) => React.ReactNode

type SectionListRenderLoader = () => React.ReactNode

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
  renderLoader?: SectionListRenderLoader
  loading?: boolean
}

export const SectionList = <
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
  loading = false,
  renderLoader,
}: SectionListProps<Item, Section>) => {
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

  let content = sections.length
    ? sections.map((section, sectionIndex) => {
        return (
          <ul className="space-y-1" key={(section.key || '') + sectionIndex}>
            {renderSectionHeader(section, sectionIndex)}
            {section.data.map((item, itemIndex) =>
              renderItem(item, section, itemIndex),
            )}
          </ul>
        )
      })
    : SectionEmpty

  if (loading) {
    content = renderLoader?.() ?? ''
  }

  return (
    <ScrollArea className={rootClassName} style={rootStyle}>
      <ScrollAreaViewport
        className={viewportClassName}
        style={viewportStyle}
        onScroll={handleScroll}
        {...{ 'data-testid': 'section-list-viewport' }}
      >
        <div className={clsx('space-y-1', listClassName)} style={listStyle}>
          {content}
        </div>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  )
}
