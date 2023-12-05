import {
  AlertBodyProps,
  AlertBody,
  PolymorphicAlertBody,
} from '@mochi-ui/alert'

type ToastBodyProps = AlertBodyProps

type PolymorphicToastBody = PolymorphicAlertBody

const ToastBody = AlertBody
ToastBody.displayName = 'ToastBody'

export type { ToastBodyProps, PolymorphicToastBody }
export { ToastBody }
