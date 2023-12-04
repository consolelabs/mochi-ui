import { ComponentPropsWithRef, forwardRef } from 'react'
import { alert } from '@mochi-ui/theme'
import { CloseLgLine } from '@mochi-ui/icons'
import { Slot } from '@radix-ui/react-slot'
import { IconButton, IconButtonProps } from '@mochi-ui/icon-button'
import type * as Polymorphic from '@mochi-ui/polymorphic'
import { useAlertContext } from './context'

type PolymorphicAlertIconButton = Polymorphic.ForwardRefComponent<
  'button',
  IconButtonProps & {
    asChild?: boolean
  }
>

type AlertCloseButtonProps = ComponentPropsWithRef<PolymorphicAlertIconButton>

const AlertCloseButton = forwardRef((props, ref) => {
  const { scheme, layout, size } = useAlertContext()
  const { className, asChild, ...restProps } = props

  if (asChild)
    return (
      <Slot
        className={alert.alertIconCloseCva({
          scheme,
          layout,
          size,
          className,
        })}
        data-scheme={scheme}
        data-layout={layout}
        data-size={size}
      />
    )

  return (
    <IconButton
      ref={ref}
      {...restProps}
      size="sm"
      variant="link"
      color={scheme}
      className={alert.alertIconCloseCva({
        scheme,
        layout,
        size,
        className,
      })}
      data-scheme={scheme}
      data-layout={layout}
      data-size={size}
    >
      <CloseLgLine />
    </IconButton>
  )
}) as PolymorphicAlertIconButton
AlertCloseButton.displayName = 'AlertCloseButton'

export {
  type PolymorphicAlertIconButton,
  type AlertCloseButtonProps,
  AlertCloseButton,
}
