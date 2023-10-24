import clsx from 'clsx'

export interface HeadingProps {
  children?: React.ReactNode
  title?: string | React.ReactNode
  subtitle?: string
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}
export default function Heading({
  children,
  element = 'h6',
  className,
  title,
  subtitle,
}: HeadingProps) {
  const Tag = element
  return (
    <>
      <Tag
        className={clsx(
          'text-[2rem] sm:text-3xl mb-4 leading-tight font-medium font-heading tracking-[-0.5px] text-[#343433]',
          className,
        )}
      >
        {title}
        {children}
      </Tag>
      {subtitle && (
        <div className="mb-12 text-base sm:text-lg md:w-4/5">{subtitle}</div>
      )}
    </>
  )
}
