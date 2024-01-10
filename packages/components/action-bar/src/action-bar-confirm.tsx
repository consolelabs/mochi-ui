import { AlertConfirmButton, AlertConfirmProps } from '@mochi-ui/alert'
import { ElementRef, forwardRef } from 'react'

type ActionBarConfirmButtonProps = AlertConfirmProps

const ActionBarConfirmButton = forwardRef<
  ElementRef<typeof AlertConfirmButton>,
  ActionBarConfirmButtonProps
>((props, ref) => <AlertConfirmButton {...props} ref={ref} />)

ActionBarConfirmButton.displayName = 'ActionBarConfirmButton'

export { ActionBarConfirmButton }
export type { ActionBarConfirmButtonProps }
