import type { SVGProps } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import IconCheckCircled from '../icons/components/icon-check-circled'
import IconInfoCircled from '../icons/components/icon-info-circled'
import IconCrossCircled from '../icons/components/icon-cross-circled'
import IconExclamationTriangle from '../icons/components/icon-exclamation-triangle'

const alert = cva(['flex gap-x-2 rounded-lg p-3 border'], {
  variants: {
    appearance: {
      info: ['bg-gray-100', 'text-gray-600', 'border', 'border-gray-300/70'],
      success: ['bg-green-50', 'text-green-700', 'border-green-200'],
      warn: ['bg-yellow-50', 'text-yellow-700', 'border-yellow-300/70'],
      error: ['bg-red-50', 'text-red-700', 'border-red-200'],
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
      <Icon className="flex-shrink-0 w-5 h-5 text-current" />
      <div className="flex flex-col flex-1 text-current">
        <span className="text-sm font-medium text-current">{title}</span>
        {children}
      </div>
    </div>
  )
}
