import * as SeparatorPrimitive from '@radix-ui/react-separator'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
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
        'shrink-0 bg-neutral-400 rounded-full',
        {
          'h-[0.5px] w-full': orientation === 'horizontal',
          'w-[0.5px] h-full': orientation === 'vertical',
        },
        className,
      )}
      {...restProps}
    />
  )
})

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
