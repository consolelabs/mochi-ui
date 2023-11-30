import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'

export type ToastViewPortProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Viewport
>

export type ToastViewPortRef = ElementRef<typeof ToastPrimitive.Viewport>

export type ToastProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Root>

export type ToastRef = ElementRef<typeof ToastPrimitive.Root>

export type ToastActionRef = ElementRef<typeof ToastPrimitive.Action>

export type ToastActionProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Action
>

export type ToastTitleRef = ElementRef<typeof ToastPrimitive.Title>

export type ToastTitleProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Title
>

export type ToastDescriptionRef = ElementRef<typeof ToastPrimitive.Description>

export type ToastDescriptionProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Description
>

export type ToastCloseRef = ElementRef<typeof ToastPrimitive.Close>

export type ToastCloseProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Close
>
