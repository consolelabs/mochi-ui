import { Button } from '@mochi-ui/button'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { alert } from '@mochi-ui/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type AlertConfirmProps = ComponentPropsWithoutRef<typeof Button> & {
  asChild?: boolean
}

const AlertConfirmButton = forwardRef<
  ElementRef<typeof Button>,
  AlertConfirmProps
>((props, ref) => {
  const {
    asChild,
    className,
    variant: variantProp,
    color: colorProp,
    children,
    ...restProps
  } = props
  const { scheme, layout, size } = useAlertContext()
  const Component = asChild ? Slot : Button
  const passProps = asChild
    ? {}
    : {
        variant: variantProp ?? 'solid',
        color: colorProp ?? scheme,
        ...restProps,
      }

  return (
    <Component
      data-size={size}
      data-scheme={scheme}
      data-layout={layout}
      className={alert.alertConfirmClsx({ layout, className })}
      ref={ref}
      {...passProps}
    >
      {children}
    </Component>
  )
})
AlertConfirmButton.displayName = 'AlertConfirmButton'

export { type AlertConfirmProps, AlertConfirmButton }
