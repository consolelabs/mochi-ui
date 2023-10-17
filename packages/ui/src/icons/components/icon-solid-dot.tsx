import * as React from 'react'
import type { SVGProps } from 'react'

function IconSolidDot(props: SVGProps<SVGSVGElement>) {
  return <svg
    fill="currentColor"
    height="1em"
    viewBox="0 0 8 8"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={4} cy={4} fill="currentColor" r={3} />
  </svg>
}
export default IconSolidDot
