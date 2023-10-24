import Text from '~cpn/base/text'
import { SEO } from '~app/layout/seo'
import QRCodeButton from '~components/Pay/QRCodeButton'
import CopyLinkButton from '~components/Pay/CopyLinkButton'
import ShareButton from '~components/Pay/ShareButton'
import PaymentButton from '~components/Pay/PaymentButton'
import { Layout } from '~app/layout'
import { GetServerSideProps } from 'next'
import { API } from '~constants/api'
import { utils } from 'ethers'
import clsx from 'clsx'
import Button, { button } from '~cpn/base/button'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { isSSR, truncate } from '@dwarvesf/react-utils'
import { HOME_URL } from '~envs'
import { useDisclosure } from '@dwarvesf/react-hooks'
import useSWR from 'swr'
import Card from '~components/Pay/Card'
import Link from 'next/link'
import Avatar from '~cpn/base/avatar'
import { useEffect } from 'react'
import { PayRequest, usePayRequest } from '~store/pay-request'
import { Platform, utils as mochiUtils } from '@consolelabs/mochi-ui'
import { UI } from '../../constants/mochi'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { pay_code } = ctx.query

  if (!pay_code) {
    return {
      props: {},
    }
  }

  const payRequest = await API.MOCHI_PAY.get(`/pay-requests/${pay_code}`)
    .notFound(() => null)
    .json((r) => r.data)

  let profile = null

  if (payRequest?.profile_id) {
    profile = await API.MOCHI_PROFILE.get(`/profiles/${payRequest?.profile_id}`)
      .notFound(() => null)
      .internalError(() => null)
      .json((r) => r)
  }

  const { image } = await UI.components.amount({
    on: Platform.Web,
    amount: utils.formatUnits(
      payRequest?.amount ?? 0,
      payRequest?.token.decimal ?? 0,
    ),
    symbol: payRequest.token.symbol,
  })

  payRequest.token.icon = image || `${HOME_URL}/assets/coin.png`

  if (profile) {
    const [name] = await UI.resolve(Platform.Web, payRequest?.profile_id)
    payRequest.profile = {
      name: name?.plain ?? '',
      avatar: profile.avatar ?? '',
    }
  }

  payRequest.amount = mochiUtils.formatTokenDigit({
    value: utils.formatUnits(payRequest.amount, payRequest.token.decimal),
    scientificFormat: true,
  })

  return {
    props: {
      payRequest,
      ogData: {
        amount: payRequest.amount,
        symbol: payRequest.token.symbol,
        native: true,
        chainIcon: payRequest.token.chain.icon,
        tokenIcon: payRequest.token.icon,
      },
    },
  }
}

export type Props = {
  payRequest?: PayRequest
  isPayMe?: boolean
  ogData: any
}

