import { AlertActionGroup } from '@consolelabs/alert'
import { ComponentPropsWithoutRef } from 'react'

const ToastActionGroup = AlertActionGroup

ToastActionGroup.displayName = 'ToastActionGroup'

type ToastActionGroupProps = ComponentPropsWithoutRef<typeof ToastActionGroup>

export { type ToastActionGroupProps, ToastActionGroup }
