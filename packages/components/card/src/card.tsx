import { PropsWithChildren, forwardRef } from 'react'
import { card } from '@mochi-ui/theme'
import type * as Polymorphic from '@mochi-ui/polymorphic'

interface CardProps extends PropsWithChildren {
  className?: string
}
const { cardClsx } = card

type PolymorphicCard = Polymorphic.ForwardRefComponent<'div', CardProps>

const Card = forwardRef(
  ({ children, as: Component = 'div', className, ...props }, ref) => {
    return (
      <Component ref={ref} className={cardClsx({ className })} {...props}>
        {children}
      </Component>
    )
  },
) as PolymorphicCard

Card.displayName = 'Card'

export { Card, type CardProps }
