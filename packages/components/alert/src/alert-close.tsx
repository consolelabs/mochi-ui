import { forwardRef } from 'react'
import { alert } from '@consolelabs/theme'
import { CloseLgLine } from '@consolelabs/icons'
import { Slot } from '@radix-ui/react-slot'
import { IconButton, IconButtonProps } from '@consolelabs/icon-button'
import type * as Polymorphic from '@consolelabs/polymorphic'
import { useAlertContext } from './context'

type AlertCloseButtonProps = IconButtonProps & {
  asChild?: boolean
}

type PolymorphicAlertIconButton = Polymorphic.ForwardRefComponent<
  'button',
  AlertCloseButtonProps
>

const AlertCloseButton = forwardRef((props, ref) => {
  const { scheme, variant, size, responsive } = useAlertContext()
  const { className, asChild, ...restProps } = props

  if (asChild)
    return (
      <Slot
        className={alert.alertIconCloseCva({
          scheme,
          variant,
          size,
          responsive,
          className,
        })}
        data-scheme={scheme}
        data-responsive={responsive}
        data-size={size}
        data-variant={variant}
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
        variant,
        size,
        responsive,
        className,
      })}
      data-scheme={scheme}
      data-responsive={responsive}
      data-size={size}
      data-variant={variant}
    >
      <CloseLgLine />
    </IconButton>
  )
}) as PolymorphicAlertIconButton

export {
  type PolymorphicAlertIconButton,
  type AlertCloseButtonProps,
  AlertCloseButton,
}
