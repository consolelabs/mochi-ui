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
import { loginWidget } from '@consolelabs/theme'
import getAvailableWallets from './providers'
import Wallet from './wallet'
import type { WalletProps } from './wallet'
import {
  LoginState,
  LoginWidgetContext,
  useLoginWidgetContext,
} from './context'

const {
  loginGroupWrapperClsx,
  loginGroupNameClsx,
  loginGroupWalletsClsx,
  loginInnerWrapperClsx,
  loginInnerTitleClsx,
  loginInnerGroupClsx,
  loginInnerContentClsx,
  loginInnerCloseButtonClsx,
  loginInnerCloseIconClsx,
  loginInnerStateClsx,
  loginWidgetTriggerClsx,
  loginWidgetMobileDrawerOverlayClsx,
  loginWidgetMobileDrawerContentWrapperClsx,
  loginWidgetMobileDrawerContentClsx,
  loginWidgetDialogOverlayClsx,
  loginWidgetDialogContentWrapperClsx,
} = loginWidget

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
    <div className={loginGroupWrapperClsx({})}>
      <span className={loginGroupNameClsx({})}>{props.name}</span>
      <div className={loginGroupWalletsClsx({})}>
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
      <div className={loginInnerWrapperClsx({})}>
        <Dialog.Title className={loginInnerTitleClsx({})}>
          Choose your wallet
        </Dialog.Title>
        <div className={loginInnerGroupClsx({})}>
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
      <div className={loginInnerContentClsx({})}>
        <Dialog.Close className={loginInnerCloseButtonClsx({})}>
          <IconCrossCircled className={loginInnerCloseIconClsx({})} />
        </Dialog.Close>
        {(() => {
          switch (true) {
            case (state === LoginState.Connecting ||
              state === LoginState.Authenticating) &&
              Boolean(wallet): {
              const Icon = wallet?.icon ?? IconExclamationTriangle

              const innerClsx = loginInnerStateClsx().connecting

              return (
                <div className={innerClsx.container}>
                  <div className={innerClsx.imgWrapper}>
                    <img
                      alt="mochi icon"
                      className={innerClsx.img}
                      src="https://mochi.gg/logo.png"
                    />
                    <div className={innerClsx.divider} />
                    <Icon className={innerClsx.icon} />
                  </div>
                  <span className={innerClsx.message}>
                    {state === LoginState.Connecting
                      ? `Opening ${wallet?.name}...`
                      : 'Logging into your account...'}
                  </span>
                  {error ? (
                    <span className={innerClsx.error}>{error}</span>
                  ) : null}
                </div>
              )
            }

            case state === LoginState.Idle:
            default: {
              const innerClsx = loginInnerStateClsx().idle

              return (
                <div className={innerClsx.container}>
                  <IconConnectWallets className={innerClsx.icon} />
                  <Heading as="h3" className={innerClsx.heading}>
                    Connect your wallet
                  </Heading>
                  <span className={innerClsx.message}>
                    By connecting your wallet, you agree to your Term of Service
                    and our Privacy Policy
                  </span>
                </div>
              )
            }
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
      className={loginWidgetTriggerClsx({})}
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
          <Drawer.Overlay className={loginWidgetMobileDrawerOverlayClsx({})} />
          {/* @ts-ignore */}
          <Drawer.Content
            className={loginWidgetMobileDrawerContentWrapperClsx({})}
          >
            <div className={loginWidgetMobileDrawerContentClsx().container}>
              <div className={loginWidgetMobileDrawerContentClsx().divider} />
              <div
                className={loginWidgetMobileDrawerContentClsx().innerWrapper}
              >
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
        <Dialog.Overlay className={loginWidgetDialogOverlayClsx({})} />
        <Dialog.Content asChild>
          <div
            className={loginWidgetDialogContentWrapperClsx({})}
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
