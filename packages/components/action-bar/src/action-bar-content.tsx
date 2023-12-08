import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Alert } from '@mochi-ui/alert'
import { actionBar } from '@mochi-ui/theme'

type ActionBarContentProps = ComponentPropsWithoutRef<typeof Alert> &
  Omit<
    ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
    | 'side'
    | 'collisionBoundary'
    | 'arrowPadding'
    | 'collisionPadding'
    | 'hideWhenDetached'
    | 'sticky'
  > & {
    side?: 'top' | 'bottom'
    anchorClassName?: string
  }

const ActionBarContent = forwardRef<
  ElementRef<typeof Alert>,
  ActionBarContentProps
>((props, ref) => {
  const {
    children,
    className,
    shadow,
    outline,
    paddingSize,
    onInteractOutside,
    layout,
    size,
    side = 'top',
    sideOffset,
    scheme,
    anchorClassName,
    ...passProps
  } = props

  const alertProps = {
    children,
    className,
    outline,
    paddingSize,
    shadow,
    layout,
    size,
    scheme,
  }

  return (
    <PopoverPrimitive.Anchor
      className={actionBar.anchorCva({ className: anchorClassName })}
    >
      <PopoverPrimitive.Content
        side={side}
        sideOffset={sideOffset}
        align="center"
        {...passProps}
        onInteractOutside={(e) => {
          e.preventDefault()
          onInteractOutside?.(e)
        }}
      >
        <Alert
          {...alertProps}
          ref={ref}
          className={actionBar.contentCva({ className })}
        />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Anchor>
  )
})

export { type ActionBarContentProps }
export { ActionBarContent }
