import clsx from 'clsx'

export function Divider({
  noSpace = false,
  fullWidth = false,
  className = '',
}: {
  className?: string
  noSpace?: boolean
  fullWidth?: boolean
}) {
  return (
    <hr
      className={clsx(
        'w-full',
        {
          'my-10 mx-auto': !noSpace,
          'w-screen': fullWidth,
          'max-w-4xl xl:max-w-7xl': !fullWidth,
        },
        className,
      )}
    />
  )
}
