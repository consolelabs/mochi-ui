import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import Typed from 'typed.js'
import { useEffect, useRef, useState } from 'react'
import Stats from '~components/stats'
import MochiWidget from '~cpn/MochiWidget'
import { Alert } from '@consolelabs/alert'
import { TabbedFeatures } from '~cpn/landing/TabbedFeatures'
import { SupportedPlatforms } from '~cpn/landing/SupportedPlatforms'
import { LivePlatforms } from '~cpn/landing/LivePlatforms'
import { SoonAvailablePlatforms } from '~cpn/landing/SoonAvailablePlatforms'
import { Divider } from '~cpn/landing/Divider'
import { Button } from '@consolelabs/ui-components'
import {
  IconArrowRight,
  IconBlocksColored,
  IconHandKeyColored,
  IconLayersColored,
  IconPasswordLockColored,
  IconWalletPasswordColored,
} from '@consolelabs/icons'
import { GridFeatures } from '~cpn/landing/GridFeatures'
import Feed from '~cpn/Feed'

const colorsByCurrency = {
  Ethereum: '#8A93B2',
  Bitcoin: '#F7931A',
  Solana: '#14F195',
  Dogecoin: '#cb9800',
}

const colorsByPlatform = {
  Discord: '#5865F2',
  Telegram: '#229ED9',
  Email: '#c71610',
  'any text interface': '#017AFF',
}

const currencies = ['Ethereum', 'Bitcoin', 'Solana', 'Dogecoin']
const platforms = ['Discord', 'Telegram', 'Email', 'any text interface']

