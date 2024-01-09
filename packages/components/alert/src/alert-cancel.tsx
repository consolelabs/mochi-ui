import { Button, ButtonProps } from '@mochi-ui/button'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { alert } from '@mochi-ui/theme'
import { useAlertContext } from './context'

type AlertCancelProps = ComponentPropsWithoutRef<typeof Button> &
  ButtonProps & {
    asChild?: boolean
  }

const AlertCancelButton = forwardRef<
  ElementRef<typeof Button>,
  AlertCancelProps
>((props, ref) => {
  const {
    className,
    variant: variantProp,
    color: colorProp,
    children,
    ...restProps
  } = props
  const { scheme, layout, size } = useAlertContext()
  const passProps = {
    variant:
      variantProp ?? layout === 'inline'
        ? ('link' as const) // Ensure type compatible, otherwise will be indicated as type string
        : ('solid' as const),
    color: colorProp ?? 'white',
    ...restProps,
  }
  return (
    <Button
      data-scheme={scheme}
      data-layout={layout}
      data-size={size}
      className={alert.alertCancelClsx({ className, layout })}
      ref={ref}
      {...passProps}
    >
      {children}
    </Button>
  )
})
AlertCancelButton.displayName = 'AlertCancelButton'

export { AlertCancelButton }
export type { AlertCancelProps }
