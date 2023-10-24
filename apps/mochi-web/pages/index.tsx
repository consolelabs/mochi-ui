import { Icon } from '@iconify/react'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { INVITE_LINK, TELEGRAM_LINK } from '~envs'
import { home } from '~utils/image'
import { IntegratedChains } from '~components/IntegratedChains'
import Typed from 'typed.js'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Feed from '~components/Feed'
import Stats from '~components/stats'

export default function Index() {
  const currency = useRef<HTMLSpanElement>(null)
  const platform = useRef<HTMLSpanElement>(null)
  const command = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const typedCur = new Typed(currency.current, {
      strings: ['Ethereum', 'Bitcoin', 'Solana', 'Dogecoin'],
      typeSpeed: 80,
      backDelay: 1800,
      loop: true,
      shuffle: true,
    })

    const typedPlat = new Typed(platform.current, {
      strings: ['Discord', 'Telegram', 'Email', 'any text interface'],
      typeSpeed: 50,
      backDelay: 1800,
      loop: true,
    })

    const typedCommand = new Typed(command.current, {
      strings: [
        'tip @john 1 eth',
        'tip all 10 sol each',
        'tip vincent@console.so 2 eth',
        'airdrop 2 doge in 2 minutes',
        'airdrop 2 ftm for 3 in 5 minutes',
      ],
      typeSpeed: 30,
      backDelay: 1800,
      backSpeed: 55,
      loop: true,
    })

    return () => {
      typedCur.destroy()
      typedPlat.destroy()
      typedCommand.destroy()
    }
  }, [])

  return (
    <Layout>
      <SEO />
      <div className="flex justify-center py-8 px-4 my-auto w-full md:p-10">
        <div className="flex flex-col-reverse gap-x-10 gap-y-10 justify-center max-w-5xl md:flex-row">
          <div className="flex flex-col flex-1 justify-center">
            <p className="text-3xl md:text-4xl">
              Send <span ref={currency}></span>
              <br />
              to anyone on
              <br />
              <span ref={platform}></span>
            </p>
            <span className="mt-5 font-thin">
              Use Mochi to send and receive any amount of crypto, directly on
              your favorite Discord servers or Telegram groups, without having a
              wallet or having to pay a single cent in fees!
            </span>

            <div className="flex flex-col gap-3 items-start pt-3 md:flex-row">
              <a
                href={INVITE_LINK}
                className="flex gap-x-2 items-center py-2 px-5 whitespace-nowrap rounded-md bg-discord"
              >
                <Icon icon="carbon:logo-discord" color="#fff" />
                <span className="text-sm font-medium text-white md:text-base">
                  Add Discord
                </span>
              </a>
              <a
                href={TELEGRAM_LINK}
                className="flex gap-x-2 items-center py-2 px-5 whitespace-nowrap rounded-md bg-telegram"
              >
                <Icon icon="bi:telegram" color="#fff" />
                <span className="text-sm font-medium text-white md:text-base">
                  Add Telegram
                </span>
              </a>
            </div>
            <div className="flex flex-col gap-y-1 mt-4">
              <span className="text-sm font-medium">Soon available on:</span>
              <div className="flex gap-2">
                {[
                  { icon: 'simple-icons:slack' },
                  {
                    icon: 'simple-icons:windowsterminal',
                  },
                ].map(({ icon }) => {
                  return (
                    <div
                      key={icon}
                      className="flex flex-col gap-y-1 items-center"
                    >
                      <div className="p-1.5 w-6 h-6 rounded bg-foreground-secondary">
                        <Icon
                          icon={icon}
                          className="flex-shrink-0 w-full h-full text-white"
                        />
                      </div>
                    </div>
                  )
                })}
                <div className="flex flex-col gap-y-1 items-center">
                  <div className="p-1.5 w-6 h-6 rounded bg-foreground-secondary">
                    <Image
                      alt=""
                      width={24}
                      height={24}
                      className="rounded invert"
                      src="/warpcast.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex relative flex-1">
            <img className="mx-auto w-1/2 md:w-auto" src={home.src} alt="" />
          </div>
        </div>
      </div>
      <Stats />
      <Feed />
      <div className="flex flex-col mb-20">
        <p className="mx-auto mb-3 text-xl">Mochi supports these chains</p>
        <IntegratedChains />
      </div>
      <div className="flex justify-center py-7 px-8 bg-white md:py-14 md:px-16">
        <div className="flex flex-col-reverse gap-y-10 w-full max-w-5xl md:flex-row">
          <div className="flex flex-col flex-1 gap-y-1">
            <p className="text-3xl">Simple, intuitive commands</p>
            <span>
              Mochi has a single, extensible command for tipping, airdropping on
              users.
            </span>
          </div>
          <div className="flex flex-1 justify-center items-center">
            <div className="flex py-1 px-3 rounded border border-gray-100 shadow text-foreground bg-home-gray-600">
              <span className="text-xl md:text-2xl">
                /<span ref={command}></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
