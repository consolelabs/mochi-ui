import { layout } from '@mochi-ui/theme'
import { forwardRef, HTMLAttributes } from 'react'
import { useHasSidebar } from '../hooks'

type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  tagName?: 'header' | 'footer' | 'main' | 'div'
}

const { layoutDirectionCva } = layout

const Layout = forwardRef<HTMLDivElement, LayoutProps>((props, ref) => {
  const { className, tagName: Tag = 'div', children, ...rest } = props

  const hasSidebar = useHasSidebar(children)

  return (
    <Tag
      ref={ref}
      {...rest}
      className={layoutDirectionCva({ hasSidebar, className })}
    >
      {children}
    </Tag>
  )
})

export { Layout, type LayoutProps }
