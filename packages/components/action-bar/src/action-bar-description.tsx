import { AlertDescription, AlertDescriptionProps } from '@mochi-ui/alert'
import { ElementRef, forwardRef } from 'react'

type ActionBarDescriptionProps = AlertDescriptionProps

const ActionBarDescription = forwardRef<
  ElementRef<typeof AlertDescription>,
  ActionBarDescriptionProps
>((props, ref) => <AlertDescription {...props} ref={ref} />)

ActionBarDescription.displayName = 'ActionBarDescription'

export type { ActionBarDescriptionProps }
export { ActionBarDescription }
