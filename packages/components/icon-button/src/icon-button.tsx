import { iconButton, IconButtonStylesProps } from '@consolelabs/theme'
import React from 'react'
import type * as Polymorphic from '@consolelabs/polymorphic'

const { iconButtonCva } = iconButton

export type IconButtonProps = IconButtonStylesProps

type PolymorphicIconButton = Polymorphic.ForwardRefComponent<
  'button',
  IconButtonProps
>

const IconButton = React.forwardRef(
  (
    {
      as: Component = 'button',
      children,
      variant,
      color,
      size,
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={iconButtonCva({ className, variant, color, size })}
        disabled={disabled}
        {...rest}
      >
        {children}
      </Component>
    )
  },
) as PolymorphicIconButton

export default IconButton
