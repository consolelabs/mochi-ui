import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const alertCva = cva(['flex gap-x-2 rounded-lg p-3 border'], {
  variants: {
    appearance: {
      primary: [
        'bg-primary-outline',
        'text-primary-outline-fg',
        'border-primary-outline-border',
      ],
      secondary: [
        'bg-secondary-outline',
        'text-secondary-outline-fg',
        'border-secondary-outline-border',
      ],
      neutral: [
        'bg-neutral-outline',
        'text-neutral-outline-fg',
        'border-neutral-outline-border',
      ],
      success: [
        'bg-success-outline',
        'text-success-outline-fg',
        'border-success-outline-border',
      ],
      warning: [
        'bg-warning-outline',
        'text-warning-outline-fg',
        'border-warning-outline-border',
      ],
      danger: [
        'bg-danger-outline',
        'text-danger-outline-fg',
        'border-danger-outline-border',
      ],
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
    },
  },
  defaultVariants: {
    appearance: 'neutral',
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
