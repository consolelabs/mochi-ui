import { AlertIcon } from '@mochi-ui/alert'
import { ComponentPropsWithRef } from 'react'

const ToastIcon = AlertIcon
ToastIcon.displayName = 'ToastIcon'

type ToastIconProps = ComponentPropsWithRef<typeof ToastIcon>

export { ToastIcon, type ToastIconProps }
