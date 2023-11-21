import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const alertCva = cva(['flex gap-x-2 rounded-lg p-3 border'], {
  variants: {
    appearance: {
      primary: ['bg-primary-100', 'text-primary-700', 'border-primary-300'],
      secondary: [
        'bg-secondary-100',
        'text-secondary-700',
        'border-secondary-300',
      ],
      neutral: ['bg-neutral-100', 'text-neutral-700', 'border-neutral-300'],
      info: ['bg-neutral-100', 'text-neutral-700', 'border-neutral-300'],
      success: ['bg-success-100', 'text-success-700', 'border-success-300'],
      warn: ['bg-warning-100', 'text-warning-700', 'border-warning-300'],
      error: ['bg-danger-100', 'text-danger-700', 'border-danger-300'],
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
