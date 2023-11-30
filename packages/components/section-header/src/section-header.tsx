import { Typography } from '@consolelabs/typography'
import { sectionHeader } from '@consolelabs/theme'
import { Fragment, ReactNode } from 'react'

type SectionHeaderProps = {
  title: ReactNode
  titleClassName?: string
  description?: ReactNode
  descriptionClassName?: string
  actions?: JSX.Element[]
  actionsWrapperClassName?: string
  className?: string
}

const {
  sectionHeaderWrapperClsx,
  sectionHeaderLeftClsx,
  sectionHeaderTitleWrapperClsx,
  sectionHeaderTitleClsx,
  sectionHeaderActionsWrapperClsx,
} = sectionHeader

const SectionHeader = (props: SectionHeaderProps) => {
  const {
    title,
    titleClassName,
    description,
    descriptionClassName,
    actions = [],
    actionsWrapperClassName,
    className,
    ...rest
  } = props

  return (
    <header className={sectionHeaderWrapperClsx({ className })} {...rest}>
      <div className={sectionHeaderLeftClsx()}>
        <div>
          <div className={sectionHeaderTitleWrapperClsx()}>
            {typeof title === 'string' ? (
              <Typography
                level="h6"
                color="textPrimary"
                className={sectionHeaderTitleClsx({
                  className: titleClassName,
                })}
              >
                {title}
              </Typography>
            ) : (
              title
            )}
          </div>

          {description ? (
            <Typography
              level="p5"
              color="textSecondary"
              className={descriptionClassName}
            >
              {description}
            </Typography>
          ) : null}
        </div>
      </div>

      {actions.length ? (
        <div
          className={sectionHeaderActionsWrapperClsx({
            className: actionsWrapperClassName,
          })}
        >
          {actions.map((action, index) => (
            <Fragment key={index}>{action}</Fragment>
          ))}
        </div>
      ) : null}
    </header>
  )
}

export { SectionHeader, type SectionHeaderProps }
