import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@mochi-ui/select'
import { Tooltip } from '@mochi-ui/tooltip'
import { useState } from 'react'
import { CheckLine, ThreeDotsLine } from '@mochi-ui/icons'
import { IconButton } from '@mochi-ui/icon-button'
import { Button } from '@mochi-ui/button'
import clsx from 'clsx'
import {
  PageHeader,
  PageHeaderBackButton,
  PageHeaderTitle,
  PageHeaderTitleExtra,
  PageHeaderActions,
} from '../src'

const meta = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
}

export default meta

export function Default() {
  const [selectedApp, setSelectedApp] = useState('all')

  const actions = (
    <>
      <Button
        color="neutral"
        variant="outline"
        className="min-w-xs w-full sm:w-max"
      >
        See docs
      </Button>
      <Select value={selectedApp} onChange={setSelectedApp}>
        <SelectTrigger>
          <Tooltip content="Selected app" arrow="top-center" className="z-20">
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
                <CheckLine
                  className={clsx(
                    'w-4 h-4 ml-4',
                    app.key === selectedApp ? 'text-primary-700' : 'invisible',
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
    </>
  )

  return (
    <div className="flex flex-col gap-6">
      <PageHeader>
        <PageHeaderTitle>Settings</PageHeaderTitle>
      </PageHeader>

      <PageHeader>
        <PageHeaderTitle>Developer Portal</PageHeaderTitle>
        <PageHeaderActions className="!flex-nowrap">
          {actions}
        </PageHeaderActions>
      </PageHeader>

      <PageHeader>
        <PageHeaderTitle>
          Channel
          <PageHeaderTitleExtra>(2,951 members)</PageHeaderTitleExtra>
        </PageHeaderTitle>
        <PageHeaderActions className="!flex-nowrap">
          <Button
            color="neutral"
            variant="outline"
            className="min-w-xs w-full sm:w-max"
          >
            Invite
          </Button>
          <IconButton
            label="Open menu"
            variant="ghost"
            color="neutral"
            className="shrink-0 !h-10 !w-10"
          >
            <ThreeDotsLine className="text-2xl" aria-hidden />
          </IconButton>
        </PageHeaderActions>
      </PageHeader>

      <PageHeader>
        <PageHeaderBackButton />
        <PageHeaderTitle>
          Mochi
          <PageHeaderTitleExtra>(2,951 members)</PageHeaderTitleExtra>
        </PageHeaderTitle>
        <PageHeaderActions className="!flex-nowrap">
          <Button
            color="neutral"
            variant="outline"
            className="min-w-xs w-full sm:w-max"
          >
            Invite
          </Button>
          <IconButton
            label="Open menu"
            variant="ghost"
            color="neutral"
            className="shrink-0 !h-10 !w-10"
          >
            <ThreeDotsLine className="text-2xl" aria-hidden />
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
    </div>
  )
}
