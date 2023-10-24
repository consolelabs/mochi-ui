import Image from 'next/image'
import { SOCIAL_LINKS } from '~constants'
import { logo } from '~utils/image'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="pt-16 pb-24 mt-auto">
      <div className="container px-6 mx-auto max-w-5xl">
        <div className="flex flex-col gap-y-5 gap-x-8 sm:gap-x-12 md:flex-row">
          <div className="w-9 h-9 rounded-full">
            <Image
              src={logo}
              alt="Logo"
              width={36}
              height={36}
              className="block rounded-full"
            />
          </div>
          <div className="flex flex-wrap gap-x-8 mb-10 sm:gap-x-12 sm:mb-0">
            <div className="space-y-2 text-[13px]">
              <div className="text-footer-title">Home</div>
              <Link className="block text-footer-body" href="/features">
                Features
              </Link>
              <Link className="block text-footer-body" href="/developer">
                For developer
              </Link>
              <Link className="block text-footer-body" href="/team">
                For team
              </Link>
              <Link className="block text-footer-body" href="/changelog">
                What&apos;s new
              </Link>
              <a
                className="block text-footer-body"
                target="_blank"
                href={SOCIAL_LINKS.GITBOOK}
              >
                Tutorial
              </a>
            </div>
            <div className="space-y-2 text-[13px]">
              <div className="text-footer-title">Developer</div>
              <a
                className="block text-footer-body"
                target="blank"
                href={SOCIAL_LINKS.DOCUMENT}
              >
                Documentation
              </a>
              <Link
                className="block text-footer-body"
                target="blank"
                href="/api-status"
              >
                API status
              </Link>
              <a
                className="block text-footer-body"
                target="blank"
                href={SOCIAL_LINKS.GITHUB}
              >
                GitHub
              </a>
            </div>
            <div className="space-y-2 text-[13px]">
              <div className="text-footer-title">Company</div>
              <a className="block text-footer-body" href="#">
                Become a partner
              </a>
              <a
                className="block text-footer-body"
                target="_blank"
                href={SOCIAL_LINKS.DISCORD}
              >
                Support
              </a>
              <a className="block text-footer-body" href="#">
                ToS
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center items-end ml-auto">
            <div className="mb-6 text-xs font-normal text-right text-footer-body">
              Copyright © {year} Mochi, All rights reserved
            </div>
            <div className="flex gap-4 justify-end items-center">
              <a
                href={SOCIAL_LINKS.CONSOLE}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 p-[6px] border border-[#26272B1A] rounded-full overflow-hidden"
              >
                <Image
                  width={64}
                  height={64}
                  alt=""
                  src="/consolelabs-black.svg"
                />
              </a>
              <a
                href={SOCIAL_LINKS.TWITTER}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 p-[6px] border border-[#26272B1A] rounded-full overflow-hidden"
              >
                <Icon icon="mdi:twitter" className="text-black" />
              </a>
              <a
                href={SOCIAL_LINKS.DISCORD}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 p-[6px] border border-[#26272B1A] rounded-full overflow-hidden"
              >
                <Icon icon="ic:baseline-discord" className="text-black" />
              </a>
              <a
                href={SOCIAL_LINKS.TELEGRAM}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 p-[6px] border border-[#26272B1A] rounded-full overflow-hidden"
              >
                <Icon icon="simple-icons:telegram" className="text-black" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
