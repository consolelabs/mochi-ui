import * as React from 'react'
import type { SVGProps } from 'react'

function IconArrowLeft(props: SVGProps<SVGSVGElement>) {
  return <svg
    fill="none"
    height="1em"
    viewBox="0 0 24 24"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="Type=No Tail, State=Left">
      <path
        d="M14 6L8 12L14 18"
        id="Union"
        stroke="#343433"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </g>
  </svg>
}
export default IconArrowLeft
