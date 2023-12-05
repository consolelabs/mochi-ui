import {
  AlertLink,
  AlertLinkProps,
  PolymorphicAlertLink,
} from '@mochi-ui/alert'

type PolymorphicToastLink = PolymorphicAlertLink
type ToastLinkProps = AlertLinkProps

const ToastLink = AlertLink
ToastLink.displayName = 'ToastConfirmButton'

export { ToastLink }
export type { ToastLinkProps, PolymorphicToastLink }
