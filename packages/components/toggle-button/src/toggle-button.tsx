import * as ToggleGroup from '@radix-ui/react-toggle-group'
import React from 'react'
import {
  toggleButton,
  ToggleButtonProps,
  ToggleButtonGroupProps,
} from '@consolelabs/theme'

const ToggleButtonGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroup.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroup.Root> &
    ToggleButtonGroupProps
>(({ className, ...props }, ref) => {
  const { toggleButtonGroupVariants } = toggleButton

  return (
    <ToggleGroup.Root
      className={toggleButtonGroupVariants({ className })}
      ref={ref}
      {...props}
    />
  )
})
ToggleButtonGroup.displayName = ToggleGroup.Root.displayName

const ToggleButton = React.forwardRef<
  React.ElementRef<typeof ToggleGroup.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroup.Item> & ToggleButtonProps
>(({ className, ...props }, ref) => {
  const { toggleButtonVariants } = toggleButton

  return (
    <ToggleGroup.Item
      className={toggleButtonVariants({ className })}
      ref={ref}
      {...props}
    />
  )
})
ToggleButton.displayName = ToggleGroup.Item.displayName

export { ToggleButtonGroup, ToggleButton }
