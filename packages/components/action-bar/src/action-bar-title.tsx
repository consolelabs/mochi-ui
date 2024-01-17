import { AlertTitle, AlertTitleProps } from '@mochi-ui/alert'
import { ElementRef, forwardRef } from 'react'

type ActionBarTitleProps = AlertTitleProps

const ActionBarTitle = forwardRef<
  ElementRef<typeof AlertTitle>,
  ActionBarTitleProps
>((props, ref) => <AlertTitle {...props} ref={ref} />)

ActionBarTitle.displayName = 'ActionBarTitle'

export { ActionBarTitle }
export type { ActionBarTitleProps }
