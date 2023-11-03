import Image from 'next/image'
import clsx from 'clsx'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import {
  Button,
  IconAPT,
  IconARB,
  IconATOM,
  IconArrow,
  IconBNB,
  IconBTC,
  IconDiscordColored,
  IconETH,
  IconFTM,
  IconFacebookColored,
  IconGithub,
  IconGoogleColored,
  IconMATIC,
  IconMNT,
  IconOP,
  IconRON,
  IconRedditColored,
  IconSOL,
  IconSUI,
  IconSlackColored,
  IconTON,
  IconX,
  IconZkSync,
} from '@consolelabs/ui-components'
import { HOME_URL } from '~envs'
import { useState } from 'react'

const gray1 = '#F7F6F4'

function BuildWithMochiAPIs() {
  const [idx, setIdx] = useState(0)

  return (
    <div className="flex flex-col gap-y-3 mx-auto w-full max-w-4xl">
      <span className="text-3xl font-medium">Build with Mochi APIs</span>
      <div className="flex gap-x-5">
        <ul className="flex flex-col flex-1 gap-y-2">
          {[
            {
              title: 'Monetize your innovation',
              body: 'Our Open APIs serve as your canvas.With extensive & developer - friendly docs, you can craft secure and efficient payment app for everyone.',
            },
            {
              title: 'Leverage Mochi user base',
              body: 'Thousands of server are using Mochi. Building upon Mochi will ease your growth process and connect you to diverse demographic and geography.',
            },
            {
              title: 'We made things ready and open',
              body: "We aggregate and build platform with latest advancements in blockchain and security, so you don't have to rebuild it.",
            },
            {
              title: "We're here to support",
              body: 'Our dedicated support team is always at your service, ensuring you have all you need to turn your ideas into reality.',
            },
          ].map((d, i) => {
            return (
              <li key={d.title}>
                <button
                  className={clsx(
                    'text-left flex flex-col p-6 rounded-lg transition hover:bg-neutral-150',
                    {
                      'bg-neutral-150': i === idx,
                      'bg-transparent': i !== idx,
                    },
                  )}
                  type="button"
                  onClick={() => setIdx(i)}
                >
                  <span className="text-xl font-medium leading-4">
                    {d.title}
                  </span>
                  <span className="mt-4 text-base font-thin">{d.body}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <div className="relative flex-1">
          <Image
            className="object-contain"
            fill
            alt=""
            src="/developer/build-with-mochi-apis-1.png"
          />
        </div>
      </div>
    </div>
  )
}

function BrowseAPIs() {
  return (
    <div className="flex flex-col mx-auto w-full max-w-4xl">
      <p className="text-3xl font-medium font-text">Browse APIs</p>
      <div className="grid grid-cols-2 grid-rows-3 gap-5 mt-5">
        {[
          {
            title: (
              <div className="font-medium text-gray-500 font-text">
                <span className="text-foreground">Profile</span> API
              </div>
            ),
            body: 'Provides end-users data on balance, transaction, and payment requests.',
            icon: '/developer/profile-circle.png',
          },
          {
            title: (
              <div className="font-medium text-gray-500 font-text">
                <span className="text-foreground">Balance</span> API
              </div>
            ),
            body: 'Query user balance on multichains',
            icon: '/developer/balance.png',
          },
          {
            title: (
              <div className="font-medium text-gray-500 font-text">
                <span className="text-foreground">Tip</span> API
              </div>
            ),
            body: 'Provides end-users data on balance, transaction, and payment requests.',
            icon: '/developer/tip.png',
          },
          {
            title: (
              <div className="font-medium text-gray-500 font-text">
                <span className="text-foreground">Pay Link</span> API
              </div>
            ),
            body: 'Query user balance on multichains',
            icon: '/developer/link.png',
          },
          {
            title: (
              <div className="font-medium text-gray-500 font-text">
                <span className="text-foreground">Server</span> API
              </div>
            ),
            body: 'Provides end-users data on balance, transaction, and payment requests.',
            icon: '/developer/server.png',
          },
          {
            title: (
              <div className="font-medium text-gray-500 font-text">
                <span className="text-foreground">Vault</span> API
              </div>
            ),
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
              className="flex overflow-hidden flex-1 items-start rounded-lg"
            >
              <div className="relative flex-shrink-0 w-3 h-full">
                <Image
                  fill
                  alt=""
                  src="/developer/browse-api-left-border.jpg"
                />
              </div>
              <div className="flex gap-x-4 items-start p-5">
                <Image
                  width={48}
                  height={48}
                  src={d.icon}
                  className="object-contain"
                  alt=""
                />
                <div className="flex flex-col">
                  {d.title}
                  <span className="text-sm font-text">{d.body}</span>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

const comingSoons = [
  IconMNT.name,
  IconOP.name,
  IconZkSync.name,
  IconAPT.name,
  IconSUI.name,
  IconATOM.name,
] as const
function SupportedPlatforms() {
  return (
    <div className="flex flex-col mx-auto w-full max-w-4xl">
      <p className="text-3xl font-medium font-text">Supported platforms</p>
      <div className="flex flex-col gap-y-8 mt-8">
        <div className="flex flex-col gap-y-4">
          <span>Social</span>
          <div className="flex flex-wrap gap-10">
            {[
              IconFacebookColored,
              IconDiscordColored,
              IconRedditColored,
              IconGoogleColored,
              IconX,
              IconGithub,
              IconSlackColored,
            ].map((Icon) => (
              <Icon key={Icon.name} className="w-10 h-10" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <span>Network</span>
          <div className="flex flex-wrap gap-10">
            {[
              IconBTC,
              IconETH,
              IconBNB,
              IconFTM,
              IconMATIC,
              IconRON,
              IconARB,
              IconMNT,
              IconOP,
              IconZkSync,
              IconSOL,
              IconTON,
              IconAPT,
              IconSUI,
              IconATOM,
            ].map((Icon) => {
              if (comingSoons.includes(Icon.name)) {
                return (
                  <div key={Icon.name} className="relative">
                    <Icon className="w-10 h-10 opacity-50" />
                    <span className="absolute bottom-0 left-1/2 px-1 leading-3 rounded-full border -translate-x-1/2 text-xxs bg-white-pure border-neutral-200">
                      soon
                    </span>
                  </div>
                )
              }

              return <Icon key={Icon.name} className="w-10 h-10" />
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
    <div className="flex flex-col mx-auto w-full max-w-4xl">
      <p className="text-3xl font-medium font-text">Try it out</p>
      <div className="flex gap-x-4 mt-8">
        <ul className="flex flex-col gap-y-2 p-4 w-1/3 rounded-lg bg-neutral-150">
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
                    'p-4 font-medium rounded-md transition hover:bg-white-pure',
                    {
                      'bg-white-pure': i === idx,
                      'bg-transparent': i !== idx,
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
        <div className="flex overflow-auto flex-col gap-y-3 p-8 w-2/3 bg-gray-700 rounded-2xl">
          <div className="flex justify-between">
            <span className="text-xs uppercase text-white-pure">
              curl request
            </span>
          </div>
          <code className="text-sm text-white-pure">
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
            />
          </code>
          <div className="sticky bottom-0 p-4 w-full text-sm rounded-lg bg-white-pure">
            <span className="text-blue-500">Sign in</span> to edit real
            requests.
          </div>
        </div>
      </div>
    </div>
  )
}

function Divider() {
  return <hr className="my-16 mx-auto w-full max-w-4xl" />
}

export default function Developer() {
  return (
    <Layout>
      <SEO />
      <div className="flex flex-col items-center mx-auto mt-24 max-w-4xl">
        <p className="text-5xl font-medium text-center font-text">
          Bring Mochi power into
          <br />
          your app
        </p>
        <span className="mt-8 text-lg font-thin text-center">
          Mochi allows developers to create a payment between users on any
          platforms, crossing web2 social platforms to web3 layers via a single
          API call.
        </span>
        <Button className="mt-5">
          Get API key
          <IconArrow />
        </Button>
      </div>
      <Divider />
      <BuildWithMochiAPIs />
      <Divider />
      <BrowseAPIs />
      <Divider />
      <TryItOut />
      <Divider />
      <SupportedPlatforms />
      <Divider />
      <div className="flex gap-x-10 items-center py-14 mx-auto w-full max-w-4xl">
        <div className="flex flex-col flex-1">
          <p className="text-4xl font-medium whitespace-nowrap font-text">
            Ready to start building?
          </p>
          <span className="mt-2 font-text">
            Come up with your idea, tooling are ready, LFG.
          </span>
        </div>
        <div className="flex flex-1 gap-2 justify-end">
          <Button size="sm">
            Get API key <IconArrow />
          </Button>
          <Button size="sm" variant="outline" color="info">
            View docs
          </Button>
        </div>
      </div>
    </Layout>
  )
}
