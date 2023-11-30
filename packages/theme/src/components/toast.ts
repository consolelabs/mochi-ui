import { VariantProps, cva } from 'class-variance-authority'

const toastViewPortCva = cva(
  ['fixed', 'z-[100]', 'flex', 'gap-3', 'p-4', 'bg-transparent'],
  {
    variants: {
      position: {
        // NOTE: Auto -> bottom right for desktop, top for mobile
        auto: [
          // mobile
          'top-0',
          'w-full',
          'left-0',
          'flex-col-reverse',
          'items-center',
          // sm
          'sm:left-auto',
          'sm:bottom-0',
          'sm:right-0',
          'sm:top-auto',
          'sm:flex-col',
          'sm:max-w-[420px]',
        ],
        top: '',
        down: '',
        topLeft: '',
        topRight: '',
        bottomLeft: '',
        bottomRight: '',
      },
    },
    defaultVariants: {
      position: 'auto',
    },
  },
)

type ViewPortStyleProps = VariantProps<typeof toastViewPortCva>

const toast = {
  toastViewPortCva,
}

export { toast, type ViewPortStyleProps }
