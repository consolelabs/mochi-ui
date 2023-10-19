import { Fragment, useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import clsx from 'clsx'
import { useMochi } from '../mochi-store'
import LoginWidget from './login-widget'

const meta: Meta<typeof LoginWidget> = {
  title: 'ui/LoginWidget',
  component: LoginWidget,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof LoginWidget>

function Widget() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<any>()

  return (
    <>
      <LoginWidget onOpenChange={setOpen} onSuccess={setData} open={open} />
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
    <div className="ui-flex ui-flex-col ui-gap-y-5 ui-items-center">
      {user ? (
        <div className="ui-flex ui-flex-col ui-gap-y-2">
          <span>Your accounts</span>
          <div
            className="ui-grid ui-auto-rows-auto ui-gap-y-1 ui-gap-x-3"
            style={{
              gridTemplateColumns: '1fr max-content max-content max-content',
            }}
          >
            {user.associatedAccounts.map((aa) => {
              return (
                <Fragment key={aa.address}>
                  <span className="ui-text-sm">
                    {aa.address.slice(0, 10)}..{aa.address.slice(-5)}
                  </span>
                  <span className="ui-text-sm">{aa.platform}</span>
                  <span className="ui-text-sm">Chain id {aa.chainId}</span>
                  {aa.isWalletNotInstalled ? (
                    <span className="ui-text-red-700">
                      wallet not installed
                    </span>
                  ) : (
                    <button
                      className={clsx(
                        'ui-px-1.5 ui-text-sm ui-rounded-md ui-border ui-shadow ui-border-neutral-500',
                        {
                          'ui-bg-green-200': aa.isConnected,
                          'ui-bg-neural-200': !aa.isConnected,
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
      <LoginWidget onOpenChange={setOpen} open={open} />
    </div>
  )
}

export const Default: Story = {
  render: Widget,
}

export const WithAssocWallet: Story = {
  render: () => <AssocWallet />,
}
