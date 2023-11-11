import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import clsx from 'clsx'
import { separator as separatorClassName } from '@consolelabs/theme'

type SeparatorProps = ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>

const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>((props, ref) => {
  const {
    orientation = 'horizontal',
    className,
    decorative = true,
    ...restProps
  } = props

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      className={clsx(
        separatorClassName.base,
        {
          [separatorClassName.horizontal]: orientation === 'horizontal',
          [separatorClassName.vertical]: orientation === 'vertical',
        },
        className,
      )}
      {...restProps}
    />
  )
})

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator, type SeparatorProps }
