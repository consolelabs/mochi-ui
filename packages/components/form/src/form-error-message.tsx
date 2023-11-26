import { HTMLAttributes, forwardRef } from 'react'
import { formHelperText } from '@consolelabs/theme'
import { useFromControl } from '@consolelabs/form-context'
import type * as Polymorphic from '@consolelabs/polymorphic'

type PolymorphicFormErrorMessage = Polymorphic.ForwardRefComponent<
  'span',
  HTMLAttributes<HTMLSpanElement> & { value?: string }
>

export const FormErrorMessage = forwardRef((props, ref) => {
  const { as: Component = 'span', className, value = '' } = props
  const { error, errorValue } = useFromControl()

  if (!error || value !== errorValue) return null

  return (
    <Component
      className={formHelperText({ className, error: true })}
      ref={ref}
      {...props}
    />
  )
}) as PolymorphicFormErrorMessage
