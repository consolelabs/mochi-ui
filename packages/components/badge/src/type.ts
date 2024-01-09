import { BadgeStyleProps } from '@mochi-ui/theme'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

export type BadgeIconProps = {
  className?: string
  asChild?: boolean
  children: ReactNode
} & ComponentPropsWithoutRef<'span'>

export type BadgeProps = Omit<BadgeStyleProps, 'hasIcon' | 'hasLabel'> & {
  className?: string
  children: ReactNode
  asChild?: boolean
} & ComponentPropsWithoutRef<'span'>
