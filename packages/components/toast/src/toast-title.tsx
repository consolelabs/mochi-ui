import {
  AlertTitle,
  AlertTitleProps,
  PolymorphicAlertTitle,
} from '@mochi-ui/alert'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { forwardRef } from 'react'

type PolymorphicToastTitle = PolymorphicAlertTitle
type ToastTitleProps = AlertTitleProps

const ToastTitle = forwardRef((props, ref) => {
  return (
    <ToastPrimitive.Title asChild>
      <AlertTitle ref={ref} {...props} />
    </ToastPrimitive.Title>
  )
}) as PolymorphicToastTitle

ToastTitle.displayName = ToastPrimitive.Title.displayName

export { ToastTitle, type ToastTitleProps, type PolymorphicToastTitle }
