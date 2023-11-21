import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Tooltip,
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
    <div className="text-sm font-medium tracking-tight text-neutral-800">
      {label}
    </div>
    <div className="text-2xl font-semibold tracking-tight text-neutral-1000">
      {amount}
    </div>
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
      <span
        className={clsx(
          'text-sm font-medium tracking-tight',
          percentage > 0 ? 'text-success-700' : 'text-danger-700',
        )}
      >
        {Math.abs(percentage) * 100}%
      </span>
      <span className="text-sm tracking-tight text-neutral-600">
        vs last month
      </span>
    </div>
  </div>
)

export const Statistics = () => {
  const [selectedApp, setSelectedApp] = useState('all')

  return (
    <>
      <div className="flex items-center justify-between space-x-8">
        <div>
          <div className="text-neutral-900 text-[22px] font-semibold">
            Developer Portal
          </div>
          <div className="text-sm tracking-tight text-neutral-600">
            Build secure and frictionless payments across Web2 and Web3
            platforms with a single API call.
          </div>
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
          <div className="text-lg font-medium tracking-tight text-neutral-800">
            Build an app
          </div>
          <div className="text-sm tracking-tight text-neutral-600">
            Create an app to get a live API key with access to multiple Mochi
            products.
          </div>
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
