import { alert, alertActionGroupStyleProps } from '@mochi-ui/theme'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type AlertActionGroupProps = ComponentPropsWithoutRef<'div'> & {
  asChild?: boolean
} & alertActionGroupStyleProps

const AlertActionGroup = forwardRef<ElementRef<'div'>, AlertActionGroupProps>(
  (props, ref) => {
    const { className, asChild, layout: layoutProp, ...restProps } = props
    const { layout: layoutContext, size, scheme } = useAlertContext()

    const Component = asChild ? Slot : 'div'
    const layout = layoutProp ?? layoutContext

    return (
      <Component
        data-layout={layout}
        data-scheme={scheme}
        data-size={size}
        className={alert.alertActionGroupCva({ layout, className })}
        ref={ref}
        {...restProps}
      />
    )
  },
)
AlertActionGroup.displayName = 'AlertActionGroup'

export { AlertActionGroup }
export type { AlertActionGroupProps }
