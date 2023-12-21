import { createContext } from '@dwarvesf/react-utils'

export const [SectionHeaderContextProvider, useSectionHeaderContext] =
  createContext<{
    wrapActionsOnMobile: boolean
  }>()
