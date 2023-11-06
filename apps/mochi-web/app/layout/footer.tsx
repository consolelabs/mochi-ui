import Image from 'next/image'
import { SOCIAL_LINKS } from '~constants'
import { logo } from '~utils/image'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-auto">
      <div className="container py-18 landing-block md:h-[300px]">
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
          <div className="flex flex-col gap-y-7 gap-x-12 mb-10 sm:gap-x-24 sm:mb-0 md:flex-row md:flex-wrap md:gap-y-0">
            <div className="space-y-2 text-[13px]">
              <div className="text-footer-title">Developers</div>
              <a
                className="block text-footer-body"
                target="blank"
                href={SOCIAL_LINKS.DOCUMENT}
              >
                Documentation
              </a>
              <a
                className="block text-footer-body"
                target="blank"
                href={SOCIAL_LINKS.GITHUB}
              >
                GitHub
              </a>
            </div>
            <div className="space-y-2 text-[13px]">
              <div className="text-footer-title">Resources</div>
              <Link
                className="block text-footer-body"
                target="blank"
                href="/changelog"
              >
                Changelog
              </Link>
            </div>
            <div className="space-y-2 text-[13px]">
              <div className="text-footer-title">Company</div>
              <a
                className="block text-footer-body"
                target="_blank"
                href={SOCIAL_LINKS.DISCORD}
              >
                Contact
              </a>
              <a
                className="block text-footer-body"
                target="_blank"
                href={SOCIAL_LINKS.TWITTER}
              >
                Twitter
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
