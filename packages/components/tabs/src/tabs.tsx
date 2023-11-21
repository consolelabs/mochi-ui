import * as RadixTabs from '@radix-ui/react-tabs'
import React from 'react'
import { tabs, TabTriggerStylesProps } from '@consolelabs/theme'

type TabsProps = typeof RadixTabs.Root
type TabListProps = typeof RadixTabs.List
type TabContentProps = typeof RadixTabs.Content

const Tabs = RadixTabs.Root
const TabList = RadixTabs.List
const TabContent = RadixTabs.Content

type TabTriggerProps = React.ComponentPropsWithoutRef<
  typeof RadixTabs.Trigger
> &
  TabTriggerStylesProps & {
    wrapperClassName?: string
  }

const TabTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  TabTriggerProps
>(({ wrapperClassName, className, variant, disabled, ...props }, ref) => {
  const { tabTriggerVariants, tabTriggerWrapperClassName } = tabs

  return (
    <div
      className={tabTriggerWrapperClassName({ className: wrapperClassName })}
    >
      <RadixTabs.Trigger
        className={tabTriggerVariants({ className, variant, disabled })}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    </div>
  )
})
TabTrigger.displayName = RadixTabs.Trigger.displayName

export {
  Tabs,
  TabList,
  TabContent,
  TabTrigger,
  type TabTriggerProps,
  type TabsProps,
  type TabListProps,
  type TabContentProps,
}
