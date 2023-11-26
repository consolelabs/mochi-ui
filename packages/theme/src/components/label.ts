import { clsx } from 'clsx'

const labelClsx = ({ className = '' }: { className?: string }) =>
  clsx(
    'tracking-tighter uppercase text-text-secondary text-xxs font-bold',
    className,
  )

const label = {
  labelClsx,
}

export { label }
