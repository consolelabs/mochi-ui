import { ViewPortStyleProps } from '@mochi-ui/theme'
import { ToastViewPort, ToastProvider, Toast } from './toast'
import { ToastTitle } from './toast-title'
import { ToastClose } from './toast-close'
import { useToast } from './hook/use-toast/use-toast'
import { ToastIcon } from './toast-icon'
import { ToastDescription } from './toast-description'
import { ToastActionGroup } from './toast-action-group'
import { ToastConfirmButton } from './toast-confirm'
import { ToastLink } from './toast-link'
import { ToastBody } from './toast-body'
import { ToastCancelButton } from './toast-cancel'

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
          paddingSize: paddingSizeProp,
          layout,
          ...restProps
        } = props

        const paddingSize =
          paddingSizeProp ?? (layout === 'stack' ? 'large' : 'default')

        return (
          <Toast
            key={id}
            {...restProps}
            paddingSize={paddingSize}
            layout={layout}
          >
            <ToastIcon {...icon} />
            <ToastBody>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description} </ToastDescription>
              )}
              {link && <ToastLink {...link} />}
            </ToastBody>
            {(confirm || cancel) && (
              <ToastActionGroup>
                {confirm && (
                  <ToastConfirmButton {...confirm}>
                    {confirm.label}
                  </ToastConfirmButton>
                )}
                {cancel && (
                  <ToastCancelButton {...cancel}>
                    {cancel.label}
                  </ToastCancelButton>
                )}
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
