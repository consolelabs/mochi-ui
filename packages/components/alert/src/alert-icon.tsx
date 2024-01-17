import { InfoCircleOutlined, CheckCircleOutlined } from '@mochi-ui/icons'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { alert } from '@mochi-ui/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'
import { AlertProps } from './alert'

const getIcons = (scheme: NonNullable<AlertProps['scheme']>) => {
  if (scheme === 'success') return CheckCircleOutlined
  return InfoCircleOutlined
}

type AlertIconProps = ComponentPropsWithoutRef<'svg'> & { asChild?: boolean }

const AlertIcon = forwardRef<ElementRef<'svg'>, AlertIconProps>(
  (props, ref) => {
    const { scheme, layout, size } = useAlertContext()
    const { className, asChild, children, ...restProps } = props

    const Icon = getIcons(scheme)
    const Component = asChild ? Slot : Icon
    const passProps = asChild ? {} : { ref, ...restProps }
    return (
      <Component
        data-size={size}
        data-scheme={scheme}
        data-layout={layout}
        className={alert.alertIconCva({
          scheme,
          layout,
          size,
          className,
        })}
        {...passProps}
      >
        {children}
      </Component>
    )
  },
)

AlertIcon.displayName = 'AlertIcon'

export { type AlertIconProps, AlertIcon }
