import * as React from 'react'
import * as ModalPrimitive from '@radix-ui/react-dialog'
import { IconClose } from '@consolelabs/icons'
import { modal } from '@consolelabs/theme'

const {
  modalOverlayClsx,
  modalContentClsx,
  modalCloseButtonClsx,
  modalTitleClsx,
  modalDescriptionClsx,
} = modal

const Modal = ModalPrimitive.Root

const ModalTrigger = ModalPrimitive.Trigger

const ModalPortal = ModalPrimitive.Portal

const ModalClose = ModalPrimitive.Close

type ModalOverlayProps = React.ComponentPropsWithoutRef<
  typeof ModalPrimitive.Overlay
>

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
  <ModalPortal>
    <ModalOverlay />
    <ModalPrimitive.Content
      className={modalContentClsx({ className })}
      ref={ref}
      {...props}
    >
      {children}
      {showCloseBtn ? (
        <ModalClose className={modalCloseButtonClsx()}>
          <IconClose />
        </ModalClose>
      ) : null}
    </ModalPrimitive.Content>
  </ModalPortal>
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
