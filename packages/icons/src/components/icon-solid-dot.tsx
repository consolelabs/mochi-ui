import * as React from 'react'
import type { SVGProps } from 'react'

const IconSolidDot = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 8 8"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={4} cy={4} r={2} fill="currentColor" />
  </svg>
)
export default IconSolidDot
