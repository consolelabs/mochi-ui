import React, { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { Button, IconButton, Tooltip } from '@mochi-ui/core'
import {
  Apt,
  Arb,
  Atom,
  ArrowRightLine,
  ArrowDownLine,
  Bnb,
  Btc,
  DiscordColored,
  Eth,
  Ftm,
  FacebookColored,
  Github,
  GoogleColored,
  Matic,
  Mnt,
  Op,
  Ron,
  RedditColored,
  Sol,
  Sui,
  SlackColored,
  Ton,
  X,
  ZkSync,
  CopySolid,
  FarcasterColored,
} from '@mochi-ui/icons'
import { HOME_URL } from '~envs'
import { TabbedFeatures } from '~cpn/landing/TabbedFeatures'
import { Divider } from '~cpn/landing/Divider'

const gray1 = '#F7F6F4'

function BrowseAPIs() {
  return (
    <div className="flex flex-col landing-container">
      <p className="text-2xl font-medium md:text-4xl">Browse APIs</p>
      <div className="flex flex-col gap-5 mt-5 md:grid md:grid-cols-2 md:grid-rows-3">
        {[
          {
            title: 'Profile',
            body: 'Provides end-users data on balance, transaction, and payment requests.',
            icon: '/developer/profile-circle.png',
          },
          {
            title: 'Balance',
            body: 'Query user balance on multichains',
            icon: '/developer/balance.png',
          },
          {
            title: 'Tip',
            body: 'Provides end-users data on balance, transaction, and payment requests.',
            icon: '/developer/tip.png',
          },
          {
            title: 'Pay Link',
            body: 'Query user balance on multichains',
            icon: '/developer/link.png',
          },
          {
            title: 'Server',
            body: 'Provides end-users data on balance, transaction, and payment requests.',
            icon: '/developer/server.png',
          },
          {
            title: 'Vault',
            body: 'Query user balance on multichains',
            icon: '/developer/vault.png',
          },
        ].map((d) => {
          return (
            <a
              target="_blank"
              href={HOME_URL}
              key={d.body}
              style={{ backgroundColor: gray1 }}
              className="flex overflow-hidden items-start rounded-lg"
            >
              <div className="relative flex-shrink-0 w-3 h-full">
                <Image
                  fill
                  alt=""
                  src="/developer/browse-api-left-border.jpg"
                />
              </div>
              <div className="flex gap-x-4 items-start p-6 h-full">
                <Image
                  width={48}
                  height={48}
                  src={d.icon}
                  className="hidden object-contain md:inline-block"
                  alt=""
                />
                <div className="flex flex-col gap-y-3 h-full md:gap-0">
                  <div className="flex gap-x-3">
                    <Image
                      width={32}
                      height={32}
                      src={d.icon}
                      className="object-contain md:hidden"
                      alt=""
                    />
                    developer
                    <div className="font-medium text-text-disabled">
                      <span className="text-lg md:text-base text-text-primary">
                        {d.title}
                      </span>{' '}
                      API
                    </div>
                  </div>
                  <span className="text-sm">{d.body}</span>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

const socials: [
  (props: React.SVGProps<SVGSVGElement>) => JSX.Element,
  string,
][] = [
  [FacebookColored, 'Facebook'],
  [DiscordColored, 'Discord'],
  [RedditColored, 'Reddit'],
  [GoogleColored, 'Google'],
  [X, 'X'],
  [Github, 'Github'],
  [SlackColored, 'Slack'],
  [FarcasterColored, 'Farcaster'],
]
const networks: [
  (props: React.SVGProps<SVGSVGElement>) => JSX.Element,
  string,
  boolean,
][] = [
  [Btc, 'BTC', false],
  [Eth, 'Ethereum', false],
  [Bnb, 'Binance', false],
  [Ftm, 'Fantom', false],
  [Matic, 'Polygon', false],
  [Ron, 'Ronin', false],
  [Arb, 'Arbitrum', true],
  [Mnt, 'Mantle', true],
  [Op, 'Optimism', true],
  [ZkSync, 'zkSync', true],
  [Sol, 'Solana', false],
  [Ton, 'Ton', true],
  [Apt, 'Aptos', true],
  [Sui, 'Sui', true],
  [Atom, 'Cosmos', true],
]
function SupportedPlatforms() {
  return (
    <div className="hidden flex-col mt-16 md:flex landing-container">
      <p className="text-4xl font-medium text-center">Supported platforms</p>
      <div className="flex flex-col gap-y-8 mt-8">
        <div className="flex flex-col gap-y-4">
          <span className="text-lg font-medium">Socials</span>
          <div className="grid grid-cols-5 auto-rows-auto border-t border-l border-neutral-outline-border">
            {socials.map(([Icon, name]) => (
              <div
                key={name}
                className="flex flex-col gap-y-3 justify-center items-center p-6 border-r border-b border-neutral-outline-border"
              >
                <Icon key={name} className="w-10 h-10" />
                <span className="text-base text">{name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <span className="text-lg font-medium">Networks</span>
          <div className="grid grid-cols-5 auto-rows-auto border-t border-l border-neutral-outline-border">
            {networks.map(([Icon, name, comingSoon]) => {
              return (
                <div
                  key={name}
                  className="flex flex-col gap-y-3 justify-center items-center p-6 border-r border-b border-neutral-outline-border"
                >
                  <div className="relative">
                    <Icon
                      className={clsx('w-10 h-10', {
                        'opacity-50': comingSoon,
                      })}
                    />
                    {comingSoon && (
                      <span className="absolute bottom-0 left-1/2 px-1 leading-3 rounded-full border -translate-x-1/2 text-xxxs bg-neutral-soft border-neutral-outline-border">
                        soon
                      </span>
                    )}
                  </div>
                  <span
                    className={clsx('text-base', { 'opacity-50': comingSoon })}
                  >
                    {name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function TryItOut() {
  const [idx, setIdx] = useState(0)
  return (
    <div className="hidden flex-col md:flex landing-container">
      <p className="text-4xl font-medium">Try it out</p>
      <div className="flex gap-x-5 mt-8">
        <ul className="flex flex-col flex-shrink-0 gap-y-2 w-1/3">
          {[
            'Start a payment',
            'Sell a product',
            'Issue coupons',
            'Get your balance',
            'Manage taxes',
          ].map((item, i) => {
            return (
              <li key={item}>
                <button
                  className={clsx(
                    'text-left w-full text-lg p-6 font-medium rounded-md transition border',
                    {
                      'border-primary-outline-border bg-primary-soft text-text-primary':
                        i === idx,
                      'border-neutral-outline-border hover:bg-neutral-outline-hover':
                        i !== idx,
                    },
                  )}
                  onClick={() => setIdx(i)}
                >
                  {item}
                </button>
              </li>
            )
          })}
        </ul>
        <div className="flex flex-col p-8 w-2/3 bg-neutral-800 rounded-2xl max-h-[500px]">
          <div className="flex justify-between items-center">
            <span className="text-xs uppercase text-white-pure">
              curl request
            </span>
            <IconButton label="Copy" variant="ghost" size="sm">
              <CopySolid className="w-5 h-5" aria-hidden />
            </IconButton>
          </div>
          <div className="overflow-auto h-full">
            <code className="text-sm text-text-contrast">
              <pre
                dangerouslySetInnerHTML={{
                  __html: `curl --location 'http://localhost:8200/api/v1/tip/transfer-v2' \
--header 'Content-Type: application/json'
--data '{
    "sender": "50453",
    "recipients": [
        "34123"
    ],
    "platform": "discord",
    "amount": 0.1,
    "token": "ftm",
    "transfer_type": "transfer",
    "chain_id": "250"
}'`,
                }}
                className="whitespace-pre-wrap"
              />
            </code>
            <div className="flex sticky bottom-0 justify-between items-center p-4 w-full text-sm font-medium rounded-lg bg-background-body">
              <span>
                <span className="text-primary-plain-fg">Sign in</span> to edit
                real requests.
              </span>
              <Tooltip content="Download" arrow="top-center">
                <div className="text-text-contrast rounded-lg bg-neutral-800 p-1">
                  <ArrowDownLine className="w-4 h-4" />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Developer() {
  return (
    <Layout>
      <SEO />
      <div className="flex flex-col items-center mt-24 landing-container">
        <p className="text-3xl font-medium text-center md:text-6xl">
          Bring Mochi power into
          <br />
          your app
        </p>
        <span className="mt-8 text-base font-normal text-center md:max-w-2xl md:text-lg text-text-secondary">
          Mochi allows developers to create a payment between users on any
          platforms, crossing web2 social platforms to web3 layers via a single
          API call.
        </span>
        <Button className="mt-5">
          Get API key
          <ArrowRightLine />
        </Button>
      </div>
      <Divider />
      <TabbedFeatures
        title="Build with Mochi APIs"
        data={[
          {
            id: 'monetize-your-innovation',
            title: 'Monetize your innovation',
            body: 'Our Open APIs serve as your canvas.With extensive & developer - friendly docs, you can craft secure and efficient payment app for everyone.',
            image: '/developer/build-with-mochi-apis-1.png',
          },
          {
            id: 'leverage-mochi-user-base',
            title: 'Leverage Mochi user base',
            body: 'Thousands of server are using Mochi. Building upon Mochi will ease your growth process and connect you to diverse demographic and geography.',
            image: '/developer/build-with-mochi-apis-1.png',
          },
          {
            id: 'we-made-things-ready-and-open',
            title: 'We made things ready and open',
            body: "We aggregate and build platform with latest advancements in blockchain and security, so you don't have to rebuild it.",
            image: '/developer/build-with-mochi-apis-1.png',
          },
          {
            id: 'we-re-here-to-support',
            title: "We're here to support",
            body: 'Our dedicated support team is always at your service, ensuring you have all you need to turn your ideas into reality.',
            image: '/developer/build-with-mochi-apis-1.png',
          },
        ]}
      />
      <Divider />
      <BrowseAPIs />
      <Divider />
      <TryItOut />
      <Divider className="hidden md:block" />
      <SupportedPlatforms />
      <div className="flex flex-col gap-x-10 gap-y-10 md:flex-row md:gap-y-0 md:items-center md:py-14 md:pt-4 md:mt-36 landing-container">
        <div className="flex flex-col flex-1">
          <p className="text-2xl font-medium md:text-4xl md:whitespace-nowrap">
            Ready to start building?
          </p>
          <span className="mt-2">
            Come up with your idea, tooling are ready, LFG.
          </span>
        </div>
        <div className="flex flex-1 gap-2 md:justify-end">
          <Button size="sm">
            Get API key <ArrowRightLine />
          </Button>
          <Button size="sm" variant="outline" color="neutral">
            View docs
          </Button>
        </div>
      </div>
      <Divider className="mt-12 md:mt-32" noSpace fullWidth />
    </Layout>
  )
}

Developer.layoutType = 'landing'
