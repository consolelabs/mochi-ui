import { iconButton, IconButtonStylesProps } from '@mochi-ui/theme'
import React from 'react'
import type * as Polymorphic from '@mochi-ui/polymorphic'

const { iconButtonCva } = iconButton

export type IconButtonProps = IconButtonStylesProps & {
  label: string
}

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
      label,
      ...rest
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={iconButtonCva({ className, variant, color, size })}
        disabled={disabled}
        aria-label={label}
        {...rest}
      >
        {children}
      </Component>
    )
  },
) as PolymorphicIconButton

IconButton.displayName = 'IconButton'

export default IconButton