export default function Index() {
  const currency = useRef<HTMLSpanElement>(null)
  const platform = useRef<HTMLSpanElement>(null)
  const [currencyColor, setCurrencyColor] = useState(colorsByCurrency.Ethereum)
  const [platformColor, setPlatformColor] = useState(colorsByPlatform.Discord)

  useEffect(() => {
    const typedCur = new Typed(currency.current, {
      strings: currencies,
      typeSpeed: 80,
      backDelay: 1800,
      loop: true,
      preStringTyped: (idx) => {
        const cur = currencies[idx] as keyof typeof colorsByCurrency
        setCurrencyColor(colorsByCurrency[cur])
      },
    })

    const typedPlat = new Typed(platform.current, {
      strings: platforms,
      typeSpeed: 50,
      backDelay: 1800,
      loop: true,
      preStringTyped: (idx) => {
        const cur = platforms[idx] as keyof typeof colorsByPlatform
        setPlatformColor(colorsByPlatform[cur])
      },
    })

    return () => {
      typedCur.destroy()
      typedPlat.destroy()
    }
  }, [])

  return (
    <Layout>
      <SEO />
      <div className="flex justify-center py-8 px-4 my-auto w-full md:p-10">
        <div className="flex flex-col-reverse gap-x-10 gap-y-10 justify-center max-w-5xl md:flex-row">
          <div className="flex flex-col flex-1 justify-center">
            <p className="text-3xl md:text-4xl">
              Send <span style={{ color: currencyColor }} ref={currency} />
              <br />
              to anyone on
              <br />
              <span style={{ color: platformColor }} ref={platform} />
            </p>
            <span className="mt-5 font-thin">
              Use Mochi to send and receive any amount of crypto, directly on
              your favorite Discord servers or Telegram groups, without having a
              wallet or having to pay a single cent in fees.
            </span>

            <LivePlatforms className="mt-10" />
            <SoonAvailablePlatforms className="mt-5" />
            <Alert className="mt-5" appearance="info" size="sm">
              <span>
                To integrate and run the Mochi bot, embedded devices, or
                leverage the userbase,{' '}
                <a href="#" className="inline-block underline">
                  check our Docs
                </a>
              </span>
            </Alert>
          </div>
          <div className="flex relative flex-1">
            <MochiWidget />
          </div>
        </div>
      </div>
      <Stats />
      <Feed />
      <TabbedFeatures
        className="mt-20"
        title="Faster, more fun payments"
        data={[
          {
            id: 'tip-anyone',
            title: 'Tip anyone',
            body: (
              <>
                Send money to anyone, anywhere, and Mochi will automatically
                calculate the split. You can send to a recipient by{' '}
                <span className="text-sm leading-7 rounded border px-[3px] py-[2px] border-neutral-400">
                  @role
                </span>
                ,{' '}
                <span className="text-sm leading-7 rounded border px-[3px] py-[2px] border-neutral-400">
                  #channel
                </span>{' '}
                or even on other socials.
              </>
            ),
            image: '/developer/build-with-mochi-apis-1.png',
          },
          {
            id: 'send-a-gift',
            title: 'Send a gift',
            body: 'Spread the joy to your frens and show them your heartwarming affection: buy them a Starbucks, celebrate a birthday, or just be generous – because you can!',
            image: '/developer/build-with-mochi-apis-1.png',
          },
          {
            id: 'create-a-paylink',
            title: 'Create a pay link',
            body: "We aggregate and build platform with latest advancements in blockchain and security, so you don't have to rebuild it.",
            image: '/developer/build-with-mochi-apis-1.png',
          },
          {
            id: 'transfer-nft',
            title: 'Transfer NFT',
            body: 'Our dedicated support team is always at your service, ensuring you have all you need to turn your ideas into reality.',
            image: '/developer/build-with-mochi-apis-1.png',
          },
        ]}
      />
      <Divider />
      <GridFeatures
        title="Mochi goes Web3"
        data={[
          {
            id: 'support-on-chain-and-hybrid',
            title: 'Support On-chain & Hybrid',
            body: 'Lorem ipsum dolor sit amet consectetur. Laoreet risus sagittis laoreet mi. Diam mauris praesent cursus adipiscing. Et aliquam tellus purus odio sapien id arcu egestas. Commodo venenatis aliquet nunc commodo.',
            icon: <IconBlocksColored className="w-12 h-12" />,
          },
          {
            id: 'self-custodial',
            title: 'Self-custodial',
            body: 'Lorem ipsum dolor sit amet consectetur. Laoreet risus sagittis laoreet mi. Diam mauris praesent cursus adipiscing. Et aliquam tellus purus odio sapien id arcu egestas. Commodo venenatis aliquet nunc commodo.',
            icon: <IconHandKeyColored className="w-12 h-12" />,
          },
          {
            id: 'invisible-wallets',
            title: 'Invisible Wallets',
            body: 'Lorem ipsum dolor sit amet consectetur. Laoreet risus sagittis laoreet mi. Diam mauris praesent cursus adipiscing. Et aliquam tellus purus odio sapien id arcu egestas. Commodo venenatis aliquet nunc commodo.',
            icon: <IconWalletPasswordColored className="w-12 h-12" />,
          },
          {
            id: 'multi-auth-method',
            title: 'Multi Auth Method',
            body: 'Lorem ipsum dolor sit amet consectetur. Laoreet risus sagittis laoreet mi. Diam mauris praesent cursus adipiscing. Et aliquam tellus purus odio sapien id arcu egestas. Commodo venenatis aliquet nunc commodo.',
            icon: <IconLayersColored className="w-12 h-12" />,
          },
          {
            id: 'account-abstraction',
            title: 'Account Abstraction',
            body: 'Lorem ipsum dolor sit amet consectetur. Laoreet risus sagittis laoreet mi. Diam mauris praesent cursus adipiscing. Et aliquam tellus purus odio sapien id arcu egestas. Commodo venenatis aliquet nunc commodo.',
            icon: <IconPasswordLockColored className="w-12 h-12" />,
          },
          {
            id: '?',
            title: '?',
            body: 'Lorem ipsum dolor sit amet consectetur. Laoreet risus sagittis laoreet mi. Diam mauris praesent cursus adipiscing. Et aliquam tellus purus odio sapien id arcu egestas. Commodo venenatis aliquet nunc commodo.',
            icon: <IconPasswordLockColored className="w-12 h-12" />,
          },
        ]}
      />
      <Divider />
      <SupportedPlatforms />
      <div className="flex justify-center my-36 landing-block">
        <div className="flex flex-col-reverse gap-y-10 w-full max-w-5xl md:flex-row">
          <div className="flex flex-col flex-1 gap-y-1">
            <p className="text-4xl text-neutral-900">
              Simple, intuitive commands
            </p>
            <span className="mt-2 text-lg font-thin text-neutral-700">
              Mochi has a single, extensible command for tipping, airdropping on
              users.
            </span>
            <LivePlatforms className="mt-3" />
          </div>
          <div className="flex flex-1 gap-2 justify-center items-center">
            <Button className="!px-10">Login</Button>
            <Button color="info" variant="outline">
              View features
              <IconArrowRight />
            </Button>
          </div>
        </div>
      </div>
      <Divider noSpace fullWidth />
    </Layout>
  )
}
