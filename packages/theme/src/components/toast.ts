import { VariantProps, cva } from 'class-variance-authority'

const toastCva = cva('w-fit', {
  variants: {
    fullWidth: {
      true: 'w-full',
      false: 'w-fit',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
})

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
