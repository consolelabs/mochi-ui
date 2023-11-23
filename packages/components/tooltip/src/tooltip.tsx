import * as RadixTooltip from '@radix-ui/react-tooltip'
import { tooltip } from '@consolelabs/theme'

const { tooltipClsx, tooltipArrowClxs, tooltipTriggerClsx } = tooltip

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

export type Arrow = (typeof ARROW_OPTIONS)[number]

export type TooltipProps = {
  children: React.ReactNode
  content: React.ReactNode
  arrow?: Arrow | 'none'
  className?: string
}

export default function Tooltip({
  children,
  content,
  arrow = 'none',
  className,
}: TooltipProps) {
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
        <RadixTooltip.Trigger className={tooltipTriggerClsx()}>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            align={align}
            className={tooltipClsx({ className })}
            side={side}
            style={{
              boxShadow:
                '0px 4px 6px -2px rgba(52, 52, 51, 0.03), 0px 12px 16px -4px rgba(52, 52, 51, 0.08)',
            }}
          >
            {content}
            {arrow !== 'none' && (
              <RadixTooltip.Arrow
                style={{ fill: 'white' }}
                className={tooltipArrowClxs}
              />
            )}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
