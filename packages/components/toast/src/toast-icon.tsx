import { AlertIcon } from '@consolelabs/alert'
import { ComponentPropsWithRef } from 'react'

const ToastIcon = AlertIcon
ToastIcon.displayName = 'ToastIcon'

type ToastIconProps = ComponentPropsWithRef<typeof ToastIcon>

export { ToastIcon, type ToastIconProps }
