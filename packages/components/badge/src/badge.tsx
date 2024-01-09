import { badge } from '@mochi-ui/theme'
import {
  Children,
  ElementRef,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Slot } from '@radix-ui/react-slot'
import { BadgeContext, useBadgeContext } from './context'
import { BadgeIconProps, BadgeProps } from './type'

const { badgeWrapperCva, badgeIconCva } = badge

const BadgeIcon = forwardRef<ElementRef<'span'>, BadgeIconProps>(
  (props, ref) => {
    const { children, className, asChild } = props

    const {
      hasIconOnly = false,
      isAvatarIcon = false,
      appearance = 'primary',
    } = useBadgeContext()

    const Com = asChild ? Slot : 'span'

    return (
      <Com
        ref={ref}
        className={badgeIconCva({
          hasIconOnly,
          appearance,
          isAvatarIcon,
          className,
        })}
      >
        {children}
      </Com>
    )
  },
)
BadgeIcon.displayName = 'BadgeIcon'

const BadgeInner = forwardRef<ElementRef<'span'>, BadgeProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const {
      appearance = 'primary',
      isAvatarIcon = false,
      setHasIconOnly,
    } = useBadgeContext()

    const Com = asChild ? Slot : 'span'

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
      <Com
        {...props}
        ref={ref}
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
      </Com>
    )
  },
)

BadgeInner.displayName = 'Badge'

function Badge(props: BadgeProps) {
  const {
    isAvatarIcon,
    appearance,
    children,
    className,
    asChild,
    ...restProps
  } = props
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
      <BadgeInner className={className} asChild={asChild} {...restProps}>
        {children}
      </BadgeInner>
    </BadgeContext.Provider>
  )
}

export { Badge, BadgeIcon, type BadgeProps, type BadgeIconProps }
