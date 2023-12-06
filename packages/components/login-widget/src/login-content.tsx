import { loginWidget, popover } from '@mochi-ui/theme'
import { Button } from '@mochi-ui/button'
import {
  ArrowLeftLine,
  CheckLine,
  CloseLine,
  ExclamationTriangleOutlined,
} from '@mochi-ui/icons'
import { AnimatePresence, m, Transition, Variants } from 'framer-motion'
import { useState } from 'react'
import ConnectSocial from './connect-social'
import WalletList from './wallet-list'
import { useLoginWidget } from './store'
import { ChainProvider } from './providers/provider'
import { LoginStep, useInternalLoginWidgetContext } from './context'

const { loginContentClsx, loginWalletListWrapperClsx } = loginWidget

const variants: Variants = {
  enter: (direction: number) => {
    return {
      position: 'relative',
      x: direction > 0 ? '110%' : '-110%',
      opacity: 0.2,
      scale: 0.95,
    }
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => {
    return {
      position: 'absolute',
      x: direction < 0 ? '110%' : '-110%',
      opacity: 0.2,
      scale: 0.95,
    }
  },
}

const transition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

const commonProps = {
  transition,
  variants,
  initial: 'enter',
  animate: 'center',
  exit: 'exit',
}

const {
  loginInnerStateClsx,
  /* loginWidgetTriggerClsx, */
  /* loginWidgetDialogOverlayClsx, */
  /* loginWidgetDialogContentWrapperClsx, */
} = loginWidget

// borrow popover's style
const { popoverContentClsx } = popover

export default function LoginContent({
  onSelectWallet,
  raw = false,
  chain,
}: {
  onSelectWallet: (w: ChainProvider) => void
  raw?: boolean
  chain?: string
}) {
  const { connectors } = useLoginWidget()
  const [state, setState] = useState({ step: chain ? 2 : 1, direction: 0 })
  const { state: internal, dispatch } = useInternalLoginWidgetContext()

  const onReset = () => {
    dispatch({ step: LoginStep.Idle, wallet: null, error: null })
  }
  const Icon = internal.wallet?.icon ?? ExclamationTriangleOutlined
  const innerClsx = loginInnerStateClsx().connecting
  const isSuccess = internal.error
    ? -1
    : Number(state.step === LoginStep.Authenticated)

  let content

  if (
    internal.step === LoginStep.Connecting ||
    internal.step === LoginStep.Authenticating ||
    internal.step === LoginStep.Authenticated
  ) {
    content = (
      <div className={innerClsx.container}>
        <div className={innerClsx.header}>
          Connect to {internal.wallet?.name} Wallet
        </div>
        <div className={innerClsx.imgWrapper}>
          <img
            alt="mochi icon"
            className={innerClsx.img}
            src="https://mochi.gg/logo.png"
          />
          <div className={innerClsx.divider}>
            {isSuccess === 1 && (
              <div className={innerClsx['connect-icon-success']}>
                <CheckLine className={innerClsx['connect-icon']} />
              </div>
            )}
            {isSuccess === -1 && (
              <div className={innerClsx['connect-icon-error']}>
                <CloseLine className={innerClsx['connect-icon']} />
              </div>
            )}
          </div>
          <Icon className={innerClsx.icon} />
        </div>
        {isSuccess === -1 && (
          <>
            <div className={innerClsx.message}>
              {internal.wallet?.name} connection failed
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
              You have successfully connected your {internal.wallet?.name}{' '}
              wallet to Mochi
            </div>
          </>
        )}
        {isSuccess === 0 && (
          <>
            <div className={innerClsx.message}>
              Opening {internal.wallet?.name}
            </div>
            <div className={innerClsx['message-detail']}>
              Please wait for connection...
              <br />
            </div>
          </>
        )}
        <div className={innerClsx.buttons}>
          <Button variant="outline" color="neutral" size="lg" onClick={onReset}>
            Back
          </Button>
          {isSuccess === -1 && (
            <Button
              variant="solid"
              color="primary"
              size="lg"
              onClick={() => {
                if (internal.wallet) {
                  onSelectWallet(internal.wallet)
                }
              }}
            >
              Try again
            </Button>
          )}
        </div>
      </div>
    )
  } else if (internal.step !== LoginStep.Idle) {
    content = (
      <div className={innerClsx.container}>
        <div className={innerClsx.header}>
          Connect to {internal.wallet?.name} Wallet
        </div>
        <div className={innerClsx.message}>
          <div className={innerClsx['message-detail']}>
            Unfortunately, we did not receive the confirmation. Please, try
            again.
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
              if (internal.wallet) {
                onSelectWallet(internal.wallet)
              }
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={!raw ? popoverContentClsx({}) : ''}>
      <div className={loginContentClsx({ className: raw ? 'p-0' : 'p-4' })}>
        <AnimatePresence initial={false} custom={state.direction}>
          {state.step === 1 ? (
            <m.div key={state.step} custom={state.direction} {...commonProps}>
              <ConnectSocial setState={setState} />
            </m.div>
          ) : (
            <m.div
              key={state.step}
              custom={state.direction}
              {...commonProps}
              className={loginWalletListWrapperClsx()}
            >
              {internal.step !== LoginStep.Idle ? (
                content
              ) : (
                <>
                  <WalletList
                    chain={chain}
                    connectors={connectors}
                    onSelectWallet={onSelectWallet}
                  />
                  {!chain && (
                    <Button
                      type="button"
                      onClick={() => setState({ step: 1, direction: -1 })}
                      size="lg"
                      color="neutral"
                      variant="outline"
                    >
                      <ArrowLeftLine />
                      Back
                    </Button>
                  )}
                </>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
