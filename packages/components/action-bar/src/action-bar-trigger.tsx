import { forwardRef } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

const ActionBarTrigger = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>((props, ref) => <PopoverPrimitive.Trigger ref={ref} {...props} />)

ActionBarTrigger.displayName = 'ActionBarTrigger'

export { ActionBarTrigger }
