import { InfoCircleOutlined, CheckCircleOutlined } from '@consolelabs/icons'
import { SVGProps, forwardRef } from 'react'
import { alert } from '@consolelabs/theme'
import { useAlertContext } from './context'

const icons = {
  info: InfoCircleOutlined,
  success: CheckCircleOutlined,
  warning: InfoCircleOutlined,
  danger: InfoCircleOutlined,
} as const

export const AlertIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => {
    const { scheme, variant, status } = useAlertContext()
    const { className, ...restProps } = props
    const Icon = icons[status]
    return (
      <Icon
        className={alert.alertIconCva({ scheme, variant, className })}
        ref={ref}
        {...restProps}
      />
    )
  },
)

export { icons }
