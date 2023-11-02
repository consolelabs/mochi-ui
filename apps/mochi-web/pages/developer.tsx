import { Icon } from '@iconify/react'
import Image from 'next/image'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import Stats from '~components/stats'
import { SOCIAL_LINKS } from '~constants'

const gray1 = '#F7F6F4'
const gray2 = '#E5E5E3'

export default function Developer() {
  return (
    <Layout>
      <SEO />
      <div className="flex flex-col items-center mx-auto mt-24 max-w-3xl">
        <p className="text-5xl font-medium text-center font-text">
          Bring Mochi power into
          <br />
          your space
        </p>
        <span className="mt-4 text-lg text-center font-text">
          Integrate and run Mochi social payment bot with ease. Our flexible
          platform and reliable data infrastructure are developer-friendly,
          ensuring effortless management at any scale.
        </span>
        <a
          target="_blank"
          href={`${SOCIAL_LINKS.README}/reference/getting-started-with-your-api-1`}
          className="flex gap-x-1 items-center py-1 px-3 pr-2 mt-5 whitespace-nowrap bg-green-700 rounded-full"
        >
          <span className="text-sm font-medium text-white-pure">
            Get API key
          </span>
          <Icon
            icon="basil:arrow-right-solid"
            className="w-6 h-6 text-white-pure"
          />
        </a>
      </div>

      <Stats />
      <hr className="mx-auto mt-16 mb-10 w-full max-w-3xl" />
      <div className="grid grid-cols-2 grid-rows-2 gap-2 mx-auto max-w-3xl">
        {[
          {
            title: 'Monetize your innovation',
            icon: 'healthicons:money-bag',
            color: '#E77606',
            text: 'Our Open APIs serve as your canvas. With extensive & developer-friendly documentation, you can craft unique, secure, and efficient payment app for everyone. ',
          },
          {
            title: 'Leveraging Mochi Userbase',
            icon: 'gridicons:globe',
            color: '#027AFF',
            text: 'A thriving ecosystem and thousands of server are using Mochi. Building upon Mochi will ease your growth process and connect you to diverse demographic and geography.',
          },
          {
            title: 'Cutting-Edge Technology',
            icon: 'mdi:hammer-wrench',
            color: '#A259FF',
            text: "We build the platform leveraging latest advancements in blockchain and security so you don't have to rebuild it.",
          },
          {
            title: 'Community & Support',
            icon: 'fa6-regular:handshake',
            color: '#15A45A',
            text: 'Our dedicated support team is always at your service, ensuring you have all you need to turn your ideas into reality.',
          },
        ].map(({ title, text, icon, color }) => {
          return (
            <div
              key={title}
              style={{ backgroundColor: gray1 }}
              className="flex flex-col justify-end p-4 pt-32 rounded-xl"
            >
              <div className="flex items-center">
                <div
                  style={{ backgroundColor: color }}
                  className="p-0.5 w-4 h-4 rounded-full"
                >
                  <Icon icon={icon} className="w-full h-full text-white" />
                </div>
                <span
                  style={{ color }}
                  className="ml-2 text-sm font-medium font-text"
                >
                  {title}
                </span>
              </div>
              <p className="mt-2 font-thin font-text">{text}</p>
            </div>
          )
        })}
      </div>
      <hr className="mx-auto mt-16 mb-10 w-full max-w-3xl" />
      <div className="flex flex-col py-10 mx-auto max-w-3xl">
        <p className="text-3xl font-medium font-text">
          Build with state-of-the-art APIs
        </p>
        <div className="flex gap-x-5 mt-5">
          <div
            style={{ backgroundColor: gray1 }}
            className="flex overflow-hidden flex-1 rounded-lg"
          >
            <div
              style={{ backgroundColor: gray2 }}
              className="w-5 h-full bg-gray-200"
            />
            <div className="flex flex-col p-5">
              <Image width={36} height={36} src="/profile-circle.png" alt="" />
              <div className="mt-4 font-medium text-gray-500 font-text">
                <span className="font-medium text-foreground">Profile</span> API
              </div>
              <span className="mb-5 text-sm font-text">
                Provides end-users data on balance, transaction, and payment
                requests.
              </span>
              <a
                target="_blank"
                href={`${SOCIAL_LINKS.README}/reference/get-profile-from-id`}
                className="self-start py-1 px-3 mt-auto text-sm font-medium rounded-lg border border-gray-200 shadow bg-white-pure"
              >
                Read the docs
              </a>
            </div>
          </div>
          <div
            style={{ backgroundColor: gray1 }}
            className="flex overflow-hidden flex-1 rounded-lg"
          >
            <div
              style={{ backgroundColor: gray2 }}
              className="w-5 h-full bg-gray-200"
            />
            <div className="flex flex-col p-5">
              <Image width={36} height={36} src="/layers.png" alt="" />
              <div className="mt-4 font-medium text-gray-500 font-text">
                <span className="font-medium text-foreground">Balance</span> API
              </div>
              <span className="mb-5 text-sm font-text">
                Query user balance on multichains.
              </span>
              <a
                target="_blank"
                href={`${SOCIAL_LINKS.README}/reference/get-application-balances`}
                className="self-start py-1 px-3 mt-auto text-sm font-medium rounded-lg border border-gray-200 shadow bg-white-pure"
              >
                Read the docs
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className="mx-auto mt-16 mb-10 w-full max-w-3xl" />
      <div className="flex gap-x-10 items-center py-14 mx-auto max-w-3xl">
        <div className="flex flex-col w-2/3">
          <p className="text-4xl font-medium font-text">
            Ready to start building?
          </p>
          <span className="mt-2 font-text">
            Access the industry&apos;s most complete view of blockchain data
            with Mochi.
          </span>
        </div>
        <div className="flex gap-2 w-1/3">
          <a
            target="_blank"
            href={`${SOCIAL_LINKS.README}/reference/getting-started-with-your-api-1`}
            className="flex gap-x-1 items-center py-1 px-3 pr-2 mt-3 whitespace-nowrap bg-green-700 rounded-full"
          >
            <span className="text-sm font-medium text-white-pure">
              Get API key
            </span>
            <Icon
              icon="basil:arrow-right-solid"
              className="w-6 h-6 text-white-pure"
            />
          </a>
          <a
            target="_blank"
            href={`${SOCIAL_LINKS.README}/reference/getting-started-with-your-api-1`}
            style={{ backgroundColor: gray1 }}
            className="flex gap-x-1 items-center py-1 px-3 mt-3 whitespace-nowrap rounded-full border border-gray-200"
          >
            <span className="text-sm">view docs</span>
          </a>
        </div>
      </div>
    </Layout>
  )
}
