import { utils } from '@consolelabs/mochi-formatter'
import { Skeleton, Typography } from '@mochi-ui/core'
import {
  DollarColored,
  HeartColored,
  LinkColored,
  UserShieldColored,
} from '@mochi-ui/icons'
import { useEffect } from 'react'
import { Pie, PieChart } from 'recharts'
import { formatNumber } from '~utils/number'
import { useTransactionSummaryStore } from '../stores'

export const SummarySection = () => {
  const {
    loading: isTransactionSummaryLoading,
    transactionSummary,
    fetchTransactionSummary,
  } = useTransactionSummaryStore()

  useEffect(() => {
    fetchTransactionSummary()
  }, []) // eslint-disable-line

  const loading = isTransactionSummaryLoading || !transactionSummary

  return (
    <div className="lg:py-14 bg-background-level2">
      <div
        className="grid gap-4 lg:grid-cols-12 p-6 mx-auto"
        style={{ maxWidth: 1200 }}
      >
        <div className="flex flex-wrap col-span-12 gap-4 justify-between items-center p-6 rounded-xl border bg-background-body border-divider">
          <div className="flex flex-col gap-4 w-full lg:w-auto">
            <div className="flex flex-col-4">
              <div className="flex gap-3 items-center">
                <div className="flex gap-1.5 items-center py-1 px-2 rounded-full bg-success-solid">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-white-solid outline outline-2 outline-white-solid/50" />
                  <Typography level="p6" className="text-white-solid">
                    Live
                  </Typography>
                </div>
                <Typography level="h6">Current Transactions</Typography>
              </div>
            </div>
            <Typography level="h2" className="text-text-primary">
              {loading ? (
                <Skeleton className="w-64 h-14" />
              ) : (
                formatNumber(transactionSummary.current_transactions)
              )}
            </Typography>
            <div className="flex gap-2 items-center">
              {loading ? (
                <Skeleton className="w-24 h-8" />
              ) : (
                <>
                  <Typography level="h5" className="!text-primary-solid">
                    {formatNumber(
                      transactionSummary.transactions_per_second || 0,
                    )}
                  </Typography>
                  <Typography className="text-text-secondary">
                    transactions per second
                  </Typography>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-4 justify-center items-center w-full lg:w-auto">
            {loading ? (
              <Skeleton className="rounded-full w-[150px] h-[150px]" />
            ) : (
              <div className="flex gap-4 items-center">
                <div className="-m-4">
                  <PieChart
                    width={180}
                    height={180}
                    margin={{
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                  >
                    <Pie
                      data={[
                        {
                          value: transactionSummary.success_transactions,
                          fill: '#088752',
                        },
                        {
                          value: transactionSummary.fail_transactions,
                          fill: '#E02D3C',
                        },
                      ]}
                      dataKey="value"
                      stroke="none"
                      startAngle={-270}
                      endAngle={90}
                      innerRadius={36}
                    />
                  </PieChart>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-danger-solid" />
                    <Typography level="p5">Failed</Typography>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-success-solid" />
                    <Typography level="p5">Success</Typography>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {(
          [
            [
              HeartColored,
              'tips given',
              `${utils.formatDigit({
                value: transactionSummary?.tips_given || 0,
                shorten: true,
              })}+`,
            ],
            [
              DollarColored,
              'total volume',
              `${utils.formatUsdDigit(transactionSummary?.total_volume || 0)}+`,
            ],
            [
              UserShieldColored,
              'active users',
              `${utils.formatDigit({
                value: transactionSummary?.active_users || 0,
                shorten: true,
              })}+`,
            ],
            [
              LinkColored,
              'networks',
              `${utils.formatDigit({
                value: transactionSummary?.total_networks || 0,
                shorten: true,
              })}+`,
            ],
          ] as [any, string, string][]
        ).map(([Icon, title, value], index) => (
          <div
            key={index}
            className="col-span-12 p-8 rounded-xl border md:col-span-6 xl:col-span-3 bg-background-body border-divider"
          >
            <div className="flex gap-8 items-center">
              <div className="flex-shrink-0">
                <Icon width={40} height={40} />
              </div>
              <div className="flex flex-col gap-2">
                <Typography level="h8" className="!text-text-secondary">
                  {title}
                </Typography>
                <Typography level="h4">
                  {loading ? <Skeleton className="w-32 h-8" /> : value}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
