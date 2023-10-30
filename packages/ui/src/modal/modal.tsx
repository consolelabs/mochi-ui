import * as React from 'react'
import * as ModalPrimitive from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { IconClose } from '@consolelabs/icons'

const Modal = ModalPrimitive.Root

const ModalTrigger = ModalPrimitive.Trigger

const ModalPortal = ModalPrimitive.Portal

const ModalClose = ModalPrimitive.Close

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Overlay
    className={clsx('fixed inset-0 z-50 bg-black/40', className)}
    ref={ref}
    {...props}
  />
))
ModalOverlay.displayName = ModalPrimitive.Overlay.displayName

const ModalContent = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Content> & {
    showCloseBtn?: boolean
  }
>(({ className, children, showCloseBtn, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <ModalPrimitive.Content
      className={clsx(
        'fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg duration-200 rounded-xl',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      {showCloseBtn ? (
        <ModalClose className="!m-0 absolute translate-x-1/2 -translate-y-1/2 right-6 top-6 rounded-full border border-neutral-300 opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none w-6 h-6 flex items-center justify-center">
          <IconClose />
        </ModalClose>
      ) : null}
    </ModalPrimitive.Content>
  </ModalPortal>
))
ModalContent.displayName = ModalPrimitive.Content.displayName

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Title
    className={clsx('text-lg font-medium tracking-tight', className)}
    ref={ref}
    {...props}
  />
))
ModalTitle.displayName = ModalPrimitive.Title.displayName

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Description
    className={clsx('text-sm', className)}
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
}
