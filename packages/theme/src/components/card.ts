import clsx from 'clsx'

const cardClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('p-4 border rounded-2xl border-divider bg-background-surface', className)

export const card = {
  cardClsx,
}
