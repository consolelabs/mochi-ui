import clsx from 'clsx'

const profileBadgeClsx = ({ className = '' }: { className?: string }) =>
  clsx(
    'flex gap-x-2 items-center p-1 pr-2 bg-white rounded-lg border transition border-neutral-300 hover:bg-neutral-100',
    className,
  )

const profileBadgeAvatarWrapperClsx = ({
  className = '',
}: {
  className?: string
}) => clsx('shrink-0', className)

const profileBadgeNameClsx = ({ className = '' }: { className?: string }) =>
  clsx(
    'whitespace-nowrap truncate text-sm font-medium text-neutral-800',
    className,
  )

const profileBadge = {
  profileBadgeClsx,
  profileBadgeAvatarWrapperClsx,
  profileBadgeNameClsx,
}

export { profileBadge }
