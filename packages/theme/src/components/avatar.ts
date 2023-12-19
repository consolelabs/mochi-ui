import { cva, VariantProps } from 'class-variance-authority'

const avatarCva = cva(['inline-block flex-shrink-0 rounded-full'], {
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

const avatarImgClsx = 'h-full'
const avatarStatus = cva('', {
  variants: {
    color: {
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      danger: 'bg-danger-500',
      neutral: 'bg-neutral-500',
    },
  },
})
const avatarSmallImg =
  'outline outline-white rounded-full overflow-hidden outline-[2px]'

export const avatar = { avatarCva, avatarImgClsx, avatarSmallImg, avatarStatus }

export type AvatarStylesProps = VariantProps<typeof avatarCva>
