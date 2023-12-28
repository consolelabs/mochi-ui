import { ReactNode } from 'react'

export type ValueChangeIndicatorProps = {
  children?: ReactNode
  className?: string
}

export type ValueChangeProps = {
  children: ReactNode
  className?: string
  trend?: 'up' | 'down'
}
