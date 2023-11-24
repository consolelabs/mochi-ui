import type { SVGProps } from 'react'
import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  CrossCircleOutlined,
  ExclamationTriangleOutlined,
} from '@consolelabs/icons'
import { alert, AlertStylesProps } from '@consolelabs/theme'

const { alertCva, alertIconClsx, alertContentClsx, alertTitleClsx } = alert

type Appearance = Exclude<AlertStylesProps['appearance'], null | undefined>

const icons = {
  primary: InfoCircleOutlined,
  secondary: InfoCircleOutlined,
  neutral: InfoCircleOutlined,
  success: CheckCircleOutlined,
  warning: ExclamationTriangleOutlined,
  danger: CrossCircleOutlined,
} satisfies Record<Appearance, (p: SVGProps<SVGSVGElement>) => JSX.Element>

interface AlertProps extends AlertStylesProps {
  children: React.ReactNode
  className?: string
  title?: string
}

export default function Alert({
  title,
  children,
  className,
  appearance: appearanceProp,
  size,
}: AlertProps) {
  const appearance = appearanceProp ?? 'neutral'
  const Icon = icons[appearance]

  return (
    <div className={alertCva({ size, className, appearance })}>
      <Icon className={alertIconClsx()} />
      <div className={alertContentClsx()}>
        <span className={alertTitleClsx()}>{title}</span>
        {children}
      </div>
    </div>
  )
}

export { type AlertProps }
