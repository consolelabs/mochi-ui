import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import { Footer } from './footer'

interface Props {
  children: React.ReactNode
  noFooter?: boolean
  className?: string
  footer?: React.ReactNode
}

export const Layout = forwardRef<ElementRef<'div'>, Props>((props, ref) => (
  <div
    ref={ref}
    className={clsx(
      'flex flex-col max-w-[100vw] h-[calc(100dvh-56px)] overflow-y-auto',
      props.className ?? '',
    )}
  >
    {props.children}
    {!(props.noFooter ?? false) && (props.footer || <Footer />)}
  </div>
))
