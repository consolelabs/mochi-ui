import { Button, Typography } from '@consolelabs/core'
import { ArrowUpLine } from '@consolelabs/icons'
import clsx from 'clsx'
import Image from 'next/image'
import { formatNumber } from '~utils/number'
import { useFetchApplicationStats } from '~hooks/app/useFetchApplicationStats'

const DataBox = ({
  label,
  amount = 0,
  formatAmount = formatNumber,
  percentage = 0,
}: {
  label: string
  amount?: number
  formatAmount?: (amount: number) => string
  percentage?: number
}) => (
  <div className="p-4 space-y-4 bg-neutral-0 rounded-xl">
    <Typography level="h8" color="textPrimary">
      {label}
    </Typography>
    <Typography level="h5" color="textPrimary">
      {formatAmount ? formatAmount(amount) : amount}
    </Typography>
    <div
      className={clsx('flex items-center space-x-1 flex-wrap', {
        invisible: !percentage,
      })}
    >
      <ArrowUpLine
        className={clsx(
          'w-4 h-4',
          percentage > 0 ? 'text-success-500' : 'text-danger-500 rotate-180',
        )}
      />
      <Typography level="h8" color={percentage > 0 ? 'success' : 'danger'}>
        {Math.abs(percentage) * 100}%
      </Typography>
      <Typography level="p5" color="textSecondary">
        vs last month
      </Typography>
    </div>
  </div>
)

interface Props {
  id?: string
  onOpenCreateAppModal: () => void
}

export const Statistics = ({ id, onOpenCreateAppModal }: Props) => {
  const { data: stats } = useFetchApplicationStats(id)

  return (
    <>
      <div className="flex flex-col gap-2 p-2 bg-neutral-150 rounded-2xl sm:flex-row">
        <div className="w-full px-6 pb-8 space-y-2 sm:w-1/3 bg-neutral-0 rounded-xl">
          <Image
            width={204}
            height={124}
            alt=""
            src="/assets/app-statistics.png"
          />
          <Typography level="h6" color="textPrimary">
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
          <DataBox
            label="All time Users"
            amount={stats?.users_in_total}
            percentage={stats?.users_in_total_change?.last_month_percentage}
          />
          <DataBox
            label="7 days Users"
            amount={stats?.users_in_7d}
            percentage={stats?.users_in_7d_change?.last_month_percentage}
          />
          <DataBox
            label="All time Txs"
            amount={stats?.txs_in_total}
            percentage={stats?.txs_in_total_change?.last_month_percentage}
          />
          <DataBox
            label="7 days Txs"
            amount={stats?.txs_in_7d}
            percentage={stats?.txs_in_7d_change?.last_month_percentage}
          />
          <DataBox
            label="All time Revenue"
            amount={stats?.revenue_in_total}
            formatAmount={(amount) => `$${formatNumber(amount)}`}
            percentage={stats?.revenue_in_total_change?.last_month_percentage}
          />
          <DataBox
            label="7 days Revenue"
            amount={stats?.revenue_in_7d}
            formatAmount={(amount) => `$${formatNumber(amount)}`}
            percentage={stats?.revenue_in_7d_change?.last_month_percentage}
          />
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3">
        <DataBox label="All time Users" amount={3.298} percentage={0.4} />
        <DataBox label="7 days Users" />
        <DataBox label="All time Txs" />
        <DataBox label="7 days Txs" amount={3.298} percentage={-0.06} />
        <DataBox label="All time Revenue" />
        <DataBox label="7 days Revenue" />
      </div>
    </>
  )
}
