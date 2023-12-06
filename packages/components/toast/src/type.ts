import * as ToastPrimitive from '@radix-ui/react-toast'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { type ToastProviderProps as PrimitiveProviderProps } from '@radix-ui/react-toast'
import { ToastStyleProps, ViewPortStyleProps } from '@mochi-ui/theme'
import { AlertProps } from '@mochi-ui/alert'

export type ToastCloseRef = ElementRef<typeof ToastPrimitive.Close>

export type ToastCloseProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Close
>

export type ToastProviderProps = PrimitiveProviderProps

export type ToastViewPortProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Viewport
> &
  ViewPortStyleProps

export type ToastViewPortRef = ElementRef<typeof ToastPrimitive.Viewport>

export type ToastProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Root> &
  AlertProps &
  ToastStyleProps

export type ToastRef = ElementRef<typeof ToastPrimitive.Root>
