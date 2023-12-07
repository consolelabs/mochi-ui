import {
  AlertCancelButton,
  AlertCancelProps,
  PolymorphicAlertCancelButton,
} from '@mochi-ui/alert'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { forwardRef } from 'react'

type ActionBarCancelButtonProps = AlertCancelProps
type PolymorphicActionBarCancelButton = PolymorphicAlertCancelButton

const ActionBarCancelButton = forwardRef((props, ref) => (
  <PopoverPrimitive.Close asChild>
    <AlertCancelButton {...props} ref={ref} />
  </PopoverPrimitive.Close>
)) as PolymorphicActionBarCancelButton

export { ActionBarCancelButton }
export type { ActionBarCancelButtonProps, PolymorphicActionBarCancelButton }
