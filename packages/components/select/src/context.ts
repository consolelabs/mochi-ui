import { createContext } from '@dwarvesf/react-utils'

export const [SelectContextProvider, useSelectContext] = createContext<{
  isFilled?: boolean
}>()
