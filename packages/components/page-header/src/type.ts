import { ReactNode } from 'react'
import { IconButtonProps } from '@mochi-ui/icon-button'
import type * as Polymorphic from '@mochi-ui/polymorphic'

export type PageHeaderProps = {
  children: ReactNode
  className?: string
}

export type PolymorphicPageHeaderBackButton = Polymorphic.ForwardRefComponent<
  'button',
  Partial<IconButtonProps>
>

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
