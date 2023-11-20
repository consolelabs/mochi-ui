import * as Dialog from '@radix-ui/react-dialog'
import React, { useCallback, useMemo, useState } from 'react'
import { useMochi } from '@consolelabs/mochi-store'
import { IconExclamationTriangle } from '@consolelabs/icons'
import { loginWidget } from '@consolelabs/theme'
import type { WalletProps } from './wallet'
import {
  LoginState,
  LoginWidgetContext,
  useLoginWidgetContext,
} from './context'
import { WalletList, OnSuccess } from './wallet-list'

const {
  loginInnerStateClsx,
  loginWidgetTriggerClsx,
  loginWidgetDialogOverlayClsx,
  loginWidgetDialogContentWrapperClsx,
} = loginWidget

interface WidgetProps {
  open: boolean
  onOpenChange: (o: boolean) => void
  trigger?: React.ReactNode
  onSuccess?: OnSuccess
  onError?: (error: any) => void
  authUrl: string
  meUrl: string
}

function Inner({ onSuccess }: { onSuccess: WidgetProps['onSuccess'] }) {
  const { state, setState, wallet, setWallet, error, setError } =
    useLoginWidgetContext()

  if (state === LoginState.Idle) {
    return (
      <WalletList
        onSelectWallet={(wallet) => {
          setError('')
          setState(LoginState.Connecting)
          setWallet(wallet)
        }}
        onSuccess={onSuccess}
        onError={setError}
      />
    )
  }

  const Icon = wallet?.icon ?? IconExclamationTriangle
  const innerClsx = loginInnerStateClsx().connecting

  if (state === LoginState.Connecting || state === LoginState.Authenticating) {
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
        {error ? <span className={innerClsx.error}>{error}</span> : null}
      </div>
    )
  }

  return null
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
      className={loginWidgetTriggerClsx()}
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

  return (
    <LoginWidgetContext.Provider value={value}>
      <Dialog.Root onOpenChange={onOpenChange} open={open}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={loginWidgetDialogOverlayClsx()} />
          <Dialog.Content asChild>
            <div
              className={loginWidgetDialogContentWrapperClsx()}
              style={{ boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.18)' }}
            >
              <Inner onSuccess={handleLogin} />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </LoginWidgetContext.Provider>
  )
}

export default LoginWidget
