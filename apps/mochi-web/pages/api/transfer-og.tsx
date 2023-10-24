import { truncate } from '@dwarvesf/react-utils'
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import Avatar from '~cpn/base/avatar'
import { HOME_URL } from '~envs'

export const config = {
  runtime: 'edge',
}

const regularFont = fetch(
  new URL('../../assets/Inter-Regular.ttf', import.meta.url),
).then((res) => res.arrayBuffer())

const boldFont = fetch(
  new URL('../../assets/Inter-Bold.ttf', import.meta.url),
).then((res) => res.arrayBuffer())

const extraboldFont = fetch(
  new URL('../../assets/Inter-ExtraBold.ttf', import.meta.url),
).then((res) => res.arrayBuffer())

const w = 340
const h = 200

const scale = 2

const gradients = [
  'linear-gradient(to left, #6EA6FA, #F3F8FF)',
  'linear-gradient(to left, #858DDA, #F3F8FF)',
  'linear-gradient(to left, #81F5FA, #F1FEFF)',
  'linear-gradient(to left, #FFAD83, #FFF7F3)',
  'linear-gradient(to left, #FFA3A9, #FFFAFA)',
  'linear-gradient(to left, #FFEA7A, #FFFCF2)',
]

const og = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const ogData = searchParams.get('data') ?? '{}'
  const data = JSON.parse(decodeURIComponent(ogData))
  const unitCurrency = data.moniker ? data.moniker : data.symbol
  const amount = !data.amount
    ? '???'
    : data.moniker
    ? data.original_amount
    : data.amount

  const regular = await regularFont
  const bold = await boldFont
  const extrabold = await extraboldFont
  const randomInt = Math.random()
  const randomGradientIdx = Math.floor(Math.random() * (gradients.length - 1))

  return new ImageResponse(
    (
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          fontFamily: '"Inter"',
          display: 'flex',
          width: w,
        }}
      >
        <div
          style={{
            borderRadius: 16,
            padding: 1,
            /* background: 'linear-gradient(135deg, #e9dbda, #eec3fd, #8fc6e4)', */
            width: '100%',
            height: h,
            position: 'relative',
          }}
          tw="flex"
        >
          <div
            style={{
              width: '100%',
              borderRadius: 16,
              padding: '10px 10px 10px 0px',
            }}
            tw="flex flex-col items-center relative bg-white"
          >
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                top: 0,
                left: 0,
                height: h,
                width: w,
                background: gradients[randomGradientIdx],
                filter: 'blur(60px)',
                opacity: 0.2,
              }}
            />
            <img
              style={{
                transform: 'scaleX(-1)',
                display: 'flex',
                position: 'absolute',
                bottom: 0,
                left: 0,
                opacity: 0.45,
                width: 180,
                height: 180,
              }}
              src={`${HOME_URL}/assets/${
                randomInt <= 0.2
                  ? 'mochisan-money'
                  : randomInt <= 0.5
                  ? 'mochisan-vault'
                  : randomInt <= 0.7
                  ? 'mochisan-stars'
                  : 'mochisan-spaceship'
              }.png`}
              alt="mochisan"
            />

            <div tw="w-full h-full flex flex-col items-end">
              <div tw="flex flex-col text-xs">
                <ul tw="relative flex flex-col">
                  <li tw="flex justify-between">
                    <span tw="font-normal text-current">From</span>
                    <span tw="ml-4 font-semibold text-current">
                      {data.from}
                    </span>
                  </li>
                  <li tw="flex justify-between">
                    <span tw="font-normal text-current">To</span>
                    <span tw="ml-4 font-semibold text-current">{data.to}</span>
                  </li>
                </ul>
                <ul tw="relative flex flex-col">
                  <li tw="flex justify-between">
                    <span tw="font-normal text-current">Tx ID</span>
                    <span tw="ml-4 font-normal text-current">
                      {truncate(data.external_id, 5, true)}
                    </span>
                  </li>
                  <li tw="flex justify-between">
                    <span tw="font-normal text-current">Date</span>
                    <span tw="ml-4 font-normal text-current">{data.date}</span>
                  </li>
                </ul>
              </div>

              <img
                height={data.success ? 150 : 80}
                src={`${HOME_URL}/assets/${
                  data.success ? 'success' : 'fail'
                }-stamp.png`}
                style={{
                  top: '50%',
                  left: '50%',
                  position: 'absolute',
                  transform: 'translateX(-50%) translateY(-50%)',
                  opacity: 0.6,
                }}
                alt=""
              />

              <div tw="flex flex-col items-end my-auto">
                <div
                  style={{
                    paddingTop: '0.5rem',
                    display: 'flex',
                    position: 'relative',
                    alignItems: 'center',
                    columnGap: 6,
                    minHeight: 0,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      position: 'relative',
                      width: 36,
                      height: 36,
                      borderRadius: '100%',
                    }}
                  >
                    {true ? (
                      <img
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: 36,
                          height: 36,
                        }}
                        src={data.tokenIcon}
                        alt=""
                      />
                    ) : (
                      <Avatar
                        cutoutSrc={`${HOME_URL}/assets/coin.png`}
                        src={data.tokenIcon}
                        size="xs"
                      />
                    )}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        maxWidth: '100%',
                        fontWeight: 600,
                        color: '#111827',
                        fontSize: 32,
                      }}
                    >
                      {amount}
                    </span>
                    <span
                      style={{
                        marginLeft: 8,
                        fontSize: 14,
                        lineHeight: '27px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        color: '#111827',
                      }}
                    >
                      {unitCurrency}
                    </span>
                  </div>
                </div>
                <span tw="text-xs">
                  {data.usd_amount.startsWith('<') ? '' : <>&asymp;</>}{' '}
                  {data.usd_amount}
                </span>
              </div>
              <div tw="flex relative mt-auto ml-auto text-[10px] font-normal text-right">
                Powered by Mochi
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      emoji: 'openmoji',
      debug: false,
      width: w * scale,
      height: h * scale,
      fonts: [
        {
          name: 'Inter',
          data: regular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: bold,
          weight: 600,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: extrabold,
          weight: 800,
          style: 'normal',
        },
      ],
    },
  )
}

export default og
