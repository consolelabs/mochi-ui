import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { alert } from '@mochi-ui/theme'
import { CloseLgLine } from '@mochi-ui/icons'
import { Slot } from '@radix-ui/react-slot'
import { IconButton } from '@mochi-ui/icon-button'
import { useAlertContext } from './context'

type AlertCloseButtonProps = Omit<
  ComponentPropsWithoutRef<typeof IconButton>,
  'label'
> & {
  asChild?: boolean
}

const AlertCloseButton = forwardRef<
  ElementRef<typeof IconButton>,
  AlertCloseButtonProps
>((props, ref) => {
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
      label="Close"
      data-scheme={scheme}
      data-layout={layout}
      data-size={size}
    >
      <CloseLgLine />
    </IconButton>
  )
})
AlertCloseButton.displayName = 'AlertCloseButton'

export { type AlertCloseButtonProps, AlertCloseButton }
