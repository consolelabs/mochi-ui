import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const avatarCva = cva(['inline-block flex-shrink-0 rounded-full'], {
  variants: {
    size: {
      xxs: 'w-4 h-4',
      xs: '',
      sm: 'w-8 h-8',
      base: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-14 h-14',
      '2xl': 'w-16 h-16',
      '3xl': 'w-20 h-20',
    },
    hasSmallSrc: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      size: 'xs',
      hasSmallSrc: true,
      className: 'w-8 h-8',
    },
    {
      size: 'xs',
      hasSmallSrc: false,
      className: 'w-6 h-6',
    },
  ],
  defaultVariants: {
    size: 'base',
    hasSmallSrc: false,
  },
})

const avatarGroupWrapperCva = cva(['overflow-hidden shrink-0'], {
  variants: {
    size: {
      xs: 'w-4 h-4',
      sm: 'w-8 h-8',
      base: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-14 h-14',
      '2xl': 'w-16 h-16',
      '3xl': 'w-20 h-20',
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

const avatarGroupCva = cva(
  ['relative overflow-hidden bg-background-level3 rounded-full w-10 h-10'],
  {
    variants: {
      size: {
        xs: 'scale-[calc(4/10)] -translate-x-3 -translate-y-3',
        sm: 'scale-[calc(8/10)] -translate-x-1 -translate-y-1',
        base: '',
        lg: 'scale-[calc(12/10)] translate-x-1 translate-y-1',
        xl: 'scale-[calc(14/10)] translate-x-2 translate-y-2',
        '2xl': 'scale-[calc(16/10)] translate-x-3 translate-y-3',
        '3xl': 'scale-[calc(2)] translate-x-5 translate-y-5',
      },
    },
    defaultVariants: {
      size: 'base',
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
      'top-[5px] left-[3px] h-1/2 w-1/2': index === 0,
      'bottom-2 right-0.5 h-2/5 w-2/5': index === 1,
      'bottom-0.5 left-[10px] h-[30%] w-[30%]': index === 2,
      'top-[5px] right-1.5 h-1/4 w-1/4': index === 3,
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
      'text-text-contrast bg-primary-plain-fg text-[6px]': isExtraCell,
    },
    className,
  )

const avatarImgClsx = ({ smallSrc = false, isCached = false }) =>
  clsx('h-full', {
    'rounded-full': !smallSrc,
    'animate-fade-in': !isCached,
  })

const avatarFallbackCls = 'w-full h-full rounded-full'

const avatarImgSvgCls = 'rounded-full overflow-hidden'

export const avatar = {
  avatarCva,
  avatarGroupWrapperCva,
  avatarGroupCva,
  avatarImgClsx,
  avatarGroupItemClsx,
  avatarGroupItemAvatarClsx,
  avatarFallbackCls,
  avatarImgSvgCls,
}

export type AvatarStylesProps = VariantProps<typeof avatarCva>
