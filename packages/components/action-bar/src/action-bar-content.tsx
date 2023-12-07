import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Alert } from '@mochi-ui/alert'
import { actionBar } from '@mochi-ui/theme'

type ActionBarContentProps = ComponentPropsWithoutRef<typeof Alert> &
  Omit<
    ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
    | 'side'
    | 'sideOffset'
    | 'collisionBoundary'
    | 'arrowPadding'
    | 'collisionPadding'
    | 'hideWhenDetached'
    | 'sticky'
  >

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
    scheme,
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
    <PopoverPrimitive.Anchor className={actionBar.anchorCva()}>
      <PopoverPrimitive.Content
        side="top"
        sideOffset={0}
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
