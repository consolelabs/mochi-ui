import { clsx } from 'clsx'
import { label } from './label'

const formControl = {
  wrapperClsx: ({ className = '' }: { className?: string }) =>
    clsx('flex flex-col gap-2', className),
  labelClsx: label.labelClsx,
  helperClsx: ({
    className = '',
    error = false,
  }: {
    className?: string
    error?: boolean
  }) =>
    clsx(
      'text-xs tracking-tighter',
      {
        'text-danger-solid': error,
        'text-text-secondary': !error,
      },
      className,
    ),
}

export { formControl }
