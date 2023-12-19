import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { CloseLine } from '@mochi-ui/icons'
import { drawer } from '@mochi-ui/theme'
import { DrawerContextProvider, useDrawerContext } from './context'
import {
  DrawerProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerOverlayProps,
  DrawerTitleProps,
  DrawerRootProps,
} from './type'

const {
  drawerOverlayClsx,
  drawerContentCva,
  drawerCloseButtonClsx,
  drawerTitleClsx,
  drawerDescriptionClsx,
  drawerTriggerClsx,
} = drawer

const Drawer = (props: DrawerProps) => {
  const { anchor = 'left', children, ...rest } = props

  return (
    <DrawerContextProvider value={{ anchor }}>
      <DialogPrimitive.Root {...rest}>{children}</DialogPrimitive.Root>
    </DrawerContextProvider>
  )
}

const DrawerPortal = DialogPrimitive.Portal

const DrawerClose = DialogPrimitive.Close

const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Trigger
      ref={ref}
      className={drawerTriggerClsx({ className })}
      {...props}
    />
  )
})

DrawerTrigger.displayName = 'DrawerTrigger'

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DrawerOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={drawerOverlayClsx({ className })}
    ref={ref}
    {...props}
  />
))
DrawerOverlay.displayName = DialogPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ className, children, showCloseBtn, ...props }, ref) => {
  const { anchor } = useDrawerContext()

  return (
    <DialogPrimitive.Content
      className={drawerContentCva({ className, anchor })}
      ref={ref}
      {...props}
    >
      {children}
      {showCloseBtn ? (
        <DrawerClose className={drawerCloseButtonClsx()}>
          <CloseLine />
        </DrawerClose>
      ) : null}
    </DialogPrimitive.Content>
  )
})
DrawerContent.displayName = DialogPrimitive.Content.displayName

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  DrawerTitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    className={drawerTitleClsx({ className })}
    ref={ref}
    {...props}
  />
))
DrawerTitle.displayName = DialogPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    className={drawerDescriptionClsx({ className })}
    ref={ref}
    {...props}
  />
))
DrawerDescription.displayName = DialogPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerClose,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  type DrawerRootProps,
  type DrawerProps,
  type DrawerContentProps,
  type DrawerDescriptionProps,
  type DrawerOverlayProps,
  type DrawerTitleProps,
}
