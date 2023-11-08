import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import React from 'react'

const toggleButtonGroup = cva(['flex gap-x-2'])

type Props = React.ComponentPropsWithoutRef<typeof ToggleGroup.Root> &
  VariantProps<typeof toggleButtonGroup>

const ToggleButtonGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroup.Root>,
  Props
>(({ className, ...props }, ref) => (
  <ToggleGroup.Root
    className={toggleButtonGroup({ className })}
    ref={ref}
    {...props}
  />
))
ToggleButtonGroup.displayName = ToggleGroup.Root.displayName

export { ToggleButtonGroup }
