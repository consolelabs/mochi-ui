import { VariantProps, cva } from 'class-variance-authority'

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
        className: 'text-neutral-400 cursor-not-allowed',
      },
      {
        disabled: false,
        variant: 'solid',
        className:
          'rounded text-neutral-600 hover:text-neutral-500 hover:bg-neutral-150 data-[state=active]:text-neutral-800 data-[state=active]:hover:text-neutral-500',
      },
      {
        disabled: false,
        variant: 'link',
        className:
          'text-neutral-600 hover:text-neutral-700 data-[state=active]:text-neutral-800 data-[state=active]:hover:text-neutral-700',
      },
    ],
    defaultVariants: {
      variant: 'link',
      disabled: false,
    },
  },
)

const tabTriggerWrapperClassName =
  'inline-flex flex-1 px-2 border-r border-r-neutral-200 last:border-none sm:border-none'

export const tabs = {
  tabTriggerVariants,
  tabTriggerWrapperClassName,
}

export type TabTriggerStylesProps = VariantProps<typeof tabTriggerVariants>
