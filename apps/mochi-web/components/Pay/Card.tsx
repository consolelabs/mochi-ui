import { shallow } from 'zustand/shallow'
import Avatar from '~cpn/base/avatar'
import { HOME_URL } from '~envs'
import { usePayRequest } from '~store/pay-request'

const gradients = [
  'linear-gradient(to left, #6EA6FA, #F3F8FF)',
  'linear-gradient(to left, #858DDA, #F3F8FF)',
  'linear-gradient(to left, #81F5FA, #F1FEFF)',
  'linear-gradient(to left, #FFAD83, #FFF7F3)',
  'linear-gradient(to left, #FFA3A9, #FFFAFA)',
  'linear-gradient(to left, #FFEA7A, #FFFCF2)',
]

export type Props = {
  isDone: boolean
  chainIcon?: string
  tokenIcon: string
  status: string
  amount: string
  decimal: number
  symbol: string
  native: boolean
  isOG?: boolean
}

// we must style this component via `style` prop since we're also using
// for the vercel's OG image generation, and they are still experiementing with tailwind class support
// so it's better to stick with native css
export function CardUI({
  amount,
  symbol,
  native,
  isDone,
  status,
  chainIcon,
  tokenIcon,
  isOG = false,
}: Props) {
  const randomGradientIdx = Math.floor(Math.random() * (gradients.length - 1))

  return (
    <div
      style={{
        ...(!isOG ? { transform: 'translateZ(0px)' } : {}),
        display: 'flex',
        overflow: 'hidden',
        margin: '0 auto',
        borderRadius: 16,
        padding: 1,
        width: '100%',
        height: 200,
        background: 'linear-gradient(135deg, #e9dbda, #eec3fd, #8fc6e4)',
        filter: 'drop-shadow(0px 5px 20px rgba(0, 0, 0, 0.2))',
      }}
      className="w-[270px] sm:w-[340px]"
    >
      <div
        style={{
          display: 'flex',
          background: 'white',
          touchAction: 'none',
          overflow: 'hidden',
          position: 'relative',
          flexDirection: 'column',
          padding: '32px 32px 20px 32px',
          margin: '0 auto',
          width: '100%',
          borderRadius: 16,
          color: '#111827',
        }}
      >
        <div
          style={{
            display: 'flex',
            top: 0,
            left: '40%',
            position: 'absolute',
            width: 230,
            height: 200,
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
            top: 0,
            right: 0,
            opacity: 0.45,
            width: 200,
            height: 200,
          }}
          src={
            !amount
              ? `${HOME_URL}/assets/mochisan-panic.png`
              : `${HOME_URL}/assets/mochisan.png`
          }
          alt="mochisan"
          width={200}
          height={200}
        />
        <div
          style={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#111827',
          }}
        >
          <div style={{ display: 'flex', fontWeight: 600 }}>Total Balance</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M16.79 23c-.42-.17-.72-.55-.79-1c-.05-.26 0-.44.4-1.16c1.5-2.7 2.27-5.75 2.23-8.84c.04-3-.69-5.93-2.13-8.56c-.21-.44-.4-.86-.56-1.31c.06-.38.25-.73.56-.94c.45-.24 1-.19 1.41.09c.28.36.52.72.72 1.14A21.4 21.4 0 0 1 20.8 9c.23 1.81.26 3.65.09 5.47c-.31 2.34-1 4.6-2.06 6.71c-.64 1.28-1 1.82-1.38 1.82h-.66m-4.36-2.21c-.57-.16-.93-.74-.81-1.32c0-.12.31-.67.59-1.23c1.18-2.27 1.69-4.83 1.46-7.38c-.14-1.83-.67-3.61-1.54-5.22c-.63-1.26-.67-1.46-.3-2c.44-.49 1.17-.56 1.71-.14c.72 1.06 1.29 2.22 1.71 3.44c1.28 3.79 1.08 7.92-.56 11.56c-.84 1.89-1.43 2.5-2.26 2.24v.05m-4.5-2.23a1.31 1.31 0 0 1-.73-.86c0-.2 0-.46.45-1.26a8.986 8.986 0 0 0 0-8.68C7 6.5 7 6.24 7.53 5.76c.19-.22.47-.33.77-.29c.64 0 1 .31 1.54 1.44A10.51 10.51 0 0 1 11.12 12c.04 1.81-.4 3.61-1.27 5.2c-.54 1.05-.81 1.3-1.35 1.39c-.19.02-.39 0-.57-.09v.06m-4.21-2.13c-.33-.16-.59-.43-.72-.78c-.1-.35 0-.65.4-1.29c.5-.68.74-1.52.69-2.36c.07-.85-.16-1.69-.65-2.39A6.11 6.11 0 0 1 3 8.82c-.11-.63.31-1.23 1-1.35c.54-.1.92.13 1.42.89a6.619 6.619 0 0 1 0 7.27c-.51.77-1.09 1-1.69.8h-.01Z"
            ></path>
          </svg>
        </div>
        <div
          style={{
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
              flexShrink: 0,
              width: 36,
              height: 36,
              borderRadius: '100%',
            }}
          >
            {native ? (
              <img
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                src={tokenIcon}
                alt={`${symbol} token icon`}
              />
            ) : (
              <Avatar
                cutoutSrc={chainIcon || '/assets/coin.png'}
                src={tokenIcon}
                size="xs"
              />
            )}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              paddingRight: 8,
              width: '100%',
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
              {!amount ? '???' : status === 'claimed' && isDone ? 0 : amount}
            </span>
            <span
              style={{
                marginLeft: 4,
                fontSize: 14,
                lineHeight: '27px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                color: '#111827',
              }}
            >
              {symbol}
            </span>
          </div>
        </div>
        <div
          style={{
            marginLeft: 'auto',
            position: 'relative',
            marginTop: 'auto',
            fontSize: 12,
            lineHeight: '1rem',
            fontWeight: 400,
            textAlign: 'right',
          }}
        >
          Powered by Mochi
        </div>
      </div>
    </div>
  )
}

export default function Card({ isDone }: { isDone: boolean }) {
  const data = usePayRequest(
    (s) => ({
      chainIcon: s.payRequest.token.chain.icon,
      tokenIcon: s.payRequest.token.icon,
      status: s.payRequest.status,
      amount: s.payRequest.amount,
      decimal: s.payRequest.token.decimal,
      symbol: s.payRequest.token.symbol,
      native: s.payRequest.token.native,
    }),
    shallow,
  )

  return <CardUI {...data} isDone={isDone} />
}
