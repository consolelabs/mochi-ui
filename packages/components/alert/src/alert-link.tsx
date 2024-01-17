import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { alert } from '@mochi-ui/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type AlertLinkProps = ComponentPropsWithoutRef<'a'> & {
  asChild?: boolean
}

const AlertLink = forwardRef<ElementRef<'a'>, AlertLinkProps>((props, ref) => {
  const { className, asChild, ...restProps } = props
  const { layout, scheme, size } = useAlertContext()
  const Component = asChild ? Slot : 'a'

  return (
    <Component
      data-scheme={scheme}
      data-layout={layout}
      data-size={size}
      className={alert.alertLinkCva({
        scheme,
        size,
        layout,
        className,
      })}
      ref={ref}
      {...restProps}
    />
  )
})
AlertLink.displayName = 'AlertLink'

export { AlertLink, type AlertLinkProps }
