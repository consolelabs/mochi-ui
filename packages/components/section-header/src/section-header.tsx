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
  sectionHeaderDescriptionWrapperClsx,
  sectionHeaderTitleClsx,
  sectionHeaderActionsWrapperClsx,
  sectionHeaderActionsClsx,
} = sectionHeader

const SectionHeaderTitle = ({
  children,
  wrapperClassName,
  className,
}: SectionHeaderTitleProps) => {
  return (
    <div
      className={sectionHeaderTitleWrapperClsx({ className: wrapperClassName })}
    >
      {typeof children === 'string' ? (
        <Typography
          level="h6"
          color="textPrimary"
          className={sectionHeaderTitleClsx({
            className,
          })}
        >
          {children}
        </Typography>
      ) : (
        children
      )}
    </div>
  )
}

const SectionHeaderDescription = ({
  children,
  className,
  wrapperClassName,
}: SectionHeaderDescriptionProps) => {
  return (
    <div
      className={sectionHeaderDescriptionWrapperClsx({
        className: wrapperClassName,
      })}
    >
      {children ? (
        <Typography level="p5" color="textSecondary" className={className}>
          {children}
        </Typography>
      ) : null}
    </div>
  )
}

const SectionHeaderActions = ({
  children,
  className,
  wrapperClassName,
}: SectionHeaderActionsProps) => {
  return (
    <div
      className={sectionHeaderActionsWrapperClsx({
        className: wrapperClassName,
      })}
    >
      <div className={sectionHeaderActionsClsx({ className })}>{children}</div>
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
