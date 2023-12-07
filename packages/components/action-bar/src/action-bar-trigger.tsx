import { forwardRef } from 'react'
import * as ModalPrimitive from '@radix-ui/react-dialog'

const ActionBarTrigger = forwardRef<
  React.ElementRef<typeof ModalPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Trigger>
>((props, ref) => <ModalPrimitive.Trigger ref={ref} {...props} />)

export { ActionBarTrigger }
