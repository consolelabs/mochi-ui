import { cva, type VariantProps } from 'class-variance-authority'

const getBadgeStyle = cva(
  [
    'ui-rounded-2xl ui-py-0.5 ui-text-xs ui-font-medium',
    'ui-flex ui-items-center ui-justify-center ui-leading-[18px]',
    'ui-px-2 ui-gap-1',
  ],
  {
    variants: {
      appearance: {
        primary: ['ui-bg-primary-100', 'ui-text-primary-700'],
        secondary: ['ui-bg-secondary-100', 'ui-text-secondary-700'],
        success: ['ui-bg-green-100', 'ui-text-green-700'],
        danger: ['ui-bg-red-100', 'ui-text-red-700'],
        warning: ['ui-bg-yellow-100', 'ui-text-yellow-700'],
        black: ['ui-bg-neutral-150', 'ui-text-neutral-800'],
        white: [
          'ui-bg-white',
          'ui-border',
          'ui-text-neutral-800',
          'ui-border-neutral-200',
        ],
      },
      iconPosition: {
        left: 'ui-pl-[6px]',
        right: 'ui-pr-[6px]',
      },
      isAvatarIcon: {
        true: '',
      },
      hasIcon: {
        false: '!ui-px-2',
      },
      hasLabel: {
        false: '!ui-p-1',
      },
    },
    compoundVariants: [
      {
        iconPosition: 'left',
        isAvatarIcon: true,
        hasLabel: true,
        className: '!ui-pl-[3px] ui-gap-[6px]',
      },
      {
        iconPosition: 'right',
        isAvatarIcon: true,
        hasLabel: true,
        className: '!ui-pr-[3px] ui-gap-[6px]',
      },
    ],
    defaultVariants: {
      appearance: 'primary',
      iconPosition: 'left',
      isAvatarIcon: false,
      hasIcon: false,
      hasLabel: true,
    },
  },
)

const getIconStyle = cva(['ui-flex'], {
  variants: {
    appearance: {
      primary: 'ui-text-primary-500',
      secondary: 'ui-text-secondary-500',
      success: 'ui-text-green-500',
      danger: 'ui-text-red-500',
      warning: 'ui-text-yellow-500',
      black: 'ui-text-neutral-500',
      white: 'ui-text-neutral-500',
    },
    hasIconOnly: { true: '' },
    isAvatarIcon: { true: 'ui-w-4 ui-h-4' },
  },
  compoundVariants: [
    {
      appearance: 'primary',
      hasIconOnly: true,
      className: 'ui-text-primary-700',
    },
    {
      appearance: 'secondary',
      hasIconOnly: true,
      className: 'ui-text-secondary-700',
    },
  ],
  defaultVariants: {
    appearance: 'primary',
    hasIconOnly: false,
    isAvatarIcon: false,
  },
})

type BadgeStyleProps = VariantProps<typeof getBadgeStyle>

export interface BadgeProps
  extends Omit<BadgeStyleProps, 'hasIcon' | 'hasLabel'> {
  icon?: JSX.Element
  className?: string
  iconClassName?: string
  label?: string
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
      className={getIconStyle({
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
      className={getBadgeStyle({
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
