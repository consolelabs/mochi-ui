import { AlertActionGroup, AlertActionGroupProps } from '@mochi-ui/alert'
import { ElementRef, forwardRef } from 'react'

type ActionBarActionGroupProps = AlertActionGroupProps

const ActionBarActionGroup = forwardRef<
  ElementRef<typeof AlertActionGroup>,
  ActionBarActionGroupProps
>((props, ref) => <AlertActionGroup ref={ref} {...props} />)

ActionBarActionGroup.displayName = 'ActionBarActionGroup'

export { ActionBarActionGroup }
export type { ActionBarActionGroupProps }
