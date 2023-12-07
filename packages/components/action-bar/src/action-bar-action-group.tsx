import {
  AlertActionGroup,
  AlertActionGroupProps,
  PolymorphicAlertActionGroup,
} from '@mochi-ui/alert'
import { forwardRef } from 'react'

type ActionBarActionGroupProps = AlertActionGroupProps

type PolymorphicActionBarActionGroup = PolymorphicAlertActionGroup

const ActionBarActionGroup = forwardRef((props, ref) => (
  <AlertActionGroup ref={ref} {...props} />
)) as PolymorphicActionBarActionGroup

export { ActionBarActionGroup }
export type { ActionBarActionGroupProps, PolymorphicActionBarActionGroup }
