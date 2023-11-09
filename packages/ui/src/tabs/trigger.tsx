import * as RadixTabs from '@radix-ui/react-tabs'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

const tabTrigger = cva(
  [
    'flex flex-1 items-center justify-center gap-x-1 text-sm font-medium px-1 py-0.5',
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
          'rounded text-neutral-600 hover:text-neutral-500 hover:bg-neutral-150 data-[state=active]:text-neutral-800',
      },
      {
        disabled: false,
        variant: 'link',
        className:
          'text-neutral-600 hover:text-neutral-700 data-[state=active]:text-neutral-800',
      },
    ],
    defaultVariants: {
      variant: 'link',
      disabled: false,
    },
  },
)

type Props = React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger> &
  VariantProps<typeof tabTrigger>

const TabTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  Props
>(({ className, variant, disabled, ...props }, ref) => (
  <div className="inline-flex flex-1 px-2 border-r border-r-neutral-200 last:border-none">
    <RadixTabs.Trigger
      className={tabTrigger({ className, variant, disabled })}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  </div>
))
TabTrigger.displayName = RadixTabs.Trigger.displayName

export { TabTrigger }
