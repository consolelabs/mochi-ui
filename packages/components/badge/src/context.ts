import { BadgeStyleProps } from '@mochi-ui/theme'
import { createContext, Dispatch, SetStateAction, useContext } from 'react'

type BadgeContextValue = {
  hasIconOnly?: boolean
  setHasIconOnly?: Dispatch<SetStateAction<boolean>>
  isAvatarIcon?: boolean | null
  appearance?: BadgeStyleProps['appearance']
}

const BadgeContext = createContext<BadgeContextValue>({})

const useBadgeContext = () => useContext(BadgeContext)

export { type BadgeContextValue, BadgeContext, useBadgeContext }
