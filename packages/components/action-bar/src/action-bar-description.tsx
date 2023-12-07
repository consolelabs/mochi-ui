import {
  AlertDescription,
  AlertDescriptionProps,
  PolymorphicAlertDescription,
} from '@mochi-ui/alert'
import * as ModalPrimitive from '@radix-ui/react-dialog'
import { forwardRef } from 'react'

type ActionBarDescriptionProps = AlertDescriptionProps
type PolymorphicActionBarDescription = PolymorphicAlertDescription

const ActionBarDescription = forwardRef((props, ref) => (
  <ModalPrimitive.Description asChild>
    <AlertDescription {...props} ref={ref} />
  </ModalPrimitive.Description>
)) as PolymorphicActionBarDescription

export type { ActionBarDescriptionProps, PolymorphicActionBarDescription }
export { ActionBarDescription }
