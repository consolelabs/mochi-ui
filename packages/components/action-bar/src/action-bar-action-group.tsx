import { ElementRef, forwardRef } from 'react'
import { AlertActionGroup, AlertActionGroupProps } from '@mochi-ui/alert'

// NOTE: this fix build err
// The inferred type of 'ActionBarActionGroup' cannot be named without a reference to '../../alert/node_modules/@mochi-ui/theme/src'.
interface ActionBarActionGroupProps extends AlertActionGroupProps {}

const ActionBarActionGroup = forwardRef<
  ElementRef<typeof AlertActionGroup>,
  ActionBarActionGroupProps
>((props, ref) => <AlertActionGroup ref={ref} {...props} />)

ActionBarActionGroup.displayName = 'ActionBarActionGroup'

export { ActionBarActionGroup }
export type { ActionBarActionGroupProps }
