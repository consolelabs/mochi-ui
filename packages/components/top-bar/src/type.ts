import { ReactNode } from 'react'

export interface MobileNavItem {
  label?: ReactNode
  href?: string
  onClick?: () => void
  iconLeft?: ReactNode
  component?: ReactNode
}

export interface MobileAccordionItem {
  label: string
  data: MobileNavItem[]
}

export interface NavItem extends MobileNavItem {
  children?: MobileAccordionItem[]
}

export interface DesktopNavProps {
  navItems: JSX.Element[]
  className?: string
}

export interface MobileNavProps {
  navItems: JSX.Element[]
  Header?: ({ onClose }: { onClose: () => void }) => JSX.Element
  toggleIconClassName?: string
  className?: string
  onNavStateChanged?: (newState: boolean) => void
}

export type TopBarProps = {
  leftSlot?: ReactNode
  rightSlot?: ReactNode
  className?: string
}
