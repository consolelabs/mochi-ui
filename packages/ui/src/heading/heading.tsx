import type { HTMLAttributes } from 'react'
import { createElement } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  noSize?: boolean
}

export default function Heading(props: HeadingProps) {
  const { as = 'h2', ...rest } = props

  return createElement(as, {
    ...rest,
  })
}
