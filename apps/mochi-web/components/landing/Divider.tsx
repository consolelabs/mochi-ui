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
          'my-8 md:my-16 mx-auto': !noSpace,
          'w-screen': fullWidth,
          'max-w-4xl xl:max-w-1k': !fullWidth,
        },
        className,
      )}
    />
  )
}
