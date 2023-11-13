import { Fragment, useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import clsx from 'clsx'
import { useMochi } from '@consolelabs/mochi-store'
import LoginWidget from '../src/login-widget'

const meta: Meta<typeof LoginWidget> = {
  title: 'components/LoginWidget',
  component: LoginWidget,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
}

const authUrl =
  'https://api.mochi-profile.console.so/api/v1/profiles/auth' as const
const meUrl = 'https://api.mochi-profile.console.so/api/v1/profiles/me' as const

export default meta
type Story = StoryObj<typeof LoginWidget>

function Widget() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<any>()

  return (
    <>
      <LoginWidget
        authUrl={authUrl}
        meUrl={meUrl}
        onOpenChange={setOpen}
        onSuccess={setData}
        open={open}
      />
      {data ? <code>{JSON.stringify(data)}</code> : null}
    </>
  )
}

function AssocWallet() {
  const [open, setOpen] = useState(false)

  const { user } = useMochi()

  useEffect(() => {
    if (user) {
      setOpen(false)
    }
  }, [user])

  return (
    <div className="flex flex-col gap-y-5 items-center">
      {user ? (
        <div className="flex flex-col gap-y-2">
          <span>Your accounts</span>
          <div
            className="grid auto-rows-auto gap-y-1 gap-x-3"
            style={{
              gridTemplateColumns: '1fr max-content max-content max-content',
            }}
          >
            {user.associatedAccounts.map((aa) => {
              return (
                <Fragment key={aa.address}>
                  <span className="text-sm">
                    {aa.address.slice(0, 10)}..{aa.address.slice(-5)}
                  </span>
                  <span className="text-sm">{aa.platform}</span>
                  <span className="text-sm">Chain id {aa.chainId}</span>
                  {aa.isWalletNotInstalled ? (
                    <span className="text-red-700">wallet not installed</span>
                  ) : (
                    <button
                      className={clsx(
                        'px-1.5 text-sm rounded-md border shadow border-neutral-500',
                        {
                          'bg-green-200': aa.isConnected,
                          'bg-neural-200': !aa.isConnected,
                        },
                      )}
                      onClick={aa.isConnected ? undefined : aa.connect}
                      type="button"
                    >
                      {aa.isConnected ? 'disconnect' : 'connect'}
                    </button>
                  )}
                </Fragment>
              )
            })}
          </div>
        </div>
      ) : null}
      <LoginWidget
        authUrl={authUrl}
        meUrl={meUrl}
        onOpenChange={setOpen}
        open={open}
      />
    </div>
  )
}

export const Default: Story = {
  render: Widget,
}

export const WithAssocWallet: Story = {
  render: () => <AssocWallet />,
}
