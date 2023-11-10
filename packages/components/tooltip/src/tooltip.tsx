import * as RadixTooltip from '@radix-ui/react-tooltip'
import { tooltip, TooltipStyleProps } from '@consolelabs/theme'

const { tooltipCva, tooltipArrowCva, tooltipTriggerClsx } = tooltip

export default function Tooltip({
  children,
  content,
  theme,
  arrow = 'none',
  className,
}: TooltipStyleProps) {
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
            className={tooltipCva({ className, theme })}
            side={side}
            style={{
              boxShadow:
                '0px 4px 6px -2px rgba(52, 52, 51, 0.03), 0px 12px 16px -4px rgba(52, 52, 51, 0.08)',
            }}
          >
            {content}
            {arrow !== 'none' && (
              <RadixTooltip.Arrow className={tooltipArrowCva({ theme })} />
            )}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
