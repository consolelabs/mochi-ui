import { VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'

const toastClsx = ({ className = '' }: { className?: string }) =>
  clsx('w-full', className)

const toastViewPortCva = cva(
  [
    'z-[100]',
    'flex',
    'gap-3',
    'bg-transparent',
    'w-full',
    'pointer-events-none',
  ],
  {
    variants: {
      direction: {
        up: ['flex-col-reverse', 'items-center'],
        down: ['flex-col', 'items-center'],
      },
    },
    defaultVariants: {
      direction: 'down',
    },
  },
)

type ViewPortStyleProps = VariantProps<typeof toastViewPortCva>

const toaster = {
  toastViewPortCva,
  toastClsx,
}

export { toaster, type ViewPortStyleProps }
