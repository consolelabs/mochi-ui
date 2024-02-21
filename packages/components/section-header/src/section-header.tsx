import clsx from 'clsx'
import { Typography } from '@mochi-ui/typography'
import { sectionHeader } from '@mochi-ui/theme'
import React, { Children } from 'react'
import {
  SectionHeaderTitleProps,
  SectionHeaderDescriptionProps,
  SectionHeaderActionsProps,
  SectionHeaderProps,
} from './type'
import {
  SectionHeaderContextProvider,
  useSectionHeaderContext,
} from './context'

const {
  sectionHeaderWrapperClsx,
  sectionHeaderDescriptionClsx,
  sectionHeaderTitleClsx,
  sectionHeaderActionsClsx,
} = sectionHeader

const SectionHeaderTitle = ({
  children,
  className,
}: SectionHeaderTitleProps) => {
  const { hasDescription } = useSectionHeaderContext()
  return (
    <Typography
      level="h6"
      color="textPrimary"
      className={sectionHeaderTitleClsx({
        className: clsx('!font-medium', className),
        hasDescription,
      })}
    >
      {children}
    </Typography>
  )
}

const SectionHeaderDescription = ({
  children,
  className,
}: SectionHeaderDescriptionProps) => {
  return (
    <Typography
      level="p5"
      color="textTertiary"
      className={sectionHeaderDescriptionClsx({
        className,
      })}
    >
      {children}
    </Typography>
  )
}

const SectionHeaderActions = ({
  children,
  className,
}: SectionHeaderActionsProps) => {
  const { wrapActionsOnMobile } = useSectionHeaderContext()

  return (
    <div
      className={sectionHeaderActionsClsx({ className, wrapActionsOnMobile })}
    >
      {children}
    </div>
  )
}

const SectionHeader = (props: SectionHeaderProps) => {
  const { children, className, wrapActionsOnMobile = true, ...rest } = props

  const hasDescription = (Children.toArray(children) || []).some(
    (c) => (c as React.ReactElement<any>).type === SectionHeaderDescription,
  )

  return (
    <SectionHeaderContextProvider
      value={{ wrapActionsOnMobile, hasDescription }}
    >
      <div
        className={sectionHeaderWrapperClsx({
          className,
          wrapActionsOnMobile,
        })}
        {...rest}
      >
        {children}
      </div>
    </SectionHeaderContextProvider>
  )
}

export {
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderDescription,
  SectionHeaderActions,
  type SectionHeaderProps,
  type SectionHeaderTitleProps,
  type SectionHeaderDescriptionProps,
  type SectionHeaderActionsProps,
}
