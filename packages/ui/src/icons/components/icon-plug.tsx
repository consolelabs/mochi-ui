import type { SVGProps } from 'react'

function IconPlug(props: SVGProps<SVGSVGElement>) {
  return <svg
    height="1em"
    viewBox="0 0 48 48"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask id="ipSEnergySocket0">
      <g
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
      >
        <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Zm4-23v-5m-8 5v-5" />
        <path d="M24 32a8 8 0 0 0 8-8v-3H16v3a8 8 0 0 0 8 8Z" fill="#fff" />
        <path d="M24 44V32" />
      </g>
    </mask>
    <path d="M0 0h48v48H0z" fill="currentColor" mask="url(#ipSEnergySocket0)" />
  </svg>
}
export default IconPlug
