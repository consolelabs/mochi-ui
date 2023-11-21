import * as Dialog from '@radix-ui/react-dialog'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useMochi } from '@consolelabs/mochi-store'
import {
  IconCheck,
  IconClose,
  IconExclamationTriangle,
} from '@consolelabs/icons'
import { Button } from '@consolelabs/button'
import { loginWidget } from '@consolelabs/theme'
import {
  InitMochiAPI,
  MOCHI_ENDPOINTS,
  MOCHI_PREVIEW_ENDPOINTS,
} from '@consolelabs/mochi-store/src/mochi'
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
  // default to production
  stage?: 'production' | 'preview'
  // @deprecated use stage instead
  authUrl?: string
  // @deprecated use stage instead
  meUrl?: string
}

function Inner({ onSuccess }: { onSuccess: WidgetProps['onSuccess'] }) {
  const { state, setState, wallet, setWallet, error, setError } =
    useLoginWidgetContext()

  const onReset = () => {
    setState(LoginState.Idle)
    setWallet(undefined)
    setError('')
  }

  const onSelectWallet = (wallet: WalletProps) => {
    setError('')
    setState(LoginState.Connecting)
    setWallet(wallet)
  }

  if (state === LoginState.Idle) {
    return (
      <WalletList
        onSelectWallet={onSelectWallet}
        onSuccess={onSuccess}
        onError={setError}
      />
    )
  }

  const Icon = wallet?.icon ?? IconExclamationTriangle
  const innerClsx = loginInnerStateClsx().connecting
  const isSuccess = error ? -1 : Number(state === LoginState.Authenticated)

  if (
    state === LoginState.Connecting ||
    state === LoginState.Authenticating ||
    state === LoginState.Authenticated
  ) {
    return (
      <div className={innerClsx.container}>
        <div className={innerClsx.header}>Connect to {wallet?.name} Wallet</div>
        <div className={innerClsx.imgWrapper}>
          <img
            alt="mochi icon"
            className={innerClsx.img}
            src="https://mochi.gg/logo.png"
          />
          <div className={innerClsx.divider}>
            {isSuccess === 1 && (
              <div className={innerClsx['connect-icon-success']}>
                <IconCheck className={innerClsx['connect-icon']} />
              </div>
            )}
            {isSuccess === -1 && (
              <div className={innerClsx['connect-icon-error']}>
                <IconClose className={innerClsx['connect-icon']} />
              </div>
            )}
          </div>
          <Icon className={innerClsx.icon} />
        </div>
        {isSuccess === -1 && (
          <>
            <div className={innerClsx.message}>
              {wallet?.name} connection failed
            </div>
            <div className={innerClsx['message-detail']}>
              Try again or use another wallet to connect
            </div>
          </>
        )}
        {isSuccess === 1 && (
          <>
            <div className={innerClsx.message}>Connection successful</div>
            <div className={innerClsx['message-detail']}>
              You have successfully connected your {wallet?.name} wallet to
              Mochi
            </div>
          </>
        )}
        {isSuccess === 0 && (
          <>
            <div className={innerClsx.message}>Opening {wallet?.name}</div>
            <div className={innerClsx['message-detail']}>
              Please waiting for connection...
            </div>
          </>
        )}
        <div className={innerClsx.buttons}>
          {isSuccess === -1 ? (
            <Button
              variant="solid"
              color="primary"
              size="lg"
              onClick={() => {
                if (wallet) {
                  onSelectWallet(wallet)
                }
              }}
            >
              Try again
            </Button>
          ) : (
            <Button
              variant="outline"
              color="neutral"
              size="lg"
              onClick={onReset}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={innerClsx.container}>
      <div className={innerClsx.header}>Connect to {wallet?.name} Wallet</div>
      <div className={innerClsx.message}>
        <div className={innerClsx['message-detail']}>
          Unfortunately, we did not receive the confirmation. Please, try again.
        </div>
      </div>
      <div className={innerClsx.buttons}>
        <Button variant="outline" color="neutral" size="lg" onClick={onReset}>
          Cancel
        </Button>
        <Button
          variant="solid"
          color="primary"
          size="lg"
          onClick={() => {
            if (wallet) {
              onSelectWallet(wallet)
            }
          }}
        >
          Try again
        </Button>
      </div>
    </div>
  )
}

const LoginWidget = ({
  open,
  onOpenChange,
  trigger: _trigger,
  onSuccess,
  onError,
  authUrl: _authUrl,
  meUrl: _meUrl,
  stage: _stage,
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

  // backward comparability with authUrl and meUrl
  // by default, use production endpoints
  const { endpoint: profileEndpoint, stage } = useMemo(() => {
    let endpoint = MOCHI_ENDPOINTS.MOCHI_PROFILE_API
    let stage = _stage ?? 'production'
    if (
      _stage === 'preview' ||
      _authUrl?.includes('preview') ||
      _meUrl?.includes('preview')
    ) {
      endpoint = MOCHI_PREVIEW_ENDPOINTS.MOCHI_PROFILE_API
      stage = 'preview'
    }

    return { endpoint, stage }
  }, [_stage, _authUrl, _meUrl])

  // initialize mochi api
  useEffect(() => {
    if (stage === 'preview') {
      InitMochiAPI(MOCHI_PREVIEW_ENDPOINTS)
    } else {
      InitMochiAPI(MOCHI_ENDPOINTS)
    }
  }, [stage])

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
      try {
        const authUrl = `${profileEndpoint}/profiles/auth/${data.platform}`
        const meUrl = `${profileEndpoint}/profiles/me`

        setState(LoginState.Authenticating)
        const resp = await fetch(authUrl, {
          method: 'POST',
          body: JSON.stringify({
            wallet_address: data.addresses.at(0),
            message: data.msg,
            signature: data.signature,
            platform: data.platform,
          }),
        }).then((r) => r.json())

        const me = await fetch(meUrl, {
          headers: {
            Authorization: `Bearer ${resp.data.access_token}`,
          },
        }).then((r1) => r1.json())

        await login(
          me,
          resp.data.access_token as string,
          data.platform === 'ronin'
            ? data.addresses.map((a) => `ronin:${a.slice(2)}`)
            : data.addresses,
        )
        setState(LoginState.Authenticated)
        onSuccess?.(data)
      } catch (e: any) {
        setError(e?.message ?? 'Unknown error')
        onError?.(e)
      }
    },
    [profileEndpoint, login, onSuccess, onError],
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
