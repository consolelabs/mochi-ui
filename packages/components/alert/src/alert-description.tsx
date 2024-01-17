import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { alert } from '@mochi-ui/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type AlertDescriptionProps = ComponentPropsWithoutRef<'p'> & {
  asChild?: boolean
}

const AlertDescription = forwardRef<ElementRef<'p'>, AlertDescriptionProps>(
  (props, ref) => {
    const { asChild, className, ...restProps } = props
    const { layout, scheme, size } = useAlertContext()

    const Component = asChild ? Slot : 'p'

    return (
      <Component
        ref={ref}
        className={alert.alertDescriptionCva({
          scheme,
          size,
          layout,
          className,
        })}
        data-size={size}
        data-scheme={scheme}
        data-layout={layout}
        {...restProps}
      />
    )
  },
)
AlertDescription.displayName = 'AlertDescription'

export { AlertDescription, type AlertDescriptionProps }
