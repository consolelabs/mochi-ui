import { Button, Typography } from '@mochi-ui/core'
import Image from 'next/image'
import { formatNumber } from '~utils/number'
import { useFetchApplicationStats } from '~hooks/app/useFetchApplicationStats'
import { StatisticsBox } from './StatisticsBox'

interface Props {
  id?: string
  onOpenCreateAppModal: () => void
}

export const Statistics = ({ id, onOpenCreateAppModal }: Props) => {
  const { data: stats } = useFetchApplicationStats(id)

  return (
    <div className="flex flex-col gap-2 p-2 bg-background-level2 rounded-2xl sm:flex-row">
      <div className="w-full px-6 pb-8 space-y-2 sm:w-1/3 bg-background-body rounded-xl">
        <Image
          width={204}
          height={124}
          alt=""
          src="/assets/app-statistics.png"
        />
        <Typography level="h6" color="textPrimary" className="!font-medium">
          Build an app
        </Typography>
        <Typography level="p5" color="textSecondary">
          Create an app to get a live API key with access to multiple Mochi
          products.
        </Typography>
        <Button size="sm" onClick={onOpenCreateAppModal}>
          Create an app
        </Button>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3">
        <StatisticsBox
          label="All time Users"
          amount={stats?.users_in_total}
          className="sm:order-1"
        />
        <StatisticsBox
          label="7 days Users"
          amount={stats?.users_in_7d}
          change={stats?.users_in_7d_change_percentage_vs_last_period}
          className="sm:order-4"
          milestone="period"
        />
        <StatisticsBox
          label="All time Revenue"
          amount={stats?.revenue_in_total}
          formatAmount={(amount) => `$${formatNumber(amount)}`}
          className="sm:order-2"
        />
        <StatisticsBox
          label="7 days Revenue"
          amount={stats?.revenue_in_7d}
          formatAmount={(amount) => `$${formatNumber(amount)}`}
          change={stats?.revenue_in_7d_change_percentage_vs_last_period}
          className="sm:order-5"
          milestone="period"
        />
        <StatisticsBox
          label="All time Txs"
          amount={stats?.txs_in_total}
          className="sm:order-3"
        />
        <StatisticsBox
          label="7 days Txs"
          amount={stats?.txs_in_7d}
          change={stats?.txs_in_7d_change_percentage_vs_last_period}
          className="sm:order-6"
          milestone="period"
        />
      </div>
    </div>
  )
}
