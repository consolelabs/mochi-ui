import * as RadixTabs from '@radix-ui/react-tabs'
import React from 'react'
import { tabs, TabTriggerProps } from '@consolelabs/theme'

const Tabs = RadixTabs.Root
const TabList = RadixTabs.List
const TabContent = RadixTabs.Content

const TabTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger> & TabTriggerProps
>(({ className, variant, disabled, ...props }, ref) => {
  const { tabTriggerVariants, tabTriggerWrapperClassName } = tabs

  return (
    <div className={tabTriggerWrapperClassName}>
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

export { Tabs, TabList, TabContent, TabTrigger }
