import { BadgeStyleProps } from '@mochi-ui/theme'
import { ReactNode } from 'react'

export type BadgeIconProps = {
  className?: string
  children: ReactNode
  asChild?: boolean
}

export interface BadgeProps
  extends Omit<BadgeStyleProps, 'hasIcon' | 'hasLabel'> {
  className?: string
  children: ReactNode
  asChild?: boolean
}
