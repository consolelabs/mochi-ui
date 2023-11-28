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

export const AlertIcon = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & { asChild?: boolean }
>((props, ref) => {
  const { scheme, variant, size } = useAlertContext()
  const { className, asChild, children, ...restProps } = props
  if (asChild)
    return (
      <Slot
        className={alert.alertIconCva({ scheme, variant, className })}
        data-scheme={scheme}
        data-variant={variant}
        data-size={size}
      >
        {children}
      </Slot>
    )
  const Icon = getIcons(scheme)
  return (
    <Icon
      data-scheme={scheme}
      data-variant={variant}
      data-size={size}
      className={alert.alertIconCva({ scheme, variant, className })}
      ref={ref}
      {...restProps}
    />
  )
})
