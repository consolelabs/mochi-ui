import { ViewPortStyleProps } from '@consolelabs/theme'
import { ToastViewPort, ToastProvider, Toast } from './toast'
import { ToastTitle } from './toast-title'
import { ToastClose } from './toast-close'
import { useToast } from './hook/use-toast'
import { ToastIcon } from './toast-icon'
import { ToastDescription } from './toast-description'
import { ToastActionGroup } from './toast-action-group'
import { ToastConfirmButton } from './toast-confirm'
import { ToastLink } from './toast-link'

export const Toaster = (props: ViewPortStyleProps) => {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map((props) => {
        const {
          id,
          title,
          description,
          confirm,
          cancel,
          link,
          icon,
          ...restProps
        } = props
        return (
          <Toast key={id} {...restProps}>
            <ToastIcon {...icon} />
            {title && <ToastTitle {...title} />}
            {description && <ToastDescription {...description} />}
            {link && <ToastLink {...link} />}
            {(confirm || cancel) && (
              <ToastActionGroup>
                {confirm && <ToastConfirmButton {...confirm} />}
                {cancel && <ToastConfirmButton {...cancel} />}
              </ToastActionGroup>
            )}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewPort {...props} />
    </ToastProvider>
  )
}
