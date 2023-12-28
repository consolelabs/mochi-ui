import { PropsWithChildren, forwardRef } from 'react'
import { scrollArea } from '@mochi-ui/theme'
import {
  Corner,
  Root,
  ScrollAreaCornerProps,
  ScrollAreaProps as ScrollAreaRootProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaViewportProps,
  Scrollbar,
  Thumb,
  Viewport,
} from '@radix-ui/react-scroll-area'

const {
  scrollAreaRootClsx,
  scrollAreaViewportClsx,
  scrollAreaScrollbarClsx,
  scrollAreaThumbClsx,
  scrollAreaCornerClsx,
} = scrollArea

interface ScrollAreaProps extends PropsWithChildren {
  rootProps?: ScrollAreaRootProps
  viewportProps?: ScrollAreaViewportProps
  scrollbarProps?: ScrollAreaScrollbarProps
  thumbProps?: ScrollAreaThumbProps
  cornerProps?: ScrollAreaCornerProps
  scrollbars?: 'vertical' | 'horizontal' | 'both'
}

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      children,
      rootProps,
      viewportProps,
      scrollbarProps,
      thumbProps,
      cornerProps,
      scrollbars = 'both',
    },
    ref,
  ) => {
    return (
      <Root
        {...rootProps}
        ref={ref}
        className={scrollAreaRootClsx({
          className: rootProps?.className,
        })}
      >
        <Viewport
          {...viewportProps}
          className={scrollAreaViewportClsx({
            className: viewportProps?.className,
          })}
        >
          {children}
        </Viewport>
        {scrollbars !== 'horizontal' && (
          <Scrollbar
            {...scrollbarProps}
            className={scrollAreaScrollbarClsx({
              className: scrollbarProps?.className,
              orientation: 'vertical',
            })}
            orientation="vertical"
          >
            <Thumb
              {...thumbProps}
              className={scrollAreaThumbClsx({
                className: thumbProps?.className,
              })}
            />
          </Scrollbar>
        )}
        {scrollbars !== 'vertical' && (
          <Scrollbar
            {...scrollbarProps}
            className={scrollAreaScrollbarClsx({
              className: scrollbarProps?.className,
              orientation: 'horizontal',
            })}
            orientation="horizontal"
          >
            <Thumb
              {...thumbProps}
              className={scrollAreaThumbClsx({
                className: thumbProps?.className,
              })}
            />
          </Scrollbar>
        )}
        <Corner
          {...cornerProps}
          className={scrollAreaCornerClsx({
            className: cornerProps?.className,
          })}
        />
      </Root>
    )
  },
)

ScrollArea.displayName = 'ScrollArea'

export { ScrollArea, type ScrollAreaProps }
