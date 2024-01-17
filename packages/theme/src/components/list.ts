import clsx from 'clsx'

const listWrapperClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('overflow-hidden', className)

const listViewportClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('w-full h-full border-inherit', className)

const listViewportContentClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('space-y-1', className)

const listScrollbarClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'flex select-none touch-none p-0.5 bg-transparent transition-colors w-2 hover:bg-neutral-outline-hover',
    className,
  )

const listThumbClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    "flex-1 bg-neutral-solid rounded-lg relative before:content-[''] before:absolute before:w-full before:h-full before:min-w-[44px] before:min-h-[44px] before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2",
    className,
  )

const listCornerClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('bg-neutral-outline-hover', className)

export const list = {
  listWrapperClsx,
  listViewportClsx,
  listViewportContentClsx,
  listScrollbarClsx,
  listThumbClsx,
  listCornerClsx,
}
