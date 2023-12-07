import {
  AlertDescription,
  AlertDescriptionProps,
  PolymorphicAlertDescription,
} from '@mochi-ui/alert'
import { forwardRef } from 'react'

type ActionBarDescriptionProps = AlertDescriptionProps
type PolymorphicActionBarDescription = PolymorphicAlertDescription

const ActionBarDescription = forwardRef((props, ref) => (
  <AlertDescription {...props} ref={ref} />
)) as PolymorphicActionBarDescription

export type { ActionBarDescriptionProps, PolymorphicActionBarDescription }
export { ActionBarDescription }
