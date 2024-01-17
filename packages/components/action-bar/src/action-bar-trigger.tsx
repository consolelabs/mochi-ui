import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

type ActionBarTriggerProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Trigger
>
const ActionBarTrigger = forwardRef<
  ElementRef<typeof PopoverPrimitive.Trigger>,
  ActionBarTriggerProps
>((props, ref) => <PopoverPrimitive.Trigger ref={ref} {...props} />)

ActionBarTrigger.displayName = 'ActionBarTrigger'

export { ActionBarTrigger }
export type { ActionBarTriggerProps }
