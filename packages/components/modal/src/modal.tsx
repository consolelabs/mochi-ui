import * as React from 'react'
import * as ModalPrimitive from '@radix-ui/react-dialog'
import { CloseLine } from '@mochi-ui/icons'
import { modal } from '@mochi-ui/theme'

const {
  modalOverlayClsx,
  modalContentClsx,
  modalCloseButtonClsx,
  modalTitleClsx,
  modalDescriptionClsx,
} = modal

const Modal = ModalPrimitive.Root

const ModalPortal = ModalPrimitive.Portal

const ModalClose = ModalPrimitive.Close

type ModalOverlayProps = React.ComponentPropsWithoutRef<
  typeof ModalPrimitive.Overlay
>

const ModalTrigger = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Trigger
    ref={ref}
    className={modal.modalTriggerClsx({ className })}
    {...props}
  />
))

ModalTrigger.displayName = ModalPrimitive.Trigger.displayName

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Overlay>,
  ModalOverlayProps
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Overlay
    className={modalOverlayClsx({ className })}
    ref={ref}
    {...props}
  />
))
ModalOverlay.displayName = ModalPrimitive.Overlay.displayName

type ModalContentProps = React.ComponentPropsWithoutRef<
  typeof ModalPrimitive.Content
> & {
  showCloseBtn?: boolean
}

const ModalContent = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Content>,
  ModalContentProps
>(({ className, children, showCloseBtn, ...props }, ref) => (
  <ModalPrimitive.Content
    className={modalContentClsx({ className })}
    ref={ref}
    {...props}
  >
    {children}
    {showCloseBtn ? (
      <ModalClose className={modalCloseButtonClsx()}>
        <CloseLine />
      </ModalClose>
    ) : null}
  </ModalPrimitive.Content>
))
ModalContent.displayName = ModalPrimitive.Content.displayName

type ModalTitleProps = React.ComponentPropsWithoutRef<
  typeof ModalPrimitive.Title
>

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Title>,
  ModalTitleProps
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Title
    className={modalTitleClsx({ className })}
    ref={ref}
    {...props}
  />
))
ModalTitle.displayName = ModalPrimitive.Title.displayName

type ModalDescriptionProps = React.ComponentPropsWithoutRef<
  typeof ModalPrimitive.Description
>

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Description>,
  ModalDescriptionProps
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Description
    className={modalDescriptionClsx({ className })}
    ref={ref}
    {...props}
  />
))
ModalDescription.displayName = ModalPrimitive.Description.displayName

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalTrigger,
  ModalContent,
  ModalTitle,
  ModalDescription,
  type ModalOverlayProps,
  type ModalTitleProps,
  type ModalContentProps,
  type ModalDescriptionProps,
}
