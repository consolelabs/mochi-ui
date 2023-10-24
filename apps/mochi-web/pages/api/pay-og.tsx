import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { CardUI } from '~components/Pay/Card'

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

  data.amount = amount
  data.symbol = unitCurrency

  const regular = await regularFont
  const bold = await boldFont
  const extrabold = await extraboldFont

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
        <CardUI {...data} isOG />
      </div>
    ),
    {
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
