import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { card } from '@mochi-ui/theme'
import { Slot } from '@radix-ui/react-slot'

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  asChild?: boolean
}
const { cardClsx } = card

const Card = forwardRef<ElementRef<'div'>, CardProps>(
  ({ children, asChild, className, ...props }, ref) => {
    const Component = asChild ? Slot : 'div'
    return (
      <Component ref={ref} className={cardClsx({ className })} {...props}>
        {children}
      </Component>
    )
  },
)

Card.displayName = 'Card'

export { Card, type CardProps }
