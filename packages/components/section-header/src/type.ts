import { ReactNode } from 'react'

export type SectionHeaderProps = {
  children: ReactNode
  className?: string
  wrapActionsOnMobile?: boolean
}

export type SectionHeaderTitleProps = {
  children: ReactNode
  className?: string
  wrapperClassName?: string
}

export type SectionHeaderDescriptionProps = {
  children: ReactNode
  className?: string
  wrapperClassName?: string
}

export type SectionHeaderActionsProps = {
  children: ReactNode
  className?: string
  wrapperClassName?: string
}