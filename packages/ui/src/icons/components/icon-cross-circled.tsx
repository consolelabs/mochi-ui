import * as React from 'react'
import type { SVGProps } from 'react'

function IconCrossCircled(props: SVGProps<SVGSVGElement>) {
  return <svg
    fill="none"
    height="1em"
    viewBox="0 0 15 15"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M.877 7.5a6.623 6.623 0 1 1 13.246 0 6.623 6.623 0 0 1-13.246 0ZM7.5 1.827a5.673 5.673 0 1 0 0 11.346 5.673 5.673 0 0 0 0-11.346Zm2.354 3.32a.5.5 0 0 1 0 .707L8.207 7.5l1.647 1.646a.5.5 0 0 1-.708.708L7.5 8.207 5.854 9.854a.5.5 0 0 1-.708-.708L6.793 7.5 5.146 5.854a.5.5 0 0 1 .708-.708L7.5 6.793l1.646-1.647a.5.5 0 0 1 .708 0Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
}
export default IconCrossCircled
