import * as RadixTooltip from '@radix-ui/react-tooltip'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const tooltip = cva(['rounded-lg px-3 py-2 text-xs font-semibold'], {
  variants: {
    theme: {
      light: ['bg-white', 'text-neutral-800'],
      dark: ['bg-neutral-800', 'text-white'],
    },
  },
  defaultVariants: {
    theme: 'light',
  },
})

const arrowCva = cva([], {
  variants: {
    theme: {
      light: ['fill-white'],
      dark: ['fill-neutral-800'],
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
        <RadixTooltip.Trigger className="w-fit">
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
