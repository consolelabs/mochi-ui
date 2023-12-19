import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { popover } from '@mochi-ui/theme'

const { popoverContentClsx } = popover

type PopoverProps = typeof PopoverPrimitive.Root
type PopoverTriggerProps = typeof PopoverPrimitive.Trigger
type PopoverCloseProps = typeof PopoverPrimitive.Close

const Popover = PopoverPrimitive.Root
const PopoverClose = PopoverPrimitive.Close
const PopoverAnchor = PopoverPrimitive.Anchor
const PopoverPortal = PopoverPrimitive.Portal

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Trigger
    ref={ref}
    className={popover.popoverTriggerClsx({ className })}
    {...props}
  />
))

PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName

type PopoverContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
>

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Content
    align={align}
    className={popoverContentClsx({ className })}
    ref={ref}
    sideOffset={sideOffset}
    {...props}
  />
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverAnchor,
  PopoverPortal,
  type PopoverContentProps,
  type PopoverProps,
  type PopoverTriggerProps,
  type PopoverCloseProps,
}
