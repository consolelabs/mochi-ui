import { cva } from 'class-variance-authority'
import clsx from 'clsx'

const stepperCva = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
})

const stepClsx = ({
  className = '',
  isLast,
  orientation,
}: {
  className?: string
  isLast?: boolean
  orientation?: 'horizontal' | 'vertical'
} = {}) =>
  clsx(
    'flex items-center space-x-3',
    {
      'relative mb-7': orientation === 'vertical' && !isLast,
    },
    className,
  )

const stepIndicatorClsx = ({
  className = '',
  status,
}: {
  className?: string
  status?: 'loading' | 'error' | 'success' | 'current' | 'incomplete'
} = {}) =>
  clsx(
    'w-6 h-6 flex items-center justify-center text-xs font-semibold z-10',
    { 'bg-danger-solid rounded-full': status === 'error' },
    { 'bg-success-solid rounded-full': status === 'success' },
    {
      'border border-neutral-outline-fg rounded-full bg-background-surface':
        status === 'current',
    },
    {
      'border border-neutral-outline-disable-fg rounded-full bg-background-level2 text-text-tertiary':
        status === 'incomplete',
    },
    className,
  )

const stepIndicatorIconClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('w-4 h-4 text-text-contrast', className)

const stepIndicatorLoadingClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('w-full h-full text-primary-solid', className)

const stepContentClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('flex flex-col space-y-0.5', className)

const stepTitleClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('', className)

const stepDescriptionClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('font-normal', className)

const stepSeparatorClsx = ({
  className = '',
  isLast,
  orientation,
}: {
  className?: string
  isFirst?: boolean
  isLast?: boolean
  orientation?: 'horizontal' | 'vertical'
} = {}) =>
  clsx(
    'bg-background-level3 ',
    {
      'absolute left-0 top-[calc(100%+2px)] w-0.5 h-6 transform -translate-x-1/2':
        orientation === 'vertical' && !isLast,
      'h-0.5 min-w-[40px] !mx-3': orientation === 'horizontal' && !isLast,
    },
    className,
  )

const stepper = {
  stepperCva,
  stepClsx,
  stepIndicatorClsx,
  stepIndicatorIconClsx,
  stepIndicatorLoadingClsx,
  stepContentClsx,
  stepTitleClsx,
  stepDescriptionClsx,
  stepSeparatorClsx,
}

export { stepper }
