import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'

export type ToastActionRef = ElementRef<typeof ToastPrimitive.Action>

export type ToastActionProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Action
>
export type ToastCloseRef = ElementRef<typeof ToastPrimitive.Close>

export type ToastCloseProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Close
>
