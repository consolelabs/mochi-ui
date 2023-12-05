import { ToastIconProps } from '../../toast-icon'
import { ACTION_TYPES } from './constants'
import { ToastProps } from '../../toast'
import { ToastConfirmProps } from '../../toast-confirm'
import { ToastCancelButtonProps } from '../../toast-cancel'
import { ToastLinkProps } from '../../toast-link'

type Toast = Omit<ToasterToast, 'id'>

type ToasterToast = Omit<ToastProps, keyof HTMLLIElement> & {
  id: string
  title?: string
  description?: string
  confirm?: {
    label: string
  } & Omit<ToastConfirmProps, 'children'>
  cancel?: {
    label: string
  } & ToastCancelButtonProps
  link?: {
    label: string
  } & ToastLinkProps
  icon?: ToastIconProps
}

type ActionType = typeof ACTION_TYPES

type Action =
  | {
      type: ActionType['ADD_TOAST']
      toast: ToasterToast
    }
  | {
      type: ActionType['UPDATE_TOAST']
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType['DISMISS_TOAST']
      toastId?: ToasterToast['id']
    }
  | {
      type: ActionType['REMOVE_TOAST']
      toastId?: ToasterToast['id']
    }

interface State {
  toasts: ToasterToast[]
}

export type { State, Action, Toast, ToasterToast }
