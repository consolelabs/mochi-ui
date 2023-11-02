import type { SVGProps } from 'react'

const IconArrowUpDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 6.5L5.5 4M5.5 4L5.5 12M5.5 4L8 6.5"
      stroke="#343433"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.8335 9.5L11.3335 12M11.3335 12V4M11.3335 12L8.8335 9.5"
      stroke="#343433"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default IconArrowUpDown
