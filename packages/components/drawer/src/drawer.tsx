import * as React from 'react'
import * as ModalPrimitive from '@radix-ui/react-dialog'
import { CloseLine } from '@mochi-ui/icons'
import { drawer } from '@mochi-ui/theme'
import { styled } from '@stitches/react'
import { DrawerContextProvider, useDrawerContext } from './context'
import { getTransitionByAnchor } from './utils'
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

const DrawerRoot = ({ children, ...rest }: DrawerRootProps) => {
  const { open, onOpenChange } = useDrawerContext()

  return (
    <ModalPrimitive.Root open={open} onOpenChange={onOpenChange} {...rest}>
      {children}
    </ModalPrimitive.Root>
  )
}

const Drawer = (props: DrawerProps) => {
  const {
    open: openProp = false,
    onOpenChange: onOpenChangeProp,
    anchor = 'left',
    children,
    ...rest
  } = props

  const [open, setIsOpen] = React.useState(openProp)

  const onOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  return (
    <DrawerContextProvider
      value={{ open, onOpenChange: onOpenChangeProp ?? onOpenChange, anchor }}
    >
      <DrawerRoot {...rest}>{children}</DrawerRoot>
    </DrawerContextProvider>
  )
}

const DrawerPortal = ModalPrimitive.Portal

const DrawerClose = ModalPrimitive.Close

const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  return (
    <ModalPrimitive.Trigger
      ref={ref}
      className={drawerTriggerClsx({ className })}
      {...props}
    />
  )
})

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Overlay>,
  DrawerOverlayProps
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Overlay
    className={drawerOverlayClsx({ className })}
    ref={ref}
    {...props}
  />
))
DrawerOverlay.displayName = ModalPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Content>,
  DrawerContentProps
>(({ className, children, showCloseBtn, ...props }, ref) => {
  const { anchor } = useDrawerContext()

  const StyledDrawerContent = styled(ModalPrimitive.Content, {
    '@media (prefers-reduced-motion: no-preference)': {
      animation: `${getTransitionByAnchor(anchor)} 350ms`,
    },
  })

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <StyledDrawerContent
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
      </StyledDrawerContent>
    </DrawerPortal>
  )
})
DrawerContent.displayName = ModalPrimitive.Content.displayName

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Title>,
  DrawerTitleProps
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Title
    className={drawerTitleClsx({ className })}
    ref={ref}
    {...props}
  />
))
DrawerTitle.displayName = ModalPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Description>,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Description
    className={drawerDescriptionClsx({ className })}
    ref={ref}
    {...props}
  />
))
DrawerDescription.displayName = ModalPrimitive.Description.displayName

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
