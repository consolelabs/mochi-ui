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
import { PageHeader } from '../src'

const meta = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
}

export default meta

export function Default() {
  const [selectedApp, setSelectedApp] = useState('all')

  const actions = [
    <Select value={selectedApp} onChange={setSelectedApp}>
      <SelectTrigger className="h-10 rounded bg-neutral-150">
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
    </Select>,
    <Button color="white">See docs</Button>,
  ]

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Page Title" />

      <PageHeader title="Page Title" actions={actions} />

      <PageHeader
        title="Page Title"
        titleExtra="(2,951 members)"
        actions={actions}
      />

      <PageHeader
        onBack={() => alert('onBack')}
        title="Page Title"
        titleExtra="(2,951 members)"
        actions={[
          <IconButton label="Open menu" variant="link" color="info">
            <ThreeDotsLine className="text-2xl" aria-hidden />
          </IconButton>,
        ]}
      />
    </div>
  )
}
