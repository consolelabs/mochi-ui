import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const alertCva = cva(['flex gap-x-2 rounded-lg p-3 border'], {
  variants: {
    appearance: {
      info: [
        'bg-neutral-plain-hover',
        'text-neutral-solid',
        'border',
        'border-neutral-outline-border',
      ],
      success: [
        'bg-success-plain-hover',
        'text-success-solid',
        'border-success-outline-border',
      ],
      warn: [
        'bg-warning-plain-hover',
        'text-warning-solid',
        'border-warning-outline-border',
      ],
      error: [
        'bg-danger-plain-hover',
        'text-danger-solid',
        'border-danger-outline-border',
      ],
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
    },
  },
  defaultVariants: {
    appearance: 'info',
    size: 'md',
  },
})

const alertIconClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('flex-shrink-0 w-5 h-5 text-current', className)

const alertContentClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('flex flex-col flex-1 text-current', className)

const alertTitleClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('text-sm font-medium text-current', className)

export const alert = {
  alertCva,
  alertIconClsx,
  alertContentClsx,
  alertTitleClsx,
}

export type AlertStylesProps = VariantProps<typeof alertCva>
