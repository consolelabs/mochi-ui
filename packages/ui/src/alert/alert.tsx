import type { SVGProps } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import IconCheckCircled from '../icons/components/icon-check-circled'
import IconInfoCircled from '../icons/components/icon-info-circled'
import IconCrossCircled from '../icons/components/icon-cross-circled'
import IconExclamationTriangle from '../icons/components/icon-exclamation-triangle'

const alert = cva(['ui-flex ui-gap-x-2 ui-rounded-lg ui-p-3 ui-border'], {
  variants: {
    appearance: {
      info: [
        'ui-bg-neutral-100',
        'ui-text-neutral-600',
        'ui-border',
        'ui-border-neutral-300',
      ],
      success: ['ui-bg-green-100', 'ui-text-green-600', 'ui-border-green-300'],
      warn: ['ui-bg-yellow-100', 'ui-text-yellow-600', 'ui-border-yellow-300'],
      error: ['ui-bg-red-100', 'ui-text-red-600', 'ui-border-red-300'],
    },
  },
  defaultVariants: {
    appearance: 'info',
  },
})

type Props = VariantProps<typeof alert> & {
  children: React.ReactNode
  className?: string
  title: string
}

type Appearance = Exclude<Props['appearance'], null | undefined>

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
}: Props) {
  const appearance = _appearance ?? 'info'
  const Icon = icons[appearance]

  return (
    <div className={alert({ className, appearance })}>
      <Icon className="ui-flex-shrink-0 ui-w-5 ui-h-5 ui-text-current" />
      <div className="ui-flex ui-flex-col ui-flex-1 ui-text-current">
        <span className="ui-text-sm ui-font-medium ui-text-current">
          {title}
        </span>
        {children}
      </div>
    </div>
  )
}
