import * as Dialog from '@radix-ui/react-dialog'
import { Drawer } from 'vaul'
import { useWindowSize } from '@uidotdev/usehooks'
import { useCallback, useState } from 'react'
import IconConnectWallets from '../icons/components/icon-connect-wallets'
import { Heading } from '../heading'
import IconCrossCircled from '../icons/components/icon-cross-circled'
import IconExclamationTriangle from '../icons/components/icon-exclamation-triangle'
import { useMochi } from '../mochi-store'
import getAvailableWallets from './providers'
import Wallet from './wallet'
import type { WalletProps } from './wallet'

const connectors = getAvailableWallets()

type OnSuccess = (data: {
  signature: string
  msg: string
  addresses: string[]
  platform: 'evm' | 'solana' | 'ronin' | 'sui'
}) => void

interface WidgetProps {
  open: boolean
  onOpenChange: (o: boolean) => void
  trigger?: React.ReactNode
  onSuccess?: OnSuccess
  authUrl: string
  meUrl: string
}

function Group(props: {
  name: string
  wallets: WalletProps[]
  onSelectWallet: (w: WalletProps) => void
  onError: (e: string) => void
  onSuccess: WidgetProps['onSuccess']
}) {
  if (!props.wallets.length) return null
  return (
    <div className="ui-flex ui-flex-col md:ui-gap-y-2">
      <span className="ui-text-xs ui-font-semibold ui-text-neutral-500">
        {props.name}
      </span>
      <div className="ui-flex ui-flex-row ui-gap-x-1 md:ui-flex-col md:ui-gap-x-0 md:ui-gap-y-1">
        {props.wallets.map((w) => {
          return (
            <Wallet
              {...w}
              connect={() => {
                props.onSelectWallet(w)
                return w
                  .connect()
                  .catch((e: { message?: string; cause?: string }) => {
                    props.onError(
                      e.message ?? e.cause ?? 'Something went wrong',
                    )
                  })
                  .then(props.onSuccess)
              }}
              key={w.name}
            />
          )
        })}
      </div>
    </div>
  )
}

enum LoginState {
  Idle = 1,
  Authenticating,
  NotInstalled,
}

function Inner({ onSuccess }: { onSuccess: WidgetProps['onSuccess'] }) {
  const [state, setState] = useState<LoginState>()
  const [wallet, setWallet] = useState<WalletProps>()
  const [error, setError] = useState('')

  return (
    <>
      <div className="ui-flex ui-flex-col ui-gap-y-2 ui-p-5 ui-w-full md:ui-overflow-auto md:ui-gap-y-5 md:ui-w-auto md:ui-border-r md:ui-border-neutral-400 md:ui-min-w-[220px]">
        <Dialog.Title className="ui-text-base">Choose your wallet</Dialog.Title>
        <div className="ui-flex ui-overflow-auto ui-flex-row ui-gap-x-5 md:ui-flex-col md:ui-gap-x-0 md:ui-gap-y-5">
          {Object.entries(connectors).map((e) => {
            return (
              <Group
                key={`group-${e[0]}`}
                name={e[0]}
                onError={setError}
                onSelectWallet={(w) => {
                  setError('')
                  setState(LoginState.Authenticating)
                  setWallet(w)
                }}
                onSuccess={onSuccess}
                wallets={e[1]}
              />
            )
          })}
        </div>
      </div>
      <div className="ui-flex ui-relative ui-justify-center ui-items-center ui-py-28 ui-px-16 md:ui-py-5 md:ui-px-10 md:ui-min-w-[440px]">
        <Dialog.Close className="ui-hidden ui-absolute ui-top-5 ui-right-5 md:ui-block">
          <IconCrossCircled className="ui-w-6 ui-h-6 ui-transition ui-text-neutral-600 hover:ui-text-neutral-700" />
        </Dialog.Close>
        {(() => {
          switch (true) {
            case state === LoginState.Authenticating && Boolean(wallet): {
              const Icon = wallet?.icon ?? IconExclamationTriangle

              return (
                <div className="ui-flex ui-flex-col ui-items-center">
                  <div className="ui-flex ui-items-center">
                    <img
                      alt="mochi icon"
                      className="ui-w-12 ui-h-12 ui-rounded-full"
                      src="https://mochi.gg/logo.png"
                    />
                    <div className="ui-w-16 ui-border ui-border-dashed ui-border-primary-500" />
                    <Icon className="ui-w-12 ui-h-12 ui-rounded" />
                  </div>
                  <span className="ui-mt-4 ui-text-sm">
                    Opening {wallet?.name}...
                  </span>
                  {error ? (
                    <span className="ui-text-sm ui-text-center ui-text-red-500">
                      {error}
                    </span>
                  ) : null}
                </div>
              )
            }
            case state === LoginState.Idle:
            default:
              return (
                <div className="ui-flex ui-flex-col ui-items-center">
                  <IconConnectWallets className="ui-mb-7 ui-w-20 ui-h-20" />
                  <Heading as="h3" className="ui-text-base ui-text-neutral-800">
                    Connect your wallet
                  </Heading>
                  <span className="ui-text-sm ui-font-light ui-text-center ui-text-neutral-600">
                    By connecting your wallet, you agree to your Term of Service
                    and our Privacy Policy
                  </span>
                </div>
              )
          }
        })()}
      </div>
    </>
  )
}

