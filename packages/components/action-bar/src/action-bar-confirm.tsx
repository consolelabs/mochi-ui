import {
  AlertConfirmButton,
  AlertConfirmProps,
  PolymorphicAlertConfirmButton,
} from '@mochi-ui/alert'
import { forwardRef } from 'react'

type ActionBarConfirmButtonProps = AlertConfirmProps
type PolymorphicActionBarConfirmButton = PolymorphicAlertConfirmButton

const ActionBarConfirmButton = forwardRef((props, ref) => (
  <AlertConfirmButton {...props} ref={ref} />
)) as PolymorphicActionBarConfirmButton

ActionBarConfirmButton.displayName = 'ActionBarConfirmButton'

export { ActionBarConfirmButton }
export type { ActionBarConfirmButtonProps, PolymorphicActionBarConfirmButton }
