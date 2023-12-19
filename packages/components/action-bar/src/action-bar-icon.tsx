import { AlertIcon, AlertIconProps } from '@mochi-ui/alert'
import { ElementRef, forwardRef } from 'react'

type ActionBarIconProps = AlertIconProps

const ActionBarIcon = forwardRef<
  ElementRef<typeof AlertIcon>,
  ActionBarIconProps
>((props, ref) => <AlertIcon {...props} ref={ref} />)

ActionBarIcon.displayName = 'ActionBarIcon'

export { ActionBarIcon }
export type { ActionBarIconProps }
