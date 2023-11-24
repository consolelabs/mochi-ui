import { LabelHTMLAttributes, forwardRef } from 'react'
import { useFromControl } from './context'

export const FormLabel = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => {
  const { htmlFor, labelId } = useFromControl()

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      htmlFor={props.htmlFor ?? htmlFor}
      id={props.id ?? labelId}
      ref={ref}
      {...props}
    />
  )
})
