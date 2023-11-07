import type { SVGProps } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import {
  IconInfoCircled,
  IconCheckCircled,
  IconCrossCircled,
  IconExclamationTriangle,
} from '@consolelabs/icons'

const alert = cva(['flex gap-x-2 rounded-lg p-3 border'], {
  variants: {
    appearance: {
      info: [
        'bg-neutral-100',
        'text-neutral-600',
        'border',
        'border-neutral-300',
      ],
      success: ['bg-green-100', 'text-green-600', 'border-green-300'],
      warn: ['bg-yellow-100', 'text-yellow-600', 'border-yellow-300'],
      error: ['bg-red-100', 'text-red-600', 'border-red-300'],
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
