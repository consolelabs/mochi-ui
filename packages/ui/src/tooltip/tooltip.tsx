import * as RadixTooltip from '@radix-ui/react-tooltip'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const tooltip = cva(
  ['ui-rounded-lg ui-px-3 ui-py-2 ui-text-xs ui-font-semibold'],
  {
    variants: {
      theme: {
        light: ['ui-bg-white', 'ui-text-neutral-800'],
        dark: ['ui-bg-neutral-800', 'ui-text-white'],
      },
    },
    defaultVariants: {
      theme: 'light',
    },
  },
)

const arrowCva = cva([], {
  variants: {
    theme: {
      light: ['ui-fill-white'],
      dark: ['ui-fill-neutral-800'],
    },
  },
  defaultVariants: {
    theme: 'light',
  },
})

export const ARROW_OPTIONS = [
  'none',
  'top-start',
  'top-center',
  'top-end',
  'right-start',
  'right-center',
  'right-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
  'left-start',
  'left-center',
  'left-end',
] as const
type Arrow = (typeof ARROW_OPTIONS)[number]

type Props = VariantProps<typeof tooltip> & {
  children: React.ReactNode
  content: React.ReactNode
  arrow?: Arrow | 'none'
  className?: string
}

export default function Tooltip({
  children,
  content,
  theme,
  arrow = 'none',
  className,
}: Props) {
  const [side, align] =
    arrow === 'none'
      ? []
      : (arrow.split('-') as [
        RadixTooltip.PopperContentProps['side'],
        RadixTooltip.PopperContentProps['align'],
      ])

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={0}>
        <RadixTooltip.Trigger className="ui-w-fit">
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            align={align}
            className={tooltip({ className, theme })}
            side={side}
            style={{
              boxShadow:
                '0px 4px 6px -2px rgba(52, 52, 51, 0.03), 0px 12px 16px -4px rgba(52, 52, 51, 0.08)',
            }}
          >
            {content}
            {arrow !== 'none' && (
              <RadixTooltip.Arrow className={arrowCva({ theme })} />
            )}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
