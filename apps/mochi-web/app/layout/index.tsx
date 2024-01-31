import clsx from 'clsx'
import { ElementRef, ReactNode, forwardRef } from 'react'
import { Footer } from './footer'

interface Props {
  children: React.ReactNode
  noFooter?: boolean
  className?: string
  footer?: ReactNode
  hasChangelogAlert?: boolean
}

export const Layout = forwardRef<ElementRef<'div'>, Props>((props, ref) => {
  const { footer, hasChangelogAlert } = props
  return (
    <div
      ref={ref}
      className={clsx(
        'flex flex-col max-w-[100vw] overflow-y-auto',
        hasChangelogAlert
          ? 'h-[calc(100vh-56px-56px)]'
          : 'h-[calc(100vh-56px)]',
        props.className ?? '',
      )}
    >
      {props.children}
      {!(props.noFooter ?? false) && (footer || <Footer />)}
    </div>
  )
})
