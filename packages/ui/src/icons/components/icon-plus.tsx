import * as React from 'react'
import type { SVGProps } from 'react'

function IconPlus(props: SVGProps<SVGSVGElement>) {
  return <svg
    fill="currentColor"
    height="1em"
    viewBox="0 0 12 12"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M6.75 3C6.75 2.58579 6.41421 2.25 6 2.25C5.58579 2.25 5.25 2.58579 5.25 3V5.25L3 5.25C2.58579 5.25 2.25 5.58579 2.25 6C2.25 6.41421 2.58579 6.75 3 6.75H5.25V9C5.25 9.41421 5.58579 9.75 6 9.75C6.41421 9.75 6.75 9.41421 6.75 9V6.75H9C9.41421 6.75 9.75 6.41421 9.75 6C9.75 5.58579 9.41421 5.25 9 5.25L6.75 5.25V3Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
}
export default IconPlus
