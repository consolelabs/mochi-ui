import {
  AlertTitle,
  AlertTitleProps,
  PolymorphicAlertTitle,
} from '@mochi-ui/alert'
import { forwardRef } from 'react'

type ActionBarTitleProps = AlertTitleProps
type PolymorphicActionbarTitle = PolymorphicAlertTitle

const ActionBarTitle = forwardRef((props, ref) => (
  <AlertTitle {...props} ref={ref} />
)) as PolymorphicActionbarTitle

export { ActionBarTitle }
export type { PolymorphicActionbarTitle, ActionBarTitleProps }
