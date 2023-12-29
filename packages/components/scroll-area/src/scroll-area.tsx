import { ElementRef, forwardRef } from 'react'
import { scrollArea } from '@mochi-ui/theme'
import {
  Corner,
  Root,
  ScrollAreaCornerProps,
  ScrollAreaProps,
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

const ScrollArea = forwardRef<ElementRef<typeof Root>, ScrollAreaProps>(
  ({ className, ...props }, ref) => (
    <Root
      {...props}
      ref={ref}
      className={scrollAreaRootClsx({
        className,
      })}
    />
  ),
)

ScrollArea.displayName = 'ScrollArea'

const ScrollAreaViewport = forwardRef<
  ElementRef<typeof Viewport>,
  ScrollAreaViewportProps
>(({ className, ...props }, ref) => (
  <Viewport
    ref={ref}
    className={scrollAreaViewportClsx({ className })}
    {...props}
  />
))

ScrollAreaViewport.displayName = 'ScrollAreaViewport'

const ScrollAreaScrollbar = forwardRef<
  ElementRef<typeof Scrollbar>,
  ScrollAreaScrollbarProps
>(({ className, ...props }, ref) => (
  <Scrollbar
    ref={ref}
    className={scrollAreaScrollbarClsx({
      className,
      orientation: props.orientation,
    })}
    {...props}
  />
))

ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar'

const ScrollAreaThumb = forwardRef<
  ElementRef<typeof Thumb>,
  ScrollAreaThumbProps
>(({ className, ...props }, ref) => (
  <Thumb ref={ref} className={scrollAreaThumbClsx({ className })} {...props} />
))

ScrollAreaThumb.displayName = 'ScrollAreaThumb'

const ScrollAreaCorner = forwardRef<
  ElementRef<typeof Corner>,
  ScrollAreaCornerProps
>(({ className, ...prosp }, ref) => (
  <Corner
    ref={ref}
    className={scrollAreaCornerClsx({ className })}
    {...prosp}
  />
))

ScrollAreaCorner.displayName = 'ScrollAreaCorner'

export {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaCorner,
  ScrollAreaThumb,
  ScrollAreaScrollbar,
}
export type {
  ScrollAreaProps,
  ScrollAreaViewportProps,
  ScrollAreaCornerProps,
  ScrollAreaThumbProps,
  ScrollAreaScrollbarProps,
}
