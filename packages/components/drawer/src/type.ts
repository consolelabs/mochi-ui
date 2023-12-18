import * as ModalPrimitive from '@radix-ui/react-dialog'

export type DrawerAnchor = 'top' | 'left' | 'bottom' | 'right'

export type DrawerProps = DrawerRootProps & {
  anchor?: DrawerAnchor
}

type DrawerRootProps = React.ComponentPropsWithoutRef<
  typeof ModalPrimitive.Root
>

type DrawerOverlayProps = React.ComponentPropsWithoutRef<
  typeof ModalPrimitive.Overlay
>

type DrawerTitleProps = React.ComponentPropsWithoutRef<
  typeof ModalPrimitive.Title
>

type DrawerContentProps = React.ComponentPropsWithoutRef<
  typeof ModalPrimitive.Content
> & {
  showCloseBtn?: boolean
}

type DrawerDescriptionProps = React.ComponentPropsWithoutRef<
  typeof ModalPrimitive.Description
>

export {
  type DrawerRootProps,
  type DrawerOverlayProps,
  type DrawerTitleProps,
  type DrawerContentProps,
  type DrawerDescriptionProps,
}
