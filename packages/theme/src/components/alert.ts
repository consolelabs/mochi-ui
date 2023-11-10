import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const alertCva = cva(['flex gap-x-2 rounded-lg p-3 border'], {
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

export type AlertStyleProps = VariantProps<typeof alertCva> & {
  children: React.ReactNode
  className?: string
  title?: string
}
