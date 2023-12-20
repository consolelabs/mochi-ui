import { ReactNode } from 'react'

export type PageHeaderProps = {
  children: ReactNode
  className?: string
}

export type PageHeaderBackButtonProps = {
  onBack: () => void
  className?: string
}

export type PageHeaderTitleProps = {
  children: ReactNode
  className?: string
}

export type PageHeaderTitleExtraProps = {
  children: ReactNode
  className?: string
}

export type PageHeaderActionsProps = {
  children: ReactNode
  className?: string
}
