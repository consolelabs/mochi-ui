import useSWR from 'swr'
import { utils } from '@consolelabs/mochi-ui'
import { API } from '~constants/api'
import {
  IconDollarColored,
  IconHeartColored,
  IconLinkColored,
  IconUserShieldColored,
} from '@consolelabs/icons'
import clsx from 'clsx'

function Spotlight({
  icon,
  title,
  subtitle,
  loading,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  loading: boolean
}) {
  return (
    <div
      style={{ maxWidth: 200 }}
      className="flex flex-col flex-1 gap-y-2 justify-center items-center md:flex-row md:gap-x-5"
    >
      {icon}
      <p className="flex flex-col items-center">
        <span
          className={clsx('text-sm leading-5 md:text-2xl md:leading-8', {
            'bg-neutral-300 rounded animate-pulse h-full w-full': loading,
          })}
        >
          {loading ? <>&#8203;</> : title}
        </span>
        <span className="text-xs leading-4 md:text-sm md:leading-5 text-neutral-600">
          {subtitle}
        </span>
      </p>
    </div>
  )
}

function Divider() {
  return (
    <div className="flex flex-shrink-0 justify-center mx-8">
      <div className="w-px h-10 bg-neutral-200" />
    </div>
  )
}

export default function Stats() {
  const { data, isLoading } = useSWR(['transaction-summary'], async () => {
    return API.MOCHI_PAY.get('/transactions/summary').json((r) => r.data)
  })

  return (
    <div className="flex justify-center items-center my-5 mt-10 md:my-10 landing-block">
      <Spotlight
        loading={isLoading}
        icon={<IconHeartColored className="w-8 h-8" />}
        title={`${data?.tips_given ?? 1602}+`}
        subtitle="tips given"
      />
      <Divider />
      <Spotlight
        loading={isLoading}
        icon={<IconDollarColored className="w-8 h-8" />}
        title={data ? utils.formatUsdDigit(data.total_volume) : '$271,023'}
        subtitle="total volume"
      />
      <Divider />
      <Spotlight
        loading={isLoading}
        icon={<IconUserShieldColored className="w-8 h-8" />}
        title={`${data?.users ?? 1000}+`}
        subtitle="total users"
      />
      <Divider />
      <Spotlight
        loading={isLoading}
        icon={<IconLinkColored className="w-8 h-8" />}
        title="145+"
        subtitle="networks"
      />
    </div>
  )
}
