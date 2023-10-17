import * as React from 'react'
import type { SVGProps } from 'react'

function IconArrow(props: SVGProps<SVGSVGElement>) {
  return <svg
    fill="currentColor"
    height="1em"
    viewBox="0 0 12 12"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
}
export default IconArrow
