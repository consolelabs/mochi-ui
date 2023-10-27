import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
  className?: string
}

export default function IconButton({ children, className, ...rest }: Props) {
  return (
    <button
      className={clsx(
        'rounded-full p-1.5 border border-neutral-300 bg-white hover:bg-neutral-150 active:bg-neutral-150',
        className,
      )}
      type={rest.type || 'button'}
      {...rest}
    >
      {children}
    </button>
  )
}
