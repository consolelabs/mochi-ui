import { ComponentPropsWithRef, forwardRef } from 'react'
import type * as Polymorphic from '@consolelabs/polymorphic'
import { AlertLink, AlertLinkProps } from '@consolelabs/alert'

type PolymorphicToastLink = Polymorphic.ForwardRefComponent<'a', AlertLinkProps>

const ToastLink = forwardRef((props, ref) => {
  return <AlertLink ref={ref} {...props} />
}) as PolymorphicToastLink

ToastLink.displayName = 'ToastConfirmButton'

type ToastLinkProps = ComponentPropsWithRef<typeof ToastLink>

export { ToastLink, type ToastLinkProps }
