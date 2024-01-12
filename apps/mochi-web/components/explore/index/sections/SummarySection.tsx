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
  const successRate = Math.round(
    (transactionSummary
      ? transactionSummary.success_transactions /
        transactionSummary.current_transactions
      : 0) * 100,
  )

  return (
    <div className="bg-background-level2">
      <div
        className="flex flex-col-reverse gap-4 p-6 mx-auto md:grid md:grid-cols-3 md:grid-rows-4 xl:grid-cols-5 xl:grid-rows-2"
        style={{ maxWidth: 1248 }}
      >
        {(
          [
            [
              HeartColored,
              'Tips given',
              `${utils.formatDigit({
                value: transactionSummary?.tips_given || 0,
              })}+`,
            ],
            [
              DollarColored,
              'Total volume',
              `${utils.formatUsdDigit(transactionSummary?.total_volume || 0)}+`,
            ],
            [
              UserShieldColored,
              'Active users',
              `${utils.formatDigit({
                value: transactionSummary?.active_users || 0,
              })}+`,
            ],
            [
              LinkColored,
              'Networks',
              `${utils.formatDigit({
                value: transactionSummary?.total_networks || 0,
              })}+`,
            ],
          ] as [any, string, string][]
        ).map(([Icon, title, value], index) => (
          <div
            key={index}
            className="flex overflow-hidden relative col-span-1 col-start-1 items-center rounded-xl border xl:col-start-auto bg-background-body border-divider"
          >
            <div className="absolute right-0 top-1/2 flex-shrink-0 opacity-60 -translate-y-1/2 scale-[3]">
              <Icon width={40} height={40} />
            </div>
            <div className="flex flex-col py-3 px-5">
              <Typography level="h8" className="!text-text-secondary">
                {title}
              </Typography>
              <Typography level="h5" className="font-mono" fontWeight="lg">
                {loading ? <Skeleton className="w-32 h-8" /> : value}
              </Typography>
            </div>
          </div>
        ))}
        <div className="flex flex-wrap col-span-2 col-start-2 row-span-4 row-start-1 gap-4 justify-evenly items-center p-3 rounded-xl border xl:col-span-3 xl:col-start-3 xl:row-span-2 xl:row-start-1 bg-background-body border-divider">
          <div className="flex flex-col gap-4 items-center w-full lg:w-auto">
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
            <Typography level="h2" className="font-mono text-text-primary">
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
                  <Typography
                    level="h5"
                    className="!text-primary-solid font-mono"
                  >
                    {formatNumber(
                      Math.floor(transactionSummary.transactions_per_day) || 0,
                    )}
                  </Typography>
                  <Typography className="text-text-secondary">
                    transactions per day
                  </Typography>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-4 justify-center items-center w-full lg:w-auto">
            {loading ? (
              <Skeleton className="rounded-full w-[150px] h-[150px]" />
            ) : (
              <div className="grid grid-cols-2 grid-rows-2 gap-x-6 items-center sm:flex sm:gap-4">
                <div className="flex flex-col justify-center items-center">
                  <Typography
                    level="h4"
                    className="!text-success-solid font-mono"
                  >
                    {successRate}%
                  </Typography>
                  <Typography level="p4">Successful</Typography>
                </div>
                <div className="col-span-2 col-start-1 row-start-1 -m-4 mx-auto">
                  <PieChart
                    width={150}
                    height={150}
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
                      innerRadius={30}
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
      </div>
    </div>
  )
}
