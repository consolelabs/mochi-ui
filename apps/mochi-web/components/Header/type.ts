import { ReactNode } from 'react'

export interface NavItem {
  label: ReactNode
  href?: string
  onClick?: () => void
  iconLeft?: ReactNode
  component?: ReactNode
}
