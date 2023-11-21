import * as RadixSwitch from '@radix-ui/react-switch'
import { forwardRef } from 'react'
import { switchButton, SwitchStylesProps } from '@consolelabs/theme'

type SwitchProps = React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> &
  SwitchStylesProps

const Switch = forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  SwitchProps
>(({ className, size, color, ...props }, ref) => (
  <RadixSwitch.Root
    className={switchButton.root({ className, size, color })}
    ref={ref}
    {...props}
  >
    <RadixSwitch.Thumb className={switchButton.thumb({ size })} />
  </RadixSwitch.Root>
))

export default Switch
export { type SwitchProps }
