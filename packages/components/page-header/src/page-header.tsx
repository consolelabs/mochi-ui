import { ChevronLeftLine } from '@consolelabs/icons'
import { Typography } from '@consolelabs/typography'
import { IconButton } from '@consolelabs/icon-button'
import { pageHeader } from '@consolelabs/theme'
import { Fragment, ReactNode } from 'react'

type PageHeaderProps = {
  title: ReactNode
  titleClassName?: string
  onBack?: () => void
  titleExtra?: ReactNode
  titleExtraClassName?: string
  description?: ReactNode
  descriptionClassName?: string
  actions?: JSX.Element[]
  actionsWrapperClassName?: string
  className?: string
}

const {
  pageHeaderWrapperClsx,
  pageHeaderLeftClsx,
  pageHeaderTitleWrapperClsx,
  pageHeaderTitleClsx,
  pageHeaderTitleExtraClsx,
  pageHeaderActionsWrapperClsx,
  pageHeaderBackButtonWrapperClsx,
  pageHeaderBackIconWrapperClsx,
} = pageHeader

const PageHeader = (props: PageHeaderProps) => {
  const {
    title,
    titleClassName,
    onBack,
    titleExtra,
    titleExtraClassName,
    description,
    descriptionClassName,
    actions = [],
    actionsWrapperClassName,
    className,
    ...rest
  } = props

  const backButton = (
    <IconButton
      variant="link"
      color="info"
      onClick={onBack}
      className={pageHeaderBackButtonWrapperClsx()}
    >
      <ChevronLeftLine className={pageHeaderBackIconWrapperClsx()} />
    </IconButton>
  )

  return (
    <div
      className={pageHeaderWrapperClsx({
        className,
        hasBackButton: onBack !== undefined,
      })}
      {...rest}
    >
      <div className={pageHeaderLeftClsx()}>
        {onBack ? backButton : null}

        <div>
          <div className={pageHeaderTitleWrapperClsx()}>
            {typeof title === 'string' ? (
              <Typography
                level="h5"
                color="textPrimary"
                className={pageHeaderTitleClsx({ className: titleClassName })}
              >
                {title}
              </Typography>
            ) : (
              title
            )}

            {titleExtra && typeof titleExtra === 'string' ? (
              <Typography
                level="p6"
                color="textSecondary"
                className={pageHeaderTitleExtraClsx({
                  className: titleExtraClassName,
                })}
              >
                {titleExtra}
              </Typography>
            ) : null}
            {titleExtra && typeof titleExtra !== 'string' ? titleExtra : null}
          </div>

          {description && typeof description === 'string' ? (
            <Typography
              level="p5"
              color="textSecondary"
              className={descriptionClassName}
            >
              {description}
            </Typography>
          ) : null}
          {description && typeof description !== 'string' ? description : null}
        </div>
      </div>

      {actions.length ? (
        <div
          className={pageHeaderActionsWrapperClsx({
            className: actionsWrapperClassName,
          })}
        >
          {actions.map((action, index) => (
            <Fragment key={index}>{action}</Fragment>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export { PageHeader, type PageHeaderProps }
