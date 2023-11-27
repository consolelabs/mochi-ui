import { clsx } from 'clsx'

const formControl = {
  wrapperClsx: ({ className = '' }: { className?: string }) =>
    clsx('flex flex-col gap-2', className),
}

const formHelperText = ({
  className = '',
  error = false,
}: {
  className?: string
  error?: boolean
}) =>
  clsx(
    'text-xs tracking-tighter',
    {
      'text-danger-plain-fg': error,
      'text-text-secondary': !error,
    },
    className,
  )

export { formControl, formHelperText }
