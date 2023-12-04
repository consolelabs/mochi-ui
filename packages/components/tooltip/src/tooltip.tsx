import { tooltip } from '@mochi-ui/theme'
import * as RadixTooltip from '@radix-ui/react-tooltip'

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
  componentProps?: {
    trigger?: RadixTooltip.TooltipTriggerProps
    root?: RadixTooltip.TooltipProps
  }
}

export default function Tooltip({
  children,
  content,
  arrow = 'none',
  className,
  componentProps: { trigger, root } = {},
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
      <RadixTooltip.Root delayDuration={0} {...root}>
        <RadixTooltip.Trigger
          {...trigger}
          className={tooltipTriggerClsx({
            className: trigger?.className,
          })}
        >
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
              <RadixTooltip.Arrow className={tooltipArrowClxs} />
            )}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
