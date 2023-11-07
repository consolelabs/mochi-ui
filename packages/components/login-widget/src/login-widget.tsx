import * as Dialog from '@radix-ui/react-dialog'
import { Drawer } from 'vaul'
import { useWindowSize } from '@uidotdev/usehooks'
import React, { useCallback, useMemo, useState } from 'react'
import { Heading } from '@consolelabs/heading'
import { useMochi } from '@consolelabs/mochi-store'
import {
  IconConnectWallets,
  IconCrossCircled,
  IconExclamationTriangle,
} from '@consolelabs/icons'
import getAvailableWallets from './providers'
import Wallet from './wallet'
import type { WalletProps } from './wallet'
import {
  LoginState,
  LoginWidgetContext,
  useLoginWidgetContext,
} from './context'

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
  onError?: (error: any) => void
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
    <div className="flex flex-col md:gap-y-2">
      <span className="text-xs font-semibold text-neutral-500 uppercase">
        {props.name}
      </span>
      <div className="flex flex-row gap-x-1 md:flex-col md:gap-x-0 md:gap-y-1">
        {props.wallets.map((w) => {
          return (
            <Wallet
              {...w}
              connect={() => {
                props.onSelectWallet(w)
                return w
                  .connect()
                  .then(props.onSuccess)
                  .catch((e: { message?: string; cause?: string }) => {
                    props.onError(
                      e.message ?? e.cause ?? 'Something went wrong',
                    )
                  })
              }}
              key={w.name}
            />
          )
        })}
      </div>
    </div>
  )
}

function Inner({ onSuccess }: { onSuccess: WidgetProps['onSuccess'] }) {
  const { state, setState, wallet, setWallet, error, setError } =
    useLoginWidgetContext()

  return (
    <>
      <div className="flex flex-col gap-y-2 p-5 w-full md:overflow-auto md:gap-y-5 md:w-auto md:border-r md:border-neutral-400 md:min-w-[287px]">
        <Dialog.Title className="text-base">Choose your wallet</Dialog.Title>
        <div className="flex overflow-auto flex-row gap-x-5 md:flex-col md:gap-x-0 md:gap-y-5">
          {Object.entries(connectors).map((e) => {
            return (
              <Group
                key={`group-${e[0]}`}
                name={e[0]}
                onError={setError}
                onSelectWallet={(w) => {
                  setError('')
                  setState(LoginState.Connecting)
                  setWallet(w)
                }}
                onSuccess={onSuccess}
                wallets={e[1]}
              />
            )
          })}
        </div>
      </div>
      <div className="flex relative justify-center items-center py-28 px-16 md:py-5 md:px-10 md:flex-1">
        <Dialog.Close className="hidden absolute top-5 right-5 md:block">
          <IconCrossCircled className="w-6 h-6 transition text-neutral-600 hover:text-neutral-700" />
        </Dialog.Close>
        {(() => {
          switch (true) {
            case (state === LoginState.Connecting ||
              state === LoginState.Authenticating) &&
              Boolean(wallet): {
              const Icon = wallet?.icon ?? IconExclamationTriangle

              return (
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <img
                      alt="mochi icon"
                      className="w-12 h-12 rounded-full"
                      src="https://mochi.gg/logo.png"
                    />
                    <div className="w-16 border border-dashed border-primary-500" />
                    <Icon className="w-12 h-12 rounded" />
                  </div>
                  <span className="mt-4 text-sm">
                    {state === LoginState.Connecting
                      ? `Opening ${wallet?.name}...`
                      : 'Logging into your account...'}
                  </span>
                  {error ? (
                    <span className="text-sm text-center text-red-500">
                      {error}
                    </span>
                  ) : null}
                </div>
              )
            }

            case state === LoginState.Idle:
            default:
              return (
                <div className="flex flex-col items-center">
                  <IconConnectWallets className="mb-7 w-20 h-20" />
                  <Heading as="h3" className="text-base text-neutral-800">
                    Connect your wallet
                  </Heading>
                  <span className="text-sm font-light text-center text-neutral-600">
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

const LoginWidget = ({
  open,
  onOpenChange,
  trigger: _trigger,
  onSuccess,
  onError,
  authUrl,
  meUrl,
}: WidgetProps) => {
  const { user, login, logout } = useMochi()
  const size = useWindowSize()

  const [state, setState] = useState<LoginState>(LoginState.Idle)
  const [wallet, setWallet] = useState<WalletProps>()
  const [error, setError] = useState('')

  const value = useMemo(
    () => ({
      state,
      setState,
      wallet,
      setWallet,
      error,
      setError,
    }),
    [state, setState, wallet, setWallet, error, setError],
  )

  const trigger: React.ReactNode = _trigger || (
    <button
      className="px-1.5 text-sm rounded-md border shadow bg-neutral-200 border-neutral-500"
      onClick={user ? logout : undefined}
      type="button"
    >
      {user ? 'Logout' : 'Login'}
    </button>
  )

  const handleLogin = useCallback<OnSuccess>(
    async (data) => {
      setState(LoginState.Authenticating)
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
              ).then(() => {
                setState(LoginState.Authenticated)
                onSuccess?.(data)
              }),
            )
            .catch((e) => {
              setError(e?.message ?? 'Unknown error')
              onError?.(e)
            })
        })
        .catch((e) => {
          setError(e?.message ?? 'Unknown error')
          onError?.(e)
        })
    },
    [authUrl, login, meUrl, onSuccess, onError],
  )

  if (user) {
    return trigger
  }

  let content: React.ReactNode = null

  if ((size.width ?? 0) <= 768) {
    content = (
      <Drawer.Root>
        {/* @ts-ignore */}
        <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
        {/* @ts-ignore */}
        <Drawer.Portal>
          {/* @ts-ignore */}
          <Drawer.Overlay className="fixed inset-0 z-40 bg-black/30" />
          {/* @ts-ignore */}
          <Drawer.Content className="flex fixed right-0 bottom-0 left-0 z-50 flex-col bg-white rounded-t-2xl">
            <div className="flex flex-col w-full">
              <div className="sticky top-2 z-10 flex-shrink-0 mx-auto mt-2 w-20 h-1.5 rounded-full bg-neutral-400" />
              <div className="flex flex-col-reverse w-full">
                <Inner onSuccess={handleLogin} />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    )
  }

  content = (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed z-40 w-screen h-screen bg-black/30" />
        <Dialog.Content asChild>
          <div
            className="flex fixed top-1/2 w-[720px] left-1/2 z-50 bg-white rounded-2xl -translate-x-1/2 -translate-y-1/2 max-h-[450px]"
            style={{ boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.18)' }}
          >
            <Inner onSuccess={handleLogin} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )

  return (
    <LoginWidgetContext.Provider value={value}>
      {content}
    </LoginWidgetContext.Provider>
  )
}

export default LoginWidget
