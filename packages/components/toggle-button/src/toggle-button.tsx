import * as ToggleGroup from '@radix-ui/react-toggle-group'
import React from 'react'
import {
  toggleButton,
  ToggleButtonStylesProps,
  ToggleButtonGroupStylesProps,
} from '@mochi-ui/theme'

type ToggleButtonGroupProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroup.Root
> &
  ToggleButtonGroupStylesProps

const ToggleButtonGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroup.Root>,
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

type ToggleButtonProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroup.Item
> &
  ToggleButtonStylesProps

const ToggleButton = React.forwardRef<
  React.ElementRef<typeof ToggleGroup.Item>,
  ToggleButtonProps
>(({ className, size, appearance, ...props }, ref) => {
  const { toggleButtonVariants } = toggleButton

  return (
    <ToggleGroup.Item
      className={toggleButtonVariants({ appearance, size, className })}
      ref={ref}
      {...props}
    />
  )
})
ToggleButton.displayName = ToggleGroup.Item.displayName

export {
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
  type ToggleButtonProps,
}
