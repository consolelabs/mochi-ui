import { CheckLine, MinusLine } from '@mochi-ui/icons'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { checkbox, CheckBoxStyleProps } from '@mochi-ui/theme'

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
    asChild,
    children,
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
      {asChild ? (
        children
      ) : (
        <CheckboxPrimitive.Indicator className={checkbox.indicator}>
          <CheckLine id="check" />
          <MinusLine id="minus" />
        </CheckboxPrimitive.Indicator>
      )}
    </CheckboxPrimitive.Root>
  )
})

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, type CheckedState, type CheckboxProps }
