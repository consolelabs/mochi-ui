import * as PrimitiveLabel from '@radix-ui/react-label'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { label } from '@consolelabs/theme'

const Label = forwardRef<
  ElementRef<typeof PrimitiveLabel.Root>,
  ComponentPropsWithoutRef<typeof PrimitiveLabel.Root>
>(({ className, ...props }, ref) => (
  <PrimitiveLabel.Root
    ref={ref}
    className={label.labelClsx({ className })}
    {...props}
  />
))

Label.displayName = PrimitiveLabel.Root.displayName

export { Label }
export default Label
