import { renderToString } from 'react-dom/server'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import Typed from 'typed.js'
import { useEffect, useRef } from 'react'
import Stats from '~components/stats'
import MochiWidget from '~cpn/MochiWidget'
import { TabbedFeatures } from '~cpn/landing/TabbedFeatures'
import { SupportedPlatforms } from '~cpn/landing/SupportedPlatforms'
import { LivePlatforms } from '~cpn/landing/LivePlatforms'
import { Divider } from '~cpn/landing/Divider'
import { Button } from '@mochi-ui/core'
import { useLoginWidget } from '@mochi-web3/login-widget'
import {
  ArrowRightLine,
  BlocksColored,
  HandKeyColored,
  LayersColored,
  PasswordLockColored,
  WalletPasswordColored,
} from '@mochi-ui/icons'
import { GridFeatures } from '~cpn/landing/GridFeatures'
import Feed from '~cpn/Feed'
import Link from 'next/link'
import { ROUTES } from '~constants/routes'
import { NativeImage } from '~cpn/NativeImage'

const currencies = [
  `<span class="banner-token solana-color">&#8203;${renderToString(
    <NativeImage
      src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
      alt="Solana"
      className="w-9 h-9 md:w-10 md:h-10"
    />,
  )}Solana</span>`,
  `<span class="banner-token usdt-color">&#8203;${renderToString(
    <NativeImage
      className="w-9 h-9 md:w-10 md:h-10"
      src="https://coin.top/production/logo/usdtlogo.png"
      alt="USDT"
    />,
  )}USDT</span>`,
  `<span class="banner-token bitcoin-color">&#8203;${renderToString(
    <NativeImage
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/128px-Bitcoin.svg.png"
      alt="Bitcoin"
      className="w-9 h-9 md:w-10 md:h-10"
    />,
  )}Bitcoin</span>`,
  `<span class="banner-token ethereum-color">&#8203;${renderToString(
    <NativeImage
      src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png"
      className="object-contain w-9 h-9 md:w-10 md:h-10"
      alt="Ethereum"
    />,
  )}Ethereum</span>`,
]
const platforms = [
  '<span class="fb-color">Facebook</span>',
  '<span class="discord-color">Discord</span>',
  '<span class="telegram-color">Telegram</span>',
  '<span class="email-color">Email</span>',
]

