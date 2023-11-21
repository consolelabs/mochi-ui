import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Tooltip,
  Typography,
} from '@consolelabs/core'
import { IconArrowUp, IconCheck } from '@consolelabs/icons'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

const DataBox = ({
  label,
  amount = '0',
  percentage = 0,
}: {
  label: string
  amount?: string
  percentage?: number
}) => (
  <div className="p-4 space-y-4 bg-neutral-0 rounded-xl">
    <Typography level="title-sm" color="textPrimary">
      {label}
    </Typography>
    <Typography level="h5" color="textPrimary">
      {amount}
    </Typography>
    <div
      className={clsx('flex items-center space-x-1', {
        invisible: !percentage,
      })}
    >
      <IconArrowUp
        className={clsx(
          'w-4 h-4',
          percentage > 0 ? 'text-success-500' : 'text-danger-500 rotate-180',
        )}
      />
      <Typography
        level="title-sm"
        color={percentage > 0 ? 'success' : 'danger'}
      >
        {Math.abs(percentage) * 100}%
      </Typography>
      <Typography level="body-sm" color="textSecondary">
        vs last month
      </Typography>
    </div>
  </div>
)

export const Statistics = () => {
  const [selectedApp, setSelectedApp] = useState('all')

  return (
    <>
      <div className="flex items-center justify-between space-x-8">
        <div>
          <Typography level="h5" color="textPrimary">
            Developer Portal
          </Typography>
          <Typography level="body-sm" color="textSecondary">
            Build secure and frictionless payments across Web2 and Web3
            platforms with a single API call.
          </Typography>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" color="neutral" className="!bg-neutral-0">
            See docs
          </Button>
          <Select value={selectedApp} onChange={setSelectedApp}>
            <SelectTrigger className="rounded bg-neutral-150">
              <Tooltip
                content="Selected app"
                arrow="top-center"
                className="z-20"
              >
                <SelectValue placeholder="All apps" />
              </Tooltip>
            </SelectTrigger>
            <SelectContent>
              {[
                { key: 'all', name: 'All apps' },
                { key: '1', name: 'App name 1' },
                { key: '2', name: 'App name 2' },
              ].map((app) => (
                <SelectItem
                  key={app.key}
                  value={app.key}
                  rightIcon={
                    <IconCheck
                      className={clsx(
                        'w-4 h-4 ml-4',
                        app.key === selectedApp
                          ? 'text-primary-700'
                          : 'invisible',
                      )}
                    />
                  }
                >
                  {app.name}
                </SelectItem>
              ))}
              <SelectSeparator />
              <button className="px-2 text-sm font-medium tracking-tight text-primary-700">
                Create an app
              </button>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2 mt-8 bg-neutral-150 rounded-2xl sm:flex-row">
        <div className="w-full px-6 pb-8 space-y-2 sm:w-1/3 bg-neutral-0 rounded-xl">
          <Image
            width={204}
            height={124}
            alt=""
            src="/assets/app-statistics.png"
          />
          <Typography level="title-lg" color="textPrimary">
            Build an app
          </Typography>
          <Typography level="body-sm" color="textSecondary">
            Create an app to get a live API key with access to multiple Mochi
            products.
          </Typography>
          <Button size="sm">Create an app</Button>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2">
          <DataBox label="All time Users" amount="3,298" percentage={0.4} />
          <DataBox label="7 days Users" />
          <DataBox label="All time Txs" />
          <DataBox label="7 days Txs" amount="3,298" percentage={-0.06} />
          <DataBox label="All time Revenue" />
          <DataBox label="7 days Revenue" />
        </div>
      </div>
    </>
  )
}
