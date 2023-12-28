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
import clsx from 'clsx'

interface Props {
  children?: React.ReactNode
  componentProps?: {
    root?: ScrollAreaProps
    viewport?: ScrollAreaViewportProps
    scrollbar?: ScrollAreaScrollbarProps
    thumb?: ScrollAreaThumbProps
    corner?: ScrollAreaCornerProps
  }
}

export const ScrollArea = ({ children, componentProps }: Props) => {
  return (
    <Root
      {...componentProps?.root}
      className={clsx('overflow-hidden', componentProps?.root?.className)}
    >
      <Viewport
        {...componentProps?.viewport}
        className={clsx(
          'w-full h-full border-inherit',
          componentProps?.viewport?.className,
        )}
      >
        {children}
      </Viewport>
      <Scrollbar
        {...componentProps?.scrollbar}
        className={clsx(
          'flex select-none touch-none p-0.5 bg-neutral-outline transition-colors w-2 hover:bg-neutral-outline-hover',
          componentProps?.scrollbar?.className,
        )}
        orientation="vertical"
      >
        <Thumb
          {...componentProps?.thumb}
          className={clsx(
            "flex-1 bg-neutral-solid rounded-lg relative before:content-[''] before:absolute before:w-full before:h-full before:min-w-[44px] before:min-h-[44px] before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2",
            componentProps?.thumb?.className,
          )}
        />
      </Scrollbar>
      <Corner
        {...componentProps?.corner}
        className={clsx(
          'bg-neutral-outline-hover',
          componentProps?.corner?.className,
        )}
      />
    </Root>
  )
}
