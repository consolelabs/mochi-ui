import * as React from 'react'
import * as ModalPrimitive from '@radix-ui/react-dialog'
import { CloseLine } from '@mochi-ui/icons'
import { modal } from '@mochi-ui/theme'
import { Transition, TransitionStatus } from 'react-transition-group'
import { createContext } from '@dwarvesf/react-utils'
import { useMergeRefs } from '@dwarvesf/react-hooks'

const {
  modalOverlayClsx,
  modalContentClsx,
  modalCloseButtonClsx,
  modalTitleClsx,
  modalDescriptionClsx,
} = modal

interface State {
  status: TransitionStatus
  nodeRef: React.MutableRefObject<React.ElementRef<
    typeof ModalPrimitive.Content
  > | null>
}

const [ModalContextProvider, useModalContext] = createContext<State>({
  name: 'ModalContext',
})

const Modal = ({
  open,
  modal,
  onOpenChange,
  ...props
}: React.ComponentPropsWithoutRef<typeof ModalPrimitive.Root>) => {
  const nodeRef = React.useRef<React.ElementRef<
    typeof ModalPrimitive.Content
  > | null>(null)
  const [internalOpen, setInternalOpen] = React.useState(false)

  return (
    <Transition
      nodeRef={nodeRef}
      in={modal ? internalOpen : open}
      timeout={{ exit: 200 }}
    >
      {(status) => (
        <ModalContextProvider value={{ status, nodeRef }}>
          <ModalPrimitive.Root
            {...props}
            modal={modal}
            open={status !== 'exited'}
            onOpenChange={(open) => {
              setInternalOpen(open)
              onOpenChange?.(open)
            }}
          />
        </ModalContextProvider>
      )}
    </Transition>
  )
}

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
>(({ className, children, showCloseBtn, ...props }, ref) => {
  const { status, nodeRef } = useModalContext()
  const refs = useMergeRefs(nodeRef, ref)

  return (
    <ModalPrimitive.Content
      className={modalContentClsx({ className, status })}
      ref={refs}
      {...props}
    >
      {children}
      {showCloseBtn ? (
        <ModalClose className={modalCloseButtonClsx()}>
          <CloseLine />
        </ModalClose>
      ) : null}
    </ModalPrimitive.Content>
  )
})
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