export default function Index() {
  const { isLoggedIn } = useLoginWidget()
  const currency = useRef<HTMLSpanElement>(null)
  const platform = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const typedCur = new Typed(currency.current, {
      showCursor: false,
      strings: currencies,
      typeSpeed: 90,
      backSpeed: 50,
      backDelay: 5000,
      loop: true,
    })

    const typedPlat = new Typed(platform.current, {
      showCursor: false,
      strings: platforms,
      typeSpeed: 90,
      backDelay: 5000,
      backSpeed: 50,
      loop: true,
    })

    return () => {
      typedCur.destroy()
      typedPlat.destroy()
    }
  }, [])

  return (
    <Layout>
      <SEO title="Mochi" />
      <div className="grid grid-cols-1 auto-rows-min gap-y-7 gap-x-32 py-8 m-auto lg:grid-cols-2 lg:grid-rows-2 xl:gap-x-60 landing-container">
        <div className="flex flex-col lg:justify-end">
          <p className="text-[32px] leading-[38.4px] title-tracking text-text-primary md:text-[40px] md:leading-[48px]">
            Send{' '}
            <span
              ref={currency}
              className="font-medium text-[32px] leading-[38.4px] title-tracking md:text-[40px] md:leading-[48px]"
            />
            <br />
            to frens on{' '}
            <span>
              &#8203;
              <span ref={platform} className="font-medium" />
            </span>
          </p>
          <span className="mt-5 text-lg font-normal text-text-secondary">
            Use Mochi to send and receive any amount of crypto, directly on your
            favorite Discord servers or Telegram groups, without having a wallet
            or having to pay a single cent in fees.
          </span>
        </div>

        <div className="flex relative justify-center mx-auto w-full lg:col-start-2 lg:row-span-2 lg:mx-0">
          <MochiWidget wrapperClassName="max-w-[480px]" />
        </div>

        <div className="flex flex-col mt-5 lg:mt-2">
          <LivePlatforms />
          {/* <SoonAvailablePlatforms className="mt-5" /> */}
          {/* <Alert className="mt-5" appearance="info" size="sm"> */}
          {/*   <span> */}
          {/*     To integrate and run the Mochi bot, embedded devices, or leverage */}
          {/*     the userbase,{' '} */}
          {/*     <a href="#" className="inline-block underline"> */}
          {/*       check our Docs */}
          {/*     </a> */}
          {/*   </span> */}
          {/* </Alert> */}
        </div>
      </div>
      <Stats className="hidden md:flex" />
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
                <span className="text-sm leading-7 rounded border px-[3px] py-[2px] border-neutral-outline-border">
                  @role
                </span>
                ,{' '}
                <span className="text-sm leading-7 rounded border px-[3px] py-[2px] border-neutral-outline-border">
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
        className="mt-10"
        title="Mochi goes Web3"
        data={[
          {
            id: 'support-on-chain-and-hybrid',
            title: 'On-chain & Hybrid Support',
            body: 'Make gasless transactions easily using social handles, ensuring strong security. Connect with different blockchains for both on-chain and hybrid transactions.',
            icon: <BlocksColored className="w-8 h-8 md:w-12 md:h-12" />,
          },
          {
            id: 'self-custodial-solutions',
            title: 'Self-custodial Solutions',
            body: "Take command of your assets with Mochi's self-custodial solutions, ensuring true ownership. Enjoy secure storage without compromising usability.",
            icon: <HandKeyColored className="w-8 h-8 md:w-12 md:h-12" />,
          },
          {
            id: 'invisible-wallets',
            title: 'Invisible Wallets',
            body: "Login with Telegram, Discord, SSO or Facebook account make onboarding seamless. Nevermind where's the seedphrase.",
            icon: <WalletPasswordColored className="w-8 h-8 md:w-12 md:h-12" />,
          },
          {
            id: 'keyless-wallet',
            title: 'Keyless Wallet',
            body: 'Elevate security by multiple protection layer while keep the friendly experience for all both crypto wizard and newbie.',
            icon: <LayersColored className="w-8 h-8 md:w-12 md:h-12" />,
          },
          {
            id: 'account-abstraction',
            title: 'Account Abstraction',
            body: 'Enables smart accounts, that can initiate and execute transactions without the need for an external account.',
            icon: <PasswordLockColored className="w-8 h-8 md:w-12 md:h-12" />,
          },
          {
            id: 'advanded-security-measures',
            title: 'Advanced Security Measures',
            body: 'Protect your assets by a high-tech lock - strong encryption, providing a worry-free Web3 experience.',
            icon: <PasswordLockColored className="w-8 h-8 md:w-12 md:h-12" />,
          },
        ]}
      />
      <Divider />
      <SupportedPlatforms />
      <div className="flex justify-center mb-8 md:justify-between md:my-20 landing-container">
        <div className="flex flex-col gap-y-1">
          <p className="text-3xl font-semibold title-tracking text-text-primary">
            Simple, intuitive commands
          </p>
          <span className="mt-2 text-base font-normal md:text-lg text-text-primary">
            Mochi has a single, extensible command for tipping, airdropping on
            users.
          </span>
          <LivePlatforms className="mt-3" />
          <Link href={ROUTES.FEATURES} className="mt-1 md:hidden">
            <Button
              className="justify-center w-full"
              size="lg"
              color="neutral"
              variant="outline"
            >
              View features
              <ArrowRightLine />
            </Button>
          </Link>
        </div>
        <div className="hidden gap-2 justify-center items-center md:flex">
          <Link href={ROUTES.MY_PROFILE}>
            <Button size="lg" className="!px-10">
              {isLoggedIn ? 'Profile' : 'Login'}
            </Button>
          </Link>
          <Link className="hidden" href={ROUTES.FEATURES}>
            <Button size="lg" color="neutral" variant="outline">
              View features
              <ArrowRightLine />
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

Index.layoutType = 'landing'
