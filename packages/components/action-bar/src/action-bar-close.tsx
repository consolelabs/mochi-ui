import {
  AlertCloseButton,
  AlertCloseButtonProps,
  PolymorphicAlertCloseButton,
} from '@mochi-ui/alert'
import * as ModalPrimitive from '@radix-ui/react-dialog'
import { forwardRef } from 'react'

type ActionBarCloseButtonProps = AlertCloseButtonProps
type PolymorphicActionBarCloseButton = PolymorphicAlertCloseButton

const ActionBarCloseButton = forwardRef((props, ref) => (
  <ModalPrimitive.Close asChild>
    <AlertCloseButton ref={ref} {...props} />
  </ModalPrimitive.Close>
)) as PolymorphicActionBarCloseButton

export { ActionBarCloseButton }
export type { ActionBarCloseButtonProps, PolymorphicActionBarCloseButton }
