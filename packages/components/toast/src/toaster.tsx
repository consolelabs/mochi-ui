import {
  ToastProvider,
  ToastTitle,
  Toast,
  ToastDescription,
  ToastClose,
  ToastViewPort,
} from './toast'
import { useToast } from './hook/use-toast'

export const Toaster = () => {
  const { toasts } = useToast()
  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewPort />
    </ToastProvider>
  )
}