export default function LoginWidget({
  open,
  onOpenChange,
  trigger: _trigger,
  onSuccess: _onSuccess,
  authUrl,
  meUrl,
}: WidgetProps) {
  const { user, login, logout } = useMochi()
  const size = useWindowSize()

  const trigger = _trigger ?? (
    <button
      className="ui-px-1.5 ui-text-sm ui-rounded-md ui-border ui-shadow ui-bg-neutral-200 ui-border-neutral-500"
      onClick={user ? logout : undefined}
      type="button"
    >
      {user ? 'Logout' : 'Login'}
    </button>
  )

  const onSuccess = useCallback<OnSuccess>(
    (data) => {
      fetch(`${authUrl}/${data.platform}`, {
        method: 'POST',
        body: JSON.stringify({
          wallet_address: data.addresses.at(0),
          message: data.msg,
          signature: data.signature,
          platform: data.platform,
        }),
      })
        .then((r) => r.json())
        .then((r) => {
          fetch(meUrl, {
            headers: {
              Authorization: `Bearer ${r.data.access_token}`,
            },
          })
            .then((r1) => r1.json())
            .then((me) =>
              login(
                me,
                r.data.access_token as string,
                data.platform === 'ronin'
                  ? data.addresses.map((a) => `ronin:${a.slice(2)}`)
                  : data.addresses,
              ),
            )
            .catch((e) => {
              throw e
            })
        })
        .catch((e) => {
          throw e
        })
    },
    [authUrl, login, meUrl],
  )

  if (user) return trigger

  if ((size.width ?? 0) <= 768) {
    return (
      <Drawer.Root>
        {/* @ts-ignore */}
        <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
        {/* @ts-ignore */}
        <Drawer.Portal>
          {/* @ts-ignore */}
          <Drawer.Overlay className="ui-fixed ui-inset-0 ui-z-40 ui-bg-black/30" />
          {/* @ts-ignore */}
          <Drawer.Content className="ui-flex ui-fixed ui-right-0 ui-bottom-0 ui-left-0 ui-z-50 ui-flex-col ui-bg-white ui-rounded-t-2xl">
            <div className="ui-flex ui-flex-col ui-w-full">
              <div className="ui-sticky ui-top-2 ui-z-10 ui-flex-shrink-0 ui-mx-auto ui-mt-2 ui-w-20 ui-h-1.5 ui-rounded-full ui-bg-neutral-400" />
              <div className="ui-flex ui-flex-col-reverse ui-w-full">
                <Inner onSuccess={onSuccess} />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    )
  }

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="ui-fixed ui-z-40 ui-w-screen ui-h-screen ui-bg-black/30" />
        <Dialog.Content asChild>
          <div
            className="ui-flex ui-fixed ui-top-1/2 ui-left-1/2 ui-z-50 ui-bg-white ui-rounded-2xl -ui-translate-x-1/2 -ui-translate-y-1/2 ui-max-h-[450px]"
            style={{ boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.18)' }}
          >
            <Inner onSuccess={onSuccess} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
