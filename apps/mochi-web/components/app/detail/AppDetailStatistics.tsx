import {
  Avatar,
  Button,
  ContentEditable,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  useToast,
} from '@mochi-ui/core'
import {
  EditLine,
  ArrowDownSquareSolid,
  ArrowUpSquareSolid,
  ArrowUpLine,
  ThreeDotLoading,
} from '@mochi-ui/icons'
import { ViewApplication } from '~types/mochi-pay-schema'
import { formatNumber } from '~utils/number'
import { useFetchApplicationDetailStats } from '~hooks/app/useFetchApplicationDetailStats'
import { Control, Controller } from 'react-hook-form'
import { AppDetailFormValues } from '~types/app'
import { ChangeEvent, useState, useRef } from 'react'
import { API, GET_PATHS } from '~constants/api'
import { StatisticsBox } from '../StatisticsBox'

interface Props {
  profileId?: string
  appId?: string
  detail?: ViewApplication
  control: Control<AppDetailFormValues>
  refresh: () => void
}

export const AppDetailStatistics = ({
  profileId,
  appId,
  detail,
  control,
  refresh,
}: Props) => {
  const { toast } = useToast()
  const { data: stats } = useFetchApplicationDetailStats(profileId, appId)
  const [editing, setEditing] = useState('')
  const inputFile = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const onUploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (!file || !profileId || !appId) return
    if (file.size > 1024 * 1024 * 1) {
      toast({
        description: 'File size must be less than 1MB',
        scheme: 'danger',
      })
      return
    }
    setUploading(true)
    const formData = new FormData()
    formData.append('image', file)
    return API.MOCHI_PAY.url(
      GET_PATHS.UPDATE_APPLICATION_AVATAR(profileId, appId),
    )
      .body(formData)
      .put()
      .json(() => {
        refresh()
      })
      .catch((e) => {
        const err = JSON.parse(e.message)
        toast({
          description: err.msg,
          scheme: 'danger',
        })
      })
      .finally(() => {
        setUploading(false)
      })
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 bg-background-level2 rounded-2xl">
        <div className="flex gap-8 p-6">
          <div className="py-4 ">
            <input
              ref={inputFile}
              type="file"
              accept="image/jpeg, image/png"
              className="hidden"
              onChange={onUploadAvatar}
            />
            <button
              className="relative flex rounded-full group"
              disabled={uploading}
              onClick={() => inputFile.current?.click()}
            >
              <Avatar src={detail?.avatar || ''} size="3xl" />
              {uploading ? (
                <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-background-body rounded-full bg-opacity-30 text-text-primary">
                  <ThreeDotLoading className="w-6 h-6" />
                </div>
              ) : (
                <ArrowUpLine className="w-6 h-6 rounded-full bg-background-body p-0.5 absolute bottom-0 right-0 hidden group-hover:block" />
              )}
            </button>
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
                      preventHtml
                      preventLineBreak
                    />
                    <FormErrorMessage>
                      {fieldState.error?.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              />
              <IconButton
                variant="outline"
                color="neutral"
                className="px-1 py-1 transition-all opacity-0 group-hover:opacity-100 bg-background-body"
                onClick={() => setEditing('app_name')}
                label="Edit app name"
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
                color="neutral"
                label="Edit app description"
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
          change={stats?.balance_in_total_change_vs_last_week || 0}
          formatChange={(change) => `$${formatNumber(change)}`}
          milestone="week"
          footer={
            <div className="flex gap-2 mt-4">
              <Button size="sm">
                <ArrowDownSquareSolid className="w-4 h-4" />
                Deposit
              </Button>
              <Button size="sm" variant="outline" color="neutral">
                <ArrowUpSquareSolid className="w-4 h-4" />
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
          className="border border-divider shadow-input sm:order-1"
        />
        <StatisticsBox
          label="7 days Users"
          amount={stats?.users_in_7d}
          change={stats?.users_in_7d_change_percentage_vs_last_period}
          className="border border-divider shadow-input sm:order-4"
          milestone="week"
        />
        <StatisticsBox
          label="All time Revenue"
          amount={stats?.revenue_in_total}
          formatAmount={(amount) => `$${formatNumber(amount)}`}
          className="border border-divider shadow-input sm:order-2"
        />
        <StatisticsBox
          label="7 days Revenue"
          amount={stats?.revenue_in_7d}
          formatAmount={(amount) => `$${formatNumber(amount)}`}
          change={stats?.revenue_in_7d_change_percentage_vs_last_period}
          className="border border-divider shadow-input sm:order-5"
          milestone="week"
        />
        <StatisticsBox
          label="All time Txs"
          amount={stats?.txs_in_total}
          className="border border-divider shadow-input sm:order-3"
        />
        <StatisticsBox
          label="7 days Txs"
          amount={stats?.txs_in_7d}
          change={stats?.txs_in_7d_change_percentage_vs_last_period}
          className="border border-divider shadow-input sm:order-6"
          milestone="week"
        />
      </div>
    </div>
  )
}
