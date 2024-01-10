import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { alert } from '@mochi-ui/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type AlertTitleProps = ComponentPropsWithoutRef<'h3'> & { asChild?: boolean }

const AlertTitle = forwardRef<ElementRef<'h3'>, AlertTitleProps>(
  (props, ref) => {
    const { className, asChild, ...restProps } = props
    const { scheme, layout, size } = useAlertContext()

    const Component = asChild ? Slot : 'h3'
    return (
      <Component
        data-scheme={scheme}
        data-layout={layout}
        data-size={size}
        className={alert.alertTitleCva({
          scheme,
          layout,
          size,
          className,
        })}
        ref={ref}
        {...restProps}
      />
    )
  },
)
AlertTitle.displayName = 'AlertTitle'

export { AlertTitle, type AlertTitleProps }
