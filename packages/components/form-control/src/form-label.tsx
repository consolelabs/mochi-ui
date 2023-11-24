import { LabelHTMLAttributes, forwardRef } from 'react'
import { label } from '@consolelabs/theme'
import { useFromControl } from './context'

export const FormLabel = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => {
  const { className, htmlFor: _htmlFor, id: _id, ...restProps } = props
  const { htmlFor, labelId } = useFromControl()

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      className={label.labelClsx({ className })}
      htmlFor={_htmlFor ?? htmlFor}
      id={_id ?? labelId}
      ref={ref}
      {...restProps}
    />
  )
})
