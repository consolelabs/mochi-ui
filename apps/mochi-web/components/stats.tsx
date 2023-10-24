import useSWR from 'swr'
import { utils } from '@consolelabs/mochi-ui'
import { API } from '~constants/api'

export default function Stats() {
  const { data } = useSWR(['transaction-summary'], () =>
    API.MOCHI_PAY.get('/transactions/summary').json((r) => r.data),
  )

  return (
    <div className="flex gap-3 justify-center mt-10 mb-20 md:gap-10">
      <p className="flex flex-col items-center">
        <span className="text-lg md:text-2xl">{data?.tips_given ?? 1602}+</span>
        <span className="text-sm text-gray-500 md:text-base font-text">
          tips given ❤️
        </span>
      </p>
      <p className="flex flex-col items-center">
        <span className="text-lg md:text-2xl">
          {data ? utils.formatUsdDigit(data.total_volume) : '$271,023'}
        </span>
        <span className="text-sm text-gray-500 md:text-base font-text">
          total volume 💰
        </span>
      </p>
      <p className="flex flex-col items-center">
        <span className="text-lg md:text-2xl">{data?.users ?? 1000}+</span>
        <span className="text-sm text-gray-500 md:text-base font-text">
          users 👱
        </span>
      </p>
    </div>
  )
}
