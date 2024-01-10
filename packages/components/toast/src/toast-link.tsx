import { AlertLink, AlertLinkProps } from '@mochi-ui/alert'

type ToastLinkProps = AlertLinkProps

const ToastLink = AlertLink
ToastLink.displayName = 'ToastConfirmButton'

export { ToastLink }
export type { ToastLinkProps }
