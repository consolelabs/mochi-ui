import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { AlertBodyStyleProps, alert } from '@mochi-ui/theme'
import { useAlertContext } from './context'

type AlertBodyProps = ComponentPropsWithoutRef<'div'> & {
  asChild?: boolean
} & AlertBodyStyleProps

const AlertBody = forwardRef<ElementRef<'div'>, AlertBodyProps>(
  (props, ref) => {
    const {
      asChild,
      className,
      layout: layoutProp,
      children,
      ...restProps
    } = props
    const { layout: layoutContext, scheme, size } = useAlertContext()

    const layout = layoutProp ?? layoutContext
    const Component = asChild ? Slot : 'div'
    const passProps = asChild ? {} : { ref, ...restProps }

    return (
      <Component
        ref={ref}
        data-layout={layout}
        data-scheme={scheme}
        data-size={size}
        className={alert.alertBodyCva({ layout, className })}
        {...passProps}
      >
        {children}
      </Component>
    )
  },
)
AlertBody.displayName = 'AlertBody'

export { AlertBody }
export type { AlertBodyProps }
