import {
  AlertTitle,
  AlertTitleProps,
  PolymorphicAlertTitle,
} from '@mochi-ui/alert'
import * as ModalPrimitive from '@radix-ui/react-dialog'
import { forwardRef } from 'react'

type ActionBarTitleProps = AlertTitleProps
type PolymorphicActionbarTitle = PolymorphicAlertTitle

const ActionBarTitle = forwardRef((props, ref) => (
  <ModalPrimitive.Title asChild>
    <AlertTitle {...props} ref={ref} />
  </ModalPrimitive.Title>
)) as PolymorphicActionbarTitle

export { ActionBarTitle }
export type { PolymorphicActionbarTitle, ActionBarTitleProps }
