import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const text = cva([], {
  variants: {
    appearance: {
      primary: ['text-foreground'],
    },
    size: {
      xs: ['text-base', 'font-medium'],
      sm: ['text-xl', 'font-semibold'],
      base: ['text-2xl', 'font-semibold'],
      lg: ['text-3xl', 'font-semibold'],
    },
  },
  defaultVariants: {
    appearance: 'primary',
    size: 'base',
  },
})

type Props = VariantProps<typeof text> & {
  className?: string
} & Omit<React.HTMLProps<HTMLSpanElement>, 'size'>

export default function Text({
  className,
  appearance,
  size,
  children,
  ...rest
}: Props) {
  return (
    <span className={text({ appearance, size, className })} {...rest}>
      {children}
    </span>
  )
}
