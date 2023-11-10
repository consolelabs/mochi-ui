import type { SVGProps } from 'react'
import {
  IconInfoCircled,
  IconCheckCircled,
  IconCrossCircled,
  IconExclamationTriangle,
} from '@consolelabs/icons'
import { alert, AlertStyleProps } from '@consolelabs/theme'

const { alertCva, alertIconClsx, alertContentClsx, alertTitleClsx } = alert

type Appearance = Exclude<AlertStyleProps['appearance'], null | undefined>

const icons = {
  info: IconInfoCircled,
  success: IconCheckCircled,
  warn: IconExclamationTriangle,
  error: IconCrossCircled,
} satisfies Record<Appearance, (p: SVGProps<SVGSVGElement>) => JSX.Element>

export default function Alert({
  title,
  children,
  className,
  appearance: _appearance,
  size,
}: AlertStyleProps) {
  const appearance = _appearance ?? 'info'
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
