import { BackLine } from '@mochi-ui/icons'
import { Typography } from '@mochi-ui/typography'
import { IconButton } from '@mochi-ui/icon-button'
import { pageHeader } from '@mochi-ui/theme'
import { Children, Fragment } from 'react'
import {
  PageHeaderBackButtonProps,
  PageHeaderTitleProps,
  PageHeaderTitleExtraProps,
  PageHeaderActionsProps,
  PageHeaderProps,
} from './type'

const {
  pageHeaderWrapperClsx,
  pageHeaderTitleWrapperClsx,
  pageHeaderTitleClsx,
  pageHeaderTitleExtraClsx,
  pageHeaderActionsWrapperClsx,
  pageHeaderBackButtonWrapperClsx,
  pageHeaderBackIconWrapperClsx,
} = pageHeader

const PageHeaderBackButton = ({
  onBack,
  className,
}: PageHeaderBackButtonProps) => {
  return (
    <IconButton
      variant="link"
      color="info"
      onClick={onBack}
      label="Back"
      className={pageHeaderBackButtonWrapperClsx({ className })}
    >
      <BackLine className={pageHeaderBackIconWrapperClsx()} />
    </IconButton>
  )
}

const PageHeaderTitle = ({ children, className }: PageHeaderTitleProps) => {
  const childNodes = Children.toArray(children)

  const [title, ...restChild] = childNodes

  return (
    <div className={pageHeaderTitleWrapperClsx()}>
      {typeof title === 'string' ? (
        <Typography
          level="h5"
          color="textPrimary"
          className={pageHeaderTitleClsx({ className })}
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

const PageHeaderTitleExtra = ({
  children,
  className,
}: PageHeaderTitleExtraProps) => {
  const childNodes = Children.toArray(children)

  const [titleExtra, ...restChild] = childNodes

  return (
    <>
      {titleExtra && typeof titleExtra === 'string' ? (
        <Typography
          level="p6"
          color="textSecondary"
          className={pageHeaderTitleExtraClsx({ className })}
        >
          {titleExtra}
        </Typography>
      ) : null}
      {titleExtra && typeof titleExtra !== 'string' ? titleExtra : null}

      {restChild.map((child, index) => (
        <Fragment key={index}>{child}</Fragment>
      ))}
    </>
  )
}

const PageHeaderActions = ({ children, className }: PageHeaderActionsProps) => {
  return (
    <div className={pageHeaderActionsWrapperClsx({ className })}>
      {children}
    </div>
  )
}

const PageHeader = ({ children, className, ...rest }: PageHeaderProps) => {
  return (
    <div
      className={pageHeaderWrapperClsx({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  )
}

export {
  PageHeader,
  PageHeaderBackButton,
  PageHeaderTitle,
  PageHeaderTitleExtra,
  PageHeaderActions,
  type PageHeaderProps,
  type PageHeaderBackButtonProps,
  type PageHeaderTitleProps,
  type PageHeaderTitleExtraProps,
  type PageHeaderActionsProps,
}
