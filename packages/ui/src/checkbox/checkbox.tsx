import { IconCheck, IconMinus } from '@consolelabs/icons'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { VariantProps, cva } from 'class-variance-authority'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

const checkboxCva = cva(['border bg-white'], {
  variants: {
    size: {
      md: 'w-4 h-4 rounded',
      lg: 'w-5 h-5 rounded-[6px]',
    },
    disabled: {
      true: [
        'cursor-not-allowed',
        'text-neutral-200',
        'bg-neutral-100',
        'border-neutral-200',
      ],
      false: [
        'hover:border-primary-700',
        'focus:ring-4 focus:ring-primary-700/10',
        'focus-visible:outline-none',
        'focus-visible:ring-4',
        'transition-shadow duration-100 ease-in',
        'data-[state=checked]:bg-primary-700',
        'data-[state=checked]:text-white',
        'data-[state=checked]:border-primary-700',
        'data-[state=indeterminate]:bg-primary-700',
        'data-[state=indeterminate]:text-white',
        'data-[state=indeterminate]:border-primary-700',
      ],
    },
  },
  defaultVariants: {
    disabled: false,
    size: 'md',
  },
})

type CheckBoxStyleProps = VariantProps<typeof checkboxCva>

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
  const { className, size, onChange, disabled = false, ...restProps } = props
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={checkboxCva({ disabled, size, className })}
      disabled={disabled}
      onCheckedChange={onChange}
      {...restProps}
    >
      <CheckboxPrimitive.Indicator
        className={[
          'flex w-full h-full',
          'items-center',
          'justify-center',
          '[&[data-state=indeterminate]>#minus]:block',
          '[&>#minus]:hidden',
          '[&[data-state=checked]>#check]:block',
          '[&>#check]:hidden',
          'text-inherit',
          'text-xs',
        ].join(' ')}
      >
        <IconCheck id="check" />
        <IconMinus id="minus" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})

export { Checkbox, type CheckedState }
