import { VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'

const tabTriggerVariants = cva(
  [
    'flex flex-1 items-center justify-center gap-x-1 text-sm font-medium px-1 py-1',
  ],
  {
    variants: {
      variant: {
        solid: '',
        link: '',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        disabled: true,
        className: 'text-text-disabled cursor-not-allowed',
      },
      {
        disabled: false,
        variant: 'solid',
        className:
          'rounded text-text-secondary hover:bg-background-level2 hover:text-text-primary data-[state=active]:text-primary-solid',
      },
      {
        disabled: false,
        variant: 'link',
        className:
          'text-text-secondary hover:text-text-primary data-[state=active]:text-primary-solid',
      },
    ],
    defaultVariants: {
      variant: 'link',
      disabled: false,
    },
  },
)

const tabTriggerWrapperClassName = ({ className }: { className?: string }) =>
  clsx(
    'inline-flex flex-1 px-2 border-r border-r-neutral-outline-active last:border-none sm:border-none',
    className,
  )

export const tabs = {
  tabTriggerVariants,
  tabTriggerWrapperClassName,
}

export type TabTriggerStylesProps = VariantProps<typeof tabTriggerVariants>
