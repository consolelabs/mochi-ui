import { LabelHTMLAttributes, forwardRef } from 'react'
import { Label } from '@mochi-ui/label'
import { useFromControl } from '@mochi-ui/form-context'

export const FormLabel = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => {
  const { className, htmlFor: htmlForProp, id: idProp, ...restProps } = props
  const { htmlFor, labelId } = useFromControl()

  return (
    <Label
      className={className}
      htmlFor={htmlForProp ?? htmlFor}
      id={idProp ?? labelId}
      ref={ref}
      {...restProps}
    />
  )
})
