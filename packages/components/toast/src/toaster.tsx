import { ViewPortStyleProps } from '@mochi-ui/theme'
import { ToastProviderProps } from './type'
import { ToastViewPort, ToastProvider, Toast } from './toast'
import { ToastTitle } from './toast-title'
import { ToastClose } from './toast-close'
import { useToast } from './hook/use-toast/use-toast'
import { ToastIcon } from './toast-icon'
import { ToastDescription } from './toast-description'
import { ToastLink } from './toast-link'
import { ToastBody } from './toast-body'

export type ToasterProps = ViewPortStyleProps &
  ToastProviderProps & {
    className?: string
    toastClassName?: string
    toastFit?: boolean
  }

export const Toaster = (props: ToasterProps) => {
  const { toasts } = useToast()
  const { className, toastClassName, direction, align, ...restProps } = props
  return (
    <ToastProvider {...restProps}>
      {toasts.map((toastProps) => {
        const {
          id,
          title,
          description,
          link,
          icon,
          paddingSize: paddingSizeProp,
          shadow = false,
          layout = 'stack',
          fullWidth = false,
          ...restToastProps
        } = toastProps

        const paddingSize =
          paddingSizeProp ?? (layout === 'stack' ? 'large' : 'default')

        return (
          <Toast
            key={id}
            {...restToastProps}
            paddingSize={paddingSize}
            layout={layout}
            shadow={shadow}
            className={toastClassName}
            fullWidth={fullWidth}
          >
            <ToastIcon {...icon} />
            <ToastBody>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
              {link && <ToastLink {...link} />}
            </ToastBody>
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewPort
        className={className}
        direction={direction}
        align={align}
      />
    </ToastProvider>
  )
}
