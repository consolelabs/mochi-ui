import { VariantProps, cva } from 'class-variance-authority'

const toastCva = cva(
  [
    'w-fit pointer-events-auto',
    'data-[state=open]:animate-in',
    'data-[state=open]:zoom-in-95',
    'data-[state=closed]:fade-in-50',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:zoom-out-95',
    'data-[state=closed]:fade-out-0',
    'transition-all',
    'duration-200',
  ],
  {
    variants: {
      fullWidth: {
        true: 'w-full',
        false: 'w-fit',
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  },
)

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
      align: {
        center: 'items-center',
        left: 'items-start',
        right: 'items-end',
      },
      direction: {
        up: ['flex-col-reverse'],
        down: ['flex-col'],
      },
    },
    defaultVariants: {
      direction: 'down',
      align: 'right',
    },
  },
)

type ViewPortStyleProps = VariantProps<typeof toastViewPortCva>
type ToastStyleProps = VariantProps<typeof toastCva>

const toaster = {
  toastViewPortCva,
  toastCva,
}

export { toaster, type ViewPortStyleProps, type ToastStyleProps }
