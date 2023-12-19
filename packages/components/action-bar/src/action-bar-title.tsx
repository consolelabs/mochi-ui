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

ActionBarTitle.displayName = 'ActionBarTitle'

export { ActionBarTitle }
export type { PolymorphicActionbarTitle, ActionBarTitleProps }
