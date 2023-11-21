import { IconCheck, IconMinus } from '@consolelabs/icons'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { checkbox, CheckBoxStyleProps } from '@consolelabs/theme'

type CheckboxPrimitiveProps = ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>

type CheckedState = CheckboxPrimitive.CheckedState

type CheckboxProps = Omit<
  CheckboxPrimitiveProps,
  'onCheckedChange' | 'onChange'
> &
  CheckBoxStyleProps & {
    onChange?: (_: CheckedState) => void
  }

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>((props, ref) => {
  const {
    className,
    size,
    appearance,
    onChange,
    disabled = false,
    ...restProps
  } = props
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={checkbox.wrapperCva({ disabled, size, className, appearance })}
      disabled={disabled}
      onCheckedChange={onChange}
      {...restProps}
    >
      <CheckboxPrimitive.Indicator className={checkbox.indicator}>
        <IconCheck id="check" />
        <IconMinus id="minus" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
export { Checkbox, type CheckedState, type CheckboxProps }
