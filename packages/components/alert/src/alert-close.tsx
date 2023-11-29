import { SVGProps, forwardRef } from 'react'
import { alert } from '@consolelabs/theme'
import { CloseLine } from '@consolelabs/icons'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

export const AlertCloseIcon = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    asChild?: boolean
  }
>((props, ref) => {
  const { scheme, variant, size, responsive } = useAlertContext()
  const { className, asChild, ...restProps } = props

  if (asChild)
    return (
      <Slot
        className={alert.alertIconCloseCva({
          scheme,
          variant,
          size,
          responsive,
          className,
        })}
        data-scheme={scheme}
        data-responsive={responsive}
        data-size={size}
        data-variant={variant}
      />
    )

  return (
    <CloseLine
      ref={ref}
      className={alert.alertIconCloseCva({
        scheme,
        variant,
        size,
        responsive,
        className,
      })}
      data-scheme={scheme}
      data-responsive={responsive}
      data-size={size}
      data-variant={variant}
      {...restProps}
    />
  )
})
