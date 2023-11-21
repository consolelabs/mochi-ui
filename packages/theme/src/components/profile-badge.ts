import clsx from 'clsx'

const profileBadgeClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'flex gap-x-2 items-center p-1 pr-2 rounded-lg border transition border-neutral-outline-border bg-background-surface hover:bg-neutral-outline',
    className,
  )

const profileBadgeAvatarWrapperClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('shrink-0', className)

const profileBadgeNameClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'whitespace-nowrap truncate text-sm font-medium text-text-primary',
    className,
  )

const profileBadge = {
  profileBadgeClsx,
  profileBadgeAvatarWrapperClsx,
  profileBadgeNameClsx,
}

export { profileBadge }
