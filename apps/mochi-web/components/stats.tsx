import useSWR from 'swr'
import { utils } from '@consolelabs/mochi-ui'
import { API } from '~constants/api'
import {
  IconDollarColored,
  IconHeartColored,
  IconLinkColored,
  IconUserShieldColored,
} from '@consolelabs/icons'

function Spotlight({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <div className="flex gap-x-5 items-center">
      {icon}
      <p className="flex flex-col">
        <span className="text-lg leading-8">{title}</span>
        <span className="text-sm leading-5 text-neutral-600">{subtitle}</span>
      </p>
    </div>
  )
}

export default function Stats() {
  const { data } = useSWR(['transaction-summary'], () =>
    API.MOCHI_PAY.get('/transactions/summary').json((r) => r.data),
  )

  return (
    <div className="flex justify-between items-center my-10 landing-block">
      <Spotlight
        icon={<IconHeartColored className="w-8 h-8" />}
        title={`${data?.tips_given ?? 1602}+`}
        subtitle="tips given"
      />
      <div className="w-px h-10 bg-neutral-200" />
      <Spotlight
        icon={<IconDollarColored className="w-8 h-8" />}
        title={data ? utils.formatUsdDigit(data.total_volume) : '$271,023'}
        subtitle="total volume"
      />
      <div className="w-px h-10 bg-neutral-200" />
      <Spotlight
        icon={<IconUserShieldColored className="w-8 h-8" />}
        title={`${data?.users ?? 1000}+`}
        subtitle="active users"
      />
      <div className="w-px h-10 bg-neutral-200" />
      <Spotlight
        icon={<IconLinkColored className="w-8 h-8" />}
        title="145+"
        subtitle="networks"
      />
    </div>
  )
}