export default function PayCode({
  isPayMe,
  payRequest: initialPayRequest,
  ogData,
}: Props) {
  const setPayRequestStore = usePayRequest((s) => s.set)
  const { data: payRequest = initialPayRequest, mutate } = useSWR<PayRequest>(
    `/pay-requests/${initialPayRequest?.code}`,
    (url) => API.MOCHI_PAY.get(url).json((r) => r.data),
  )

  const { isOpen: isDone, onOpen: setDone } = useDisclosure({
    defaultIsOpen: payRequest?.status !== 'submitted',
  })

  useEffect(() => {
    if (initialPayRequest) {
      setPayRequestStore(initialPayRequest)
    }
  }, [initialPayRequest, setPayRequestStore])

  if (!payRequest) {
    return (
      <Layout>
        <SEO
          title={isPayMe ? 'Pay Me' : 'Pay Link'}
          tailTitle
          image={`${HOME_URL}/api/pay-og`}
          description="We couldn't find the Pay Link you were looking for."
          url={`${HOME_URL}/pay`}
        />
        <div
          className={clsx(
            'flex flex-col p-8 pt-4 mx-auto text-center bg-white rounded-2xl md:mb-64 max-w-[450px]',
          )}
        >
          <Text size="base">Pay Me</Text>
          <Icon icon="tabler:error-404" className="my-6 mx-auto w-20 h-20" />
          <span className="text-lg font-semibold text-foreground">
            This Pay Me Link couldn&apos;t be found
          </span>
          <span className="mt-2 text-sm font-medium text-foreground-secondary">
            You can recheck the code or generate a new one
          </span>
          <Link
            href="/"
            className={button({
              appearance: 'secondary',
              className: 'mt-8',
            })}
          >
            <div>Back to Home page</div>
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <SEO
        title={
          isPayMe
            ? `Pay ${initialPayRequest?.profile?.name} ${initialPayRequest?.amount} ${payRequest.token.symbol}`
            : 'Pay Link'
        }
        tailTitle
        image={`${HOME_URL}/api/pay-og?data=${encodeURIComponent(
          JSON.stringify(ogData),
        )}`}
        description={
          isPayMe
            ? `${
                initialPayRequest?.profile?.name ?? 'Someone'
              } requests you to pay ${initialPayRequest?.amount} ${
                initialPayRequest?.token.symbol
              }${
                initialPayRequest?.note
                  ? ` with the message: "${initialPayRequest.note}"`
                  : ''
              }`
            : `Visit this Pay Link to withdraw ${initialPayRequest?.amount} ${initialPayRequest?.token.symbol} to your wallet!`
        }
        url={`${HOME_URL}/pay/${payRequest.code}`}
      />
      <div
        className={clsx(
          'flex flex-col p-4 sm:p-8 sm:pt-4 mx-auto text-center bg-white rounded-2xl mb-32 md:mb-64',
          {
            'gap-y-6 max-w-[420px]': payRequest.status !== 'expired',
            'max-w-[450px]': payRequest.status === 'expired',
          },
        )}
      >
        <Text size="base">Pay {isPayMe ? 'Me' : 'Link'}</Text>
        {payRequest.status === 'expired' ? (
          <>
            <div className="relative my-6 h-10">
              <Image
                fill
                src="/assets/watch-red.png"
                alt="icon for expired pay link"
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold text-foreground">
              This link has expired
            </span>
            <span className="mt-2 text-sm font-medium text-foreground-secondary">
              This Pay Link expires after 3 days and can only be used once.
              Please ask your friend for a new link!
            </span>
            <Button appearance="secondary" className="mt-8">
              <div>Back to Home page</div>
            </Button>
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              <QRCodeButton
                image={initialPayRequest?.profile?.avatar}
                links={isSSR() ? [] : [window.location.href]}
                user={initialPayRequest?.profile?.name}
              />
              <CopyLinkButton link={isSSR() ? '' : window.location.href} />
              <ShareButton link={isSSR() ? '' : window.location.href} />
            </div>

            {isPayMe ? (
              <div className="flex flex-col pb-5">
                <p className="text-base font-semibold text-black">
                  {initialPayRequest?.profile?.name} requests you pay
                </p>
                <div className="flex gap-x-1 items-center mx-auto mt-10">
                  {payRequest.token.native ? (
                    <div className="relative w-9 h-9">
                      <Image
                        fill
                        src={payRequest.token.icon}
                        alt={`${initialPayRequest?.token.symbol} token icon`}
                      />
                    </div>
                  ) : (
                    <Avatar
                      src={payRequest.token.icon}
                      cutoutSrc={payRequest.token.chain.icon}
                      size="xs"
                    />
                  )}
                  <div className="flex gap-x-1 items-baseline">
                    <span className="text-3xl font-semibold text-foreground">
                      {initialPayRequest?.amount}
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {initialPayRequest?.token.symbol}
                    </span>
                  </div>
                </div>
                <span className="mt-1 text-sm font-normal text-dashboard-gray-8">
                  &asymp; {mochiUtils.formatUsdDigit(payRequest.usd_amount)}
                </span>
              </div>
            ) : (
              <Card isDone={isDone} />
            )}
            {payRequest.note ? (
              <span className="">
                <span className="font-medium">Message: </span>&ldquo;
                {truncate(payRequest.note, 100, false)}
                &rdquo;
              </span>
            ) : null}
            {payRequest.status === 'claimed' && isDone ? (
              <span>This Pay Link has been claimed</span>
            ) : null}
            <PaymentButton
              isPayMe={isPayMe}
              isDone={isDone}
              setDone={setDone}
              refresh={mutate}
            />
          </>
        )}
      </div>
    </Layout>
  )
}
