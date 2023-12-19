import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ComponentPropsWithRef } from 'react'

const ActionBar = PopoverPrimitive.Root

type ActionBarProps = ComponentPropsWithRef<typeof ActionBar>

ActionBar.displayName = 'ActionBar'

export { ActionBar }
export type { ActionBarProps }
