import { alert } from '@mochi-ui/theme'
import { HTMLAttributes, forwardRef } from 'react'

export const AlertActionGroup = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, ...restProps } = props
  return (
    <div
      className={alert.alertActionGroup({ className })}
      ref={ref}
      {...restProps}
    />
  )
})
