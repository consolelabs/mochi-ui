import { Icon } from '@iconify/react'
import Link from 'next/link'
import { SOCIAL_LINKS } from '~constants'

export default function Footer() {
  return (
    <div className="flex flex-col gap-y-2 gap-x-3 justify-center items-center p-4 text-sm md:flex-row md:p-6 text-dashboard-gray-4">
      <div>Mochi &#169; {new Date().getFullYear()}</div>
      <div className="grid flex-row grid-cols-4 auto-rows-auto gap-1 gap-x-2 place-items-center sm:flex">
        <Link href="/" className="col-span-2">
          Feature
        </Link>
        <Link href="/" className="col-span-2">
          Community
        </Link>
        <Link href="/" className="col-span-2">
          Support
        </Link>
        <Link href="/" className="col-span-2">
          Credibility
        </Link>
        <a
          href={SOCIAL_LINKS.TWITTER}
          target="_blank"
          rel="noreferrer"
          className="ml-auto"
        >
          <Icon icon="mdi:twitter" className="w-4 h-4 text-gray-500" />
        </a>
        <a
          href={SOCIAL_LINKS.DISCORD}
          target="_blank"
          rel="noreferrer"
          className="col-span-2"
        >
          <Icon icon="ic:baseline-discord" className="w-4 h-4 text-gray-500" />
        </a>
        <a
          href={SOCIAL_LINKS.GITBOOK}
          target="_blank"
          rel="noreferrer"
          className="mr-auto"
        >
          <Icon icon="simple-icons:gitbook" className="w-4 h-4 text-gray-500" />
        </a>
      </div>
    </div>
  )
}
