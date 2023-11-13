import { badge, BadgeStyleProps } from '@consolelabs/theme'

const { badgeWrapperCva, badgeIconCva } = badge

export interface BadgeProps
  extends Omit<BadgeStyleProps, 'hasIcon' | 'hasLabel'> {
  icon?: JSX.Element
  className?: string
  iconClassName?: string
  label?: React.ReactNode
}

export default function Badge(props: BadgeProps) {
  const {
    icon,
    iconPosition = 'left',
    className,
    iconClassName,
    label,
    appearance,
    isAvatarIcon,
  } = props

  const renderIcon = icon ? (
    <span
      className={badgeIconCva({
        hasIconOnly: Boolean(icon) && !label,
        appearance,
        isAvatarIcon,
        className: iconClassName,
      })}
    >
      {icon}
    </span>
  ) : null

  const content =
    iconPosition === 'left' ? (
      <>
        {renderIcon}
        {label}
      </>
    ) : (
      <>
        {label}
        {renderIcon}
      </>
    )

  return (
    <span
      className={badgeWrapperCva({
        className,
        appearance,
        iconPosition,
        isAvatarIcon,
        hasIcon: Boolean(icon),
        hasLabel: Boolean(label),
      })}
    >
      {content}
    </span>
  )
}
