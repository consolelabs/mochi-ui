import { InfoCircleOutlined, CheckCircleOutlined } from '@consolelabs/icons'
import { SVGProps, forwardRef } from 'react'
import { alert } from '@consolelabs/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'
import { AlertProps } from './alert'

const getIcons = (scheme: NonNullable<AlertProps['scheme']>) => {
  if (scheme === 'success') return CheckCircleOutlined
  return InfoCircleOutlined
}

type AlertIconProps = SVGProps<SVGSVGElement> & { asChild?: boolean }

const AlertIcon = forwardRef<SVGSVGElement, AlertIconProps>((props, ref) => {
  const { scheme, variant, size, responsive } = useAlertContext()
  const { className, asChild, children, ...restProps } = props
  if (asChild)
    return (
      <Slot
        className={alert.alertIconCva({
          scheme,
          variant,
          responsive,
          className,
        })}
        data-size={size}
        data-scheme={scheme}
        data-responsive={responsive}
        data-variant={variant}
      >
        {children}
      </Slot>
    )
  const Icon = getIcons(scheme)
  return (
    <Icon
      data-size={size}
      data-scheme={scheme}
      data-responsive={responsive}
      data-variant={variant}
      className={alert.alertIconCva({
        scheme,
        variant,
        responsive,
        className,
      })}
      ref={ref}
      {...restProps}
    />
  )
})

export { type AlertIconProps, AlertIcon }
