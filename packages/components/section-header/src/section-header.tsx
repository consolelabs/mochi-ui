import { Children, Fragment } from 'react'
import { Typography } from '@mochi-ui/typography'
import { sectionHeader } from '@mochi-ui/theme'
import {
  SectionHeaderTitleProps,
  SectionHeaderDescriptionProps,
  SectionHeaderActionsProps,
  SectionHeaderProps,
} from './type'

const {
  sectionHeaderWrapperClsx,
  sectionHeaderTitleWrapperClsx,
  sectionHeaderTitleClsx,
  sectionHeaderActionsWrapperClsx,
} = sectionHeader

const SectionHeaderTitle = ({
  children,
  wrapperClassName,
  className,
}: SectionHeaderTitleProps) => {
  const childNodes = Children.toArray(children)
  const [title, ...restChild] = childNodes

  return (
    <div
      className={sectionHeaderTitleWrapperClsx({ className: wrapperClassName })}
    >
      {typeof title === 'string' ? (
        <Typography
          level="h6"
          color="textPrimary"
          className={sectionHeaderTitleClsx({
            className,
          })}
        >
          {title}
        </Typography>
      ) : (
        title
      )}

      {restChild.map((child, index) => (
        <Fragment key={index}>{child}</Fragment>
      ))}
    </div>
  )
}

const SectionHeaderDescription = ({
  children,
  className,
}: SectionHeaderDescriptionProps) => {
  const childNodes = Children.toArray(children)
  const [description, ...restChild] = childNodes

  return (
    <>
      {description ? (
        <Typography level="p5" color="textSecondary" className={className}>
          {description}
        </Typography>
      ) : null}

      {restChild.map((child, index) => (
        <Fragment key={index}>{child}</Fragment>
      ))}
    </>
  )
}

const SectionHeaderActions = ({
  children,
  className,
}: SectionHeaderActionsProps) => {
  return (
    <div className={sectionHeaderActionsWrapperClsx({ className })}>
      {children}
    </div>
  )
}

const SectionHeader = (props: SectionHeaderProps) => {
  const { children, className, ...rest } = props

  return (
    <div className={sectionHeaderWrapperClsx({ className })} {...rest}>
      {children}
    </div>
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
