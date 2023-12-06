import {
  Avatar,
  Button,
  ContentEditable,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
} from '@mochi-ui/core'
import {
  EditLine,
  ArrowDownSquareSolid,
  ArrowUpSquareSolid,
} from '@mochi-ui/icons'
import { ViewApplication } from '~types/mochi-pay-schema'
import { formatNumber } from '~utils/number'
import { useFetchApplicationDetailStats } from '~hooks/app/useFetchApplicationDetailStats'
import { Control, Controller } from 'react-hook-form'
import { AppDetailFormValues } from '~types/app'
import { useState } from 'react'
import { StatisticsBox } from '../StatisticsBox'

interface Props {
  profileId?: string
  appId?: string
  detail?: ViewApplication
  control: Control<AppDetailFormValues>
}

export const AppDetailStatistics = ({
  profileId,
  appId,
  detail,
  control,
}: Props) => {
  const { data: stats } = useFetchApplicationDetailStats(profileId, appId)
  const [editing, setEditing] = useState('')

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 bg-neutral-150 rounded-2xl">
        <div className="flex gap-8 p-6">
          <div className="py-4">
            <Avatar src={detail?.avatar || ''} size="xl" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between space-x-2 group">
              <Controller
                name="app_name"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl
                    error={!!fieldState.error}
                    className="w-full gap-y-1"
                  >
                    <FormLabel>Display name</FormLabel>
                    <ContentEditable
                      {...field}
                      className="text-sm font-medium"
                      disabled={editing !== field.name}
                      onBlur={() => setEditing('')}
                      ref={(ref) => {
                        if (ref && editing === field.name) {
                          ref.focus()
                        }
                      }}
                    />
                    <FormErrorMessage>
                      {fieldState.error?.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              />
              <IconButton
                variant="outline"
                color="info"
                className="px-1 py-1 transition-all opacity-0 group-hover:opacity-100 bg-background-body"
                onClick={() => setEditing('app_name')}
              >
                <EditLine className="w-4 h-4" />
              </IconButton>
            </div>
            <div className="flex justify-between mt-4 space-x-2 group">
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl
                    error={!!fieldState.error}
                    className="w-full gap-y-1"
                  >
                    <FormLabel>Description</FormLabel>
                    <ContentEditable
                      {...field}
                      className="text-sm font-medium"
                      placeholder="Provide a description for your app..."
                      disabled={editing !== field.name}
                      onBlur={() => setEditing('')}
                      ref={(ref) => {
                        if (ref && editing === field.name) {
                          ref.focus()
                        }
                      }}
                    />
                    <FormErrorMessage>
                      {fieldState.error?.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              />
              <IconButton
                variant="outline"
                color="info"
                className="px-1 py-1 transition-all opacity-0 group-hover:opacity-100 bg-background-body"
                onClick={() => setEditing('description')}
              >
                <EditLine className="w-4 h-4" />
              </IconButton>
            </div>
          </div>
        </div>
        <StatisticsBox
          size="lg"
          label="Balance"
          amount={stats?.balance_in_total || 0}
          formatAmount={(amount) => `$${formatNumber(amount)}`}
          change={stats?.balance_in_total_change?.last_week || 0}
          formatChange={(change) => `$${formatNumber(change)}`}
          milestone="week"
          footer={
            <div className="flex gap-2 mt-4">
              <Button size="sm">
                <ArrowDownSquareSolid className="w-4 h-4 text-neutral-0" />
                Deposit
              </Button>
              <Button size="sm" variant="outline" color="neutral">
                <ArrowUpSquareSolid className="w-4 h-4 text-neutral-800" />
                Withdraw
              </Button>
            </div>
          }
        />
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2 mt-8 sm:grid-cols-3">
        <StatisticsBox
          label="All time Users"
          amount={stats?.users_in_total}
          change={stats?.users_in_total_change?.last_month_percentage}
          className="border border-neutral-200 shadow-input sm:order-1"
        />
        <StatisticsBox
          label="7 days Users"
          amount={stats?.users_in_7d}
          change={stats?.users_in_7d_change?.last_month_percentage}
          className="border border-neutral-200 shadow-input sm:order-4"
        />
        <StatisticsBox
          label="All time Revenue"
          amount={stats?.revenue_in_total}
          formatAmount={(amount) => `$${formatNumber(amount)}`}
          change={stats?.revenue_in_total_change?.last_month_percentage}
          className="border border-neutral-200 shadow-input sm:order-2"
        />
        <StatisticsBox
          label="7 days Revenue"
          amount={stats?.revenue_in_7d}
          formatAmount={(amount) => `$${formatNumber(amount)}`}
          change={stats?.revenue_in_7d_change?.last_month_percentage}
          className="border border-neutral-200 shadow-input sm:order-5"
        />
        <StatisticsBox
          label="All time Txs"
          amount={stats?.txs_in_total}
          change={stats?.txs_in_total_change?.last_month_percentage}
          className="border border-neutral-200 shadow-input sm:order-3"
        />
        <StatisticsBox
          label="7 days Txs"
          amount={stats?.txs_in_7d}
          change={stats?.txs_in_7d_change?.last_month_percentage}
          className="border border-neutral-200 shadow-input sm:order-6"
        />
      </div>
    </div>
  )
}
