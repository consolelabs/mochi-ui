import * as ModalPrimitive from '@radix-ui/react-dialog'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Alert } from '@mochi-ui/alert'

type ActionBarContentProps = ComponentPropsWithoutRef<typeof Alert> &
  ComponentPropsWithoutRef<typeof ModalPrimitive.Content>

export const ActionBarContent = forwardRef<
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
    ...passProps
  } = props

  const alertProps = {
    children,
    className,
    outline,
    paddingSize,
    shadow,
  }

  return (
    // <ModalPrimitive.Portal>
    <ModalPrimitive.Content
      asChild
      {...passProps}
      onInteractOutside={(e) => {
        e.preventDefault()
        // prevent closing modal when click outside
        return onInteractOutside?.(e)
      }}
    >
      <Alert {...alertProps} ref={ref} />
    </ModalPrimitive.Content>
    // </ModalPrimitive.Portal>
  )
})
