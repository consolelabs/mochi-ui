import { IconChevronLeft } from '@consolelabs/icons'
import { Typography } from '@consolelabs/typography'
import { IconButton } from '@consolelabs/icon-button'
import { pageHeader } from '@consolelabs/theme'

type PageHeaderProps = {
  title: string
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
      <IconChevronLeft className={pageHeaderBackIconWrapperClsx()} />
    </IconButton>
  )

  return (
    <header className={pageHeaderWrapperClsx({ className })} {...rest}>
      <div className={pageHeaderLeftClsx()}>
        {backHref ? (
          <a href={backHref} className={pageHeaderBackButtonWrapperClsx()}>
            {backButton}
          </a>
        ) : null}
        {!backHref && onBack ? backButton : null}

        <div>
          <div className={pageHeaderTitleWrapperClsx()}>
            <Typography
              level="h5"
              color="textPrimary"
              className={pageHeaderTitleClsx({ className: titleClassName })}
            >
              {title}
            </Typography>

            {titleExtra ? (
              <Typography
                level="body-xs"
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
            <Typography level="body-sm" color="textSecondary">
              {description}
            </Typography>
          ) : null}
        </div>
      </div>

      {actions.length ? (
        <div className={pageHeaderActionsWrapperClsx()}>
          {actions.map((Action) => Action)}
        </div>
      ) : null}
    </header>
  )
}

export { PageHeader, type PageHeaderProps }
