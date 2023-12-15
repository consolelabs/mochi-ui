import { createContext } from '@dwarvesf/react-utils'
import { DrawerAnchor } from './type'

export const [DrawerContextProvider, useDrawerContext] = createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
  anchor: DrawerAnchor
}>()
