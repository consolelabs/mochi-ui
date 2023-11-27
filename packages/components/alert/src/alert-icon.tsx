import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  ExclamationTriangleOutlined,
  CrossCircleOutlined,
} from '@consolelabs/icons'
import { SVGProps, forwardRef } from 'react'
import { alert } from '@consolelabs/theme'
import { useAlertContext } from './context'

const icons = {
  primary: InfoCircleOutlined,
  secondary: InfoCircleOutlined,
  neutral: InfoCircleOutlined,
  success: CheckCircleOutlined,
  warning: ExclamationTriangleOutlined,
  danger: CrossCircleOutlined,
}

export const AlertIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => {
    const { scheme, variant } = useAlertContext()
    const { className, ...restProps } = props
    const Icon = icons[scheme ?? 'neutral']
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
