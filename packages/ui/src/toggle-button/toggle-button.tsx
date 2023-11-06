import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import React from 'react'

const toggleButton = cva([
  'border border-neutral-300 rounded px-2 py-1 hover:bg-neutral-100 data-[state=on]:bg-primary-700 data-[state=on]:text-white data-[state=on]:hover:bg-primary-800 disabled:text-neutral-400 disabled:bg-white disabled:cursor-not-allowed',
])

type Props = React.ComponentPropsWithoutRef<typeof ToggleGroup.Item> &
  VariantProps<typeof toggleButton>

const ToggleButton = React.forwardRef<
  React.ElementRef<typeof ToggleGroup.Item>,
  Props
>(({ className, ...props }, ref) => (
  <ToggleGroup.Item
    className={toggleButton({ className })}
    ref={ref}
    {...props}
  />
))
ToggleButton.displayName = ToggleGroup.Item.displayName

export { ToggleButton }
