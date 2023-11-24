import { HTMLAttributes, forwardRef } from 'react'
import { formControl } from '@consolelabs/theme'
import { useFromControl } from './context'

export const FormHelperText = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>((props, ref) => {
  const { className } = props
  const { error } = useFromControl()

  return (
    <span
      className={formControl.helperClsx({ className, error })}
      ref={ref}
      {...props}
    />
  )
})
