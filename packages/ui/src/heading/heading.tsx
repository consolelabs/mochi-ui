import type { HTMLAttributes } from 'react'
import { createElement } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  noSize?: boolean
}

export const Heading: React.FC<HeadingProps> = (props) => {
  const { as = 'h2', ...rest } = props

  return createElement(as, {
    ...rest,
  })
}

export default Heading
