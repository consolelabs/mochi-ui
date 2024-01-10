import { iconButton, IconButtonStylesProps } from '@mochi-ui/theme'
import React, { ComponentPropsWithoutRef, ElementRef } from 'react'
import { Slot } from '@radix-ui/react-slot'

const { iconButtonCva } = iconButton

export type IconButtonProps = IconButtonStylesProps & {
  label: string
  asChild?: boolean
} & ComponentPropsWithoutRef<'button'>

const IconButton = React.forwardRef<ElementRef<'button'>, IconButtonProps>(
  (
    {
      asChild,
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
    const Component = asChild ? Slot : 'button'
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
)

IconButton.displayName = 'IconButton'

export default IconButton
