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
        className: 'text-text-tertiary cursor-not-allowed',
      },
      {
        disabled: false,
        variant: 'solid',
        className:
          'rounded text-text-secondary hover:bg-neutral-outline-hover data-[state=active]:text-text-primary data-[state=active]:hover:text-text-secondary',
      },
      {
        disabled: false,
        variant: 'link',
        className:
          'text-text-secondary hover:text-neutral-plain-fg data-[state=active]:text-text-primary data-[state=active]:hover:text-neutral-700',
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
