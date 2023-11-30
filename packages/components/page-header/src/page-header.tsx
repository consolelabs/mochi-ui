import { ChevronLeftLine } from '@consolelabs/icons'
import { Typography } from '@consolelabs/typography'
import { IconButton } from '@consolelabs/icon-button'
import { pageHeader } from '@consolelabs/theme'
import { Fragment, ReactNode } from 'react'

type PageHeaderProps = {
  title: ReactNode
  titleClassName?: string
  backHref?: string
  onBack?: () => void
  titleExtra?: string
  titleExtraClassName?: string
  description?: string
  actions?: JSX.Element[]
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
    backHref,
    onBack,
    titleExtra,
    titleExtraClassName,
    description,
    actions = [],
    className,
    ...rest
  } = props

  const backButton = (
    <IconButton
      variant="link"
      color="info"
      onClick={backHref ? undefined : onBack}
      className={pageHeaderBackButtonWrapperClsx()}
    >
      <ChevronLeftLine className={pageHeaderBackIconWrapperClsx()} />
    </IconButton>
  )

  return (
    <div className={pageHeaderWrapperClsx({ className })} {...rest}>
      <div className={pageHeaderLeftClsx()}>
        {backHref ? (
          <a href={backHref} className={pageHeaderBackButtonWrapperClsx()}>
            {backButton}
          </a>
        ) : null}
        {!backHref && onBack ? backButton : null}

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

            {titleExtra ? (
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
          </div>
          {description ? (
            <Typography level="p5" color="textSecondary">
              {description}
            </Typography>
          ) : null}
        </div>
      </div>

      {actions.length ? (
        <div className={pageHeaderActionsWrapperClsx()}>
          {actions.map((action, index) => (
            <Fragment key={index}>{action}</Fragment>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export { PageHeader, type PageHeaderProps }
