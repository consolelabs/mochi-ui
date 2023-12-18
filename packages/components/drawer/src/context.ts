import { createContext } from '@dwarvesf/react-utils'
import { DrawerAnchor } from './type'

export const [DrawerContextProvider, useDrawerContext] = createContext<{
  anchor: DrawerAnchor
}>()
