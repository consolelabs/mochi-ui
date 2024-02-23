import clsx from 'clsx'

const contentEditableClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'outline-none break-all empty:before:content-[attr(placeholder)] before:text-text-disabled before:font-normal',
    className,
  )

const contentEditable = {
  contentEditableClsx,
}

export { contentEditable }
