import { badge } from '@mochi-ui/theme'
import { Children, ReactNode, useEffect, useMemo, useState } from 'react'
import { BadgeContext, useBadgeContext } from './context'
import { BadgeIconProps, BadgeProps } from './type'

const { badgeWrapperCva, badgeIconCva } = badge

function BadgeIcon(props: BadgeIconProps) {
  const { children, className } = props

  const {
    hasIconOnly = false,
    isAvatarIcon = false,
    appearance = 'primary',
  } = useBadgeContext()

  return (
    <span
      className={badgeIconCva({
        hasIconOnly,
        appearance,
        isAvatarIcon,
        className,
      })}
    >
      {children}
    </span>
  )
}

function BadgeInner({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const {
    appearance = 'primary',
    isAvatarIcon = false,
    setHasIconOnly,
  } = useBadgeContext()

  const childArray = Children.toArray(children)

  const hasIcon = (childArray || []).some(
    (child) =>
      (child as React.ReactElement<BadgeIconProps, any>).type === BadgeIcon,
  )

  const iconPosition =
    (childArray[0] as React.ReactElement<BadgeIconProps, any>).type ===
    BadgeIcon
      ? 'left'
      : 'right'

  const hasLabel = (childArray || []).some(
    (child) =>
      (child as React.ReactElement<BadgeIconProps, any>).type !== BadgeIcon,
  )

  useEffect(() => {
    if ((childArray || []).length === 1 && hasIcon) {
      setHasIconOnly?.(true)
    }
  }, [childArray, hasIcon, setHasIconOnly])

  return (
    <span
      className={badgeWrapperCva({
        className,
        appearance,
        isAvatarIcon,
        hasIcon,
        hasLabel,
        iconPosition,
      })}
    >
      {children}
    </span>
  )
}

function Badge(props: BadgeProps) {
  const { isAvatarIcon, appearance, children, className } = props
  const [hasIconOnly, setHasIconOnly] = useState(false)

  const contextValue = useMemo(
    () => ({
      isAvatarIcon,
      appearance,
      hasIconOnly,
      setHasIconOnly,
    }),
    [isAvatarIcon, appearance, hasIconOnly, setHasIconOnly],
  )

  return (
    <BadgeContext.Provider value={contextValue}>
      <BadgeInner className={className}>{children}</BadgeInner>
    </BadgeContext.Provider>
  )
}

export { Badge, BadgeIcon, type BadgeProps, type BadgeIconProps }
