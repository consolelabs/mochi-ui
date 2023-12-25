import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

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

<<<<<<< HEAD
const avatarGroupWrapperCva = cva(['overflow-hidden'], {
  variants: {
    size: {
      xs: 'w-10 h-10',
      sm: 'w-12 h-12',
      md: 'w-14 h-14',
      lg: 'w-16 h-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const avatarGroupCva = cva(
  ['relative overflow-hidden bg-background-level3 rounded-full w-14 h-14'],
  {
    variants: {
      size: {
        xs: 'scale-[calc(5/7)] -translate-x-2 -translate-y-2',
        sm: 'scale-[calc(6/7)] -translate-x-1 -translate-y-1',
        md: '',
        lg: 'scale-[calc(8/7)] translate-x-1 translate-y-1',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const avatarGroupItemClsx = ({
  className = '',
  index = 0,
}: { className?: string; index?: number } = {}) =>
  clsx(
    'absolute overflow-hidden',
    {
      'top-[5px] left-[5px] h-1/2 w-1/2': index === 0,
      'bottom-2.5 right-1 h-2/5 w-2/5': index === 1,
      'bottom-1 left-3 h-1/3 w-1/3': index === 2,
      'top-2 right-2 h-1/4 w-1/4': index === 3,
    },
    className,
  )

const avatarGroupItemAvatarClsx = ({
  className = '',
  isExtraCell = false,
}: { className?: string; isExtraCell?: boolean } = {}) =>
  clsx(
    'absolute !w-full !h-full object-contain top-0 rounded-full overflow-hidden flex justify-center items-center',
    {
      'text-text-contrast bg-primary-plain-fg text-[9px]': isExtraCell,
    },
    className,
  )

const avatarImgClsx = 'h-full'

export const avatar = {
  avatarCva,
  avatarGroupWrapperCva,
  avatarGroupCva,
  avatarImgClsx,
  avatarGroupItemClsx,
  avatarGroupItemAvatarClsx,
=======
const avatarImgClsx = ({ smallSrc = false }) =>
  clsx('h-full translate animate-fade-in', {
    'rounded-full': !smallSrc,
  })
const avatarImgSvgCls = 'rounded-full overflow-hidden'

const avatarFallbackCls = 'w-full h-full rounded-full'

export const avatar = {
  avatarCva,
  avatarImgClsx,
  avatarFallbackCls,
  avatarImgSvgCls,
>>>>>>> 619e4bd (feat: lazy load avatar using radix avatar)
}

export type AvatarStylesProps = VariantProps<typeof avatarCva>
