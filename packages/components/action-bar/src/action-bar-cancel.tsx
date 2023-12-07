import {
  AlertCancelButton,
  AlertCancelProps,
  PolymorphicAlertCancelButton,
} from '@mochi-ui/alert'
import * as ModalPrimitive from '@radix-ui/react-dialog'
import { forwardRef } from 'react'

type ActionBarCancelButtonProps = AlertCancelProps
type PolymorphicActionBarCancelButton = PolymorphicAlertCancelButton

const ActionBarCancelButton = forwardRef((props, ref) => (
  <ModalPrimitive.Close asChild>
    <AlertCancelButton {...props} ref={ref} />
  </ModalPrimitive.Close>
)) as PolymorphicActionBarCancelButton

export { ActionBarCancelButton }
export type { ActionBarCancelButtonProps, PolymorphicActionBarCancelButton }
