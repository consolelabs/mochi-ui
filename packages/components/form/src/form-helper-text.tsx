import { HTMLAttributes, forwardRef } from 'react'
import type * as Polymorphic from '@consolelabs/polymorphic'
import { useFromControl } from '@consolelabs/form-context'
import { formHelperText } from '@consolelabs/theme'

type PolymorphicFormHelperText = Polymorphic.ForwardRefComponent<
  'span',
  HTMLAttributes<HTMLSpanElement>
>

export const FormHelperText = forwardRef((props, ref) => {
  const { as: Component = 'span', className, ...rest } = props
  const { error, hideHelperTextOnError } = useFromControl()

  if (error && hideHelperTextOnError) return

  return (
    <Component className={formHelperText({ className })} ref={ref} {...rest} />
  )
}) as PolymorphicFormHelperText
