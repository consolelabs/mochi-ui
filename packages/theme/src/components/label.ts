import { clsx } from 'clsx'

const labelClsx = ({ className = '' }: { className?: string }) =>
  clsx(
    'tracking-tighter uppercase text-text-secondary text-[10px] font-bold',
    className,
  )

const label = {
  labelClsx,
}

export { label }
