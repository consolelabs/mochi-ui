import {
  Button,
  PageHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Typography,
} from '@consolelabs/core'
import { ArrowUpLine, CheckLine, ChevronDownLine } from '@consolelabs/icons'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

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
      <ArrowUpLine
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
  return (
    <>
      <PageHeader
        title="Developer Portal"
        description="Build secure and frictionless payments across Web2 and Web3
      platforms with a single API call."
        actions={[
          <Button
            variant="outline"
            color="neutral"
            className="!bg-neutral-0"
            key="see-docs-button"
          >
            See docs
          </Button>,
          <DropdownMenu key="app-select">
            <DropdownMenuTrigger className="">
              <Button className="!bg-neutral-150">
                <Typography level="body-sm">All apps</Typography>
                <ChevronDownLine className="w-4 h-4 text-neutral-800" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                rightIcon={
                  <CheckLine className="w-4 h-4 ml-4 text-primary-700" />
                }
              >
                All apps
              </DropdownMenuItem>
              {[
                { id: '1', name: 'App name 1' },
                { id: '2', name: 'App name 2' },
              ].map((app) => (
                <Link key={app.id} href={`app/${app.id}`}>
                  <DropdownMenuItem key={app.id}>{app.name}</DropdownMenuItem>
                </Link>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Typography level="title-sm" color="primary">
                  Create an app
                </Typography>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>,
        ]}
      />

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
        <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3">
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
