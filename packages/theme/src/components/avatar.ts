import { cva, VariantProps } from 'class-variance-authority'

const avatarCva = cva(['inline-block relative flex-shrink-0 rounded-full'], {
  variants: {
    size: {
      xs: 'w-4 h-4',
      sm: 'w-7 h-7',
      base: 'w-10 h-10',
      lg: 'w-14 h-14',
      xl: 'w-20 h-20',
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

const avatarImgClsx = 'h-full w-full object-cover rounded-full overflow-hidden'

const avatarStatusWrapperCva = cva(
  [
    'absolute flex items-center justify-center',
    'outline outline-[2px] outline-white rounded-full',
    'bg-white',
    'h-1/4 w-1/4',
  ],
  {
    variants: {
      color: {
        primary: 'text-primary-500',
        secondary: 'text-secondary-500',
        success: 'text-success-500',
        warning: 'text-warning-500',
        danger: 'text-danger-500',
        neutral: 'text-neutral-500',
      },
      position: {
        'bottom-left': ['left-0', 'top-3/4'],
        'bottom-right': ['left-3/4', 'top-3/4'],
        'top-left': ['left-0', 'top-0'],
        'top-right': ['left-3/4', 'top-0'],
      },
    },
    defaultVariants: {
      position: 'bottom-right',
    },
  },
)
const avatarSmallImgCva = cva(
  'rounded-full overflow-hidden w-2/5 h-2/5 object-cover absolute',
  {
    variants: {
      position: {
        'bottom-left': ['left-0', 'top-[60%]'],
        'bottom-right': ['left-[60%]', 'top-[60%]'],
        'top-left': ['left-0', 'top-0'],
        'top-right': ['left-[60%]', 'top-0'],
      },
    },
    defaultVariants: {
      position: 'bottom-right',
    },
  },
)

export const avatar = {
  avatarCva,
  avatarImgClsx,
  avatarSmallImgCva,
  avatarStatusWrapperCva,
}

export type AvatarStylesProps = VariantProps<typeof avatarCva>
export type AvatarSmallImgStyleProps = VariantProps<typeof avatarSmallImgCva>
export type AvatarStatusStyleProps = VariantProps<typeof avatarStatusWrapperCva>
