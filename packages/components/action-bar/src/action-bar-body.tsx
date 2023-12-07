import {
  AlertBody,
  AlertBodyProps,
  PolymorphicAlertBody,
} from '@mochi-ui/alert'
import { forwardRef } from 'react'

type ActionBarBodyProps = AlertBodyProps
type PolymorphicActionBarBody = PolymorphicAlertBody

const ActionBarBody = forwardRef((props, ref) => {
  return <AlertBody {...props} ref={ref} />
}) as PolymorphicActionBarBody

export { ActionBarBody }
export type { ActionBarBodyProps, PolymorphicActionBarBody }
