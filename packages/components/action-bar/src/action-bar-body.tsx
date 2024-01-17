import { AlertBody, AlertBodyProps } from '@mochi-ui/alert'
import { ElementRef, forwardRef } from 'react'

type ActionBarBodyProps = AlertBodyProps

const ActionBarBody = forwardRef<
  ElementRef<typeof AlertBody>,
  ActionBarBodyProps
>((props, ref) => {
  return <AlertBody {...props} ref={ref} />
})

ActionBarBody.displayName = 'ActionBarBody'

export { ActionBarBody }
export type { ActionBarBodyProps }
