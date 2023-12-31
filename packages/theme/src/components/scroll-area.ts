import clsx from 'clsx'

const scrollAreaRootClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('overflow-hidden', className)

const scrollAreaViewportClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('w-full h-full', className)

const scrollAreaScrollbarClsx = ({
  className = '',
  orientation = 'vertical',
}: { className?: string; orientation?: 'horizontal' | 'vertical' } = {}) =>
  clsx(
    'flex select-none touch-none p-0.5 bg-transparent transition-colors',
    orientation === 'vertical' ? 'w-2' : 'h-2 flex-col',
    className,
  )

const scrollAreaThumbClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'flex-1 bg-text-primary opacity-80 hover:opacity-100 rounded-lg relative before:content-[""] before:absolute before:w-full before:h-full before:min-w-[44px] before:min-h-[44px] before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2',
    className,
  )

const scrollAreaCornerClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('bg-transparent !bg-black', className)

const scrollArea = {
  scrollAreaRootClsx,
  scrollAreaViewportClsx,
  scrollAreaScrollbarClsx,
  scrollAreaThumbClsx,
  scrollAreaCornerClsx,
}

export { scrollArea }
