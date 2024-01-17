import { AlertCancelButton, AlertCancelProps } from '@mochi-ui/alert'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ElementRef, forwardRef } from 'react'

type ActionBarCancelButtonProps = AlertCancelProps

const ActionBarCancelButton = forwardRef<
  ElementRef<typeof AlertCancelButton>,
  ActionBarCancelButtonProps
>((props, ref) => (
  <PopoverPrimitive.Close asChild>
    <AlertCancelButton {...props} ref={ref} />
  </PopoverPrimitive.Close>
))

ActionBarCancelButton.displayName = 'ActionBarCancelButton'

export { ActionBarCancelButton }
export type { ActionBarCancelButtonProps }
