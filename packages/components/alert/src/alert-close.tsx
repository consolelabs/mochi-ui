import { SVGProps, forwardRef } from 'react'
import { alert } from '@consolelabs/theme'
import { CloseLine } from '@consolelabs/icons'
import { useAlertContext } from './context'

export const AlertCloseIcon = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>((props, ref) => {
  const { scheme, variant } = useAlertContext()
  const { className, ...restProps } = props

  return (
    <CloseLine
      className={alert.alertIconCloseCva({ scheme, variant, className })}
      ref={ref}
      {...restProps}
    />
  )
})
