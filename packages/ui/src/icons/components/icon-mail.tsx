import type { SVGProps } from 'react'

function IconMail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      height="1em"
      viewBox="0 0 30 30"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.3783 11.0639L16.8242 15.5802C15.7748 16.4127 14.2984 16.4127 13.2491 15.5802L7.64807 11.0639"
        stroke="#343433"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        clipRule="evenodd"
        d="M21.1361 26.2499C24.9378 26.2605 27.5 23.1369 27.5 19.298V10.7125C27.5 6.87353 24.9378 3.75 21.1361 3.75H8.86392C5.06223 3.75 2.5 6.87353 2.5 10.7125V19.298C2.5 23.1369 5.06223 26.2605 8.86392 26.2499H21.1361Z"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  )
}
export default IconMail
