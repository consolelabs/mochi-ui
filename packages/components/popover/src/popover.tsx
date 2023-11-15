import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { popover } from '@consolelabs/theme'

const { popoverContentClsx } = popover

type PopoverProps = typeof PopoverPrimitive.Root
type PopoverTriggerProps = typeof PopoverPrimitive.Trigger
type PopoverAnchorProps = typeof PopoverPrimitive.Anchor
type PopoverCloseProps = typeof PopoverPrimitive.Close

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverAnchor = PopoverPrimitive.Anchor
const PopoverClose = PopoverPrimitive.Close

type PopoverContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
>

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      className={popoverContentClsx({ className })}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverAnchor,
  type PopoverContentProps,
  type PopoverProps,
  type PopoverTriggerProps,
  type PopoverAnchorProps,
  type PopoverCloseProps,
}
