import { Button } from '@mochi-ui/button'
import { Typography } from '@mochi-ui/typography'
import { IconButton } from '@mochi-ui/icon-button'
import {
  ArrowLeftLine,
  MetamaskWallet,
  PhantomWallet,
  RainbowWallet,
  CloseLgLine,
  ChevronRightLine,
} from '@mochi-ui/icons'
import { loginWidget, popover } from '@mochi-ui/theme'
import {
  ChainProvider,
  ConnectWalletWidget,
} from '@mochi-web3/connect-wallet-widget'
import { AnimatePresence, Transition, Variants, m } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import ConnectSocial from './connect-social'
import fetchers from './fetchers'
import { useLoginWidget } from './store'

const {
  loginContentClsx,
  loginWalletListWrapperClsx,
  loginWalletListHeaderClsx,
  loginIntroClsx,
  loginIntroHeaderClsx,
  loginIntroHeaderIconClsx,
  loginIntroBodyClsx,
  loginIntroBodyWalletButtonClsx,
  loginIntroBodyWalletIconClsx,
} = loginWidget

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

// borrow popover's style
const { popoverContentClsx } = popover

export default function LoginContent({
  raw = false,
  chain,
  onchain = false,
  onWalletConnectSuccess,
  onClose,
}: {
  raw?: boolean
  chain?: string
  onchain?: boolean
  onWalletConnectSuccess?: (data: {
    signature: string
    platform: string
    address: string
  }) => Promise<void>
  onClose?: () => void
}) {
  const [title, setTitle] = useState('Supported Wallets')
  const {
    profileBaseUrl,
    isLoggedIn,
    setIsLoggingIn,
    setIsLoadingProfile,
    dispatch,
  } = useLoginWidget()
  const [state, setState] = useState<{
    step: number
    direction: number
    walletId?: string
    isInteractive: boolean
  }>({
    step: chain ? 2 : 1,
    direction: 0,
    isInteractive: false,
  })

  const handleAfterConnect = useCallback(
    async (
      wallet: ChainProvider,
      data: {
        addresses: string[]
        signature: string
        platform: string
      },
    ) => {
      await onWalletConnectSuccess?.({
        signature: data.signature,
        platform: data.platform,
        address: data.addresses[0],
      })
      if (!profileBaseUrl) return
      if (isLoggedIn) {
        dispatch({
          type: 'update_wallets',
          payload: {
            addresses: data.addresses,
            chain: data.platform,
            provider: wallet,
          },
        })
        return
      }

      setIsLoggingIn(true)
      const token = await fetchers.getAccessToken(data, profileBaseUrl)
      if (!token) return
      setIsLoggingIn(false)

      setIsLoadingProfile(true)
      const profile = await fetchers.getOwnProfile(token, profileBaseUrl)
      if (!profile) return
      setIsLoadingProfile(false)

      dispatch({
        type: 'login',
        payload: {
          profile,
          addresses: data.addresses,
          chain: data.platform,
          provider: wallet,
          token,
        },
      })
    },
    [
      dispatch,
      isLoggedIn,
      onWalletConnectSuccess,
      profileBaseUrl,
      setIsLoadingProfile,
      setIsLoggingIn,
    ],
  )

  useEffect(() => {
    if (state.step) {
      setTimeout(() => setState((s) => ({ ...s, isInteractive: true })), 350)
    }
  }, [state.step])

  return (
    <div
      className={
        !raw
          ? popoverContentClsx({ className: '!p-3' })
          : 'flex flex-col items-center w-full'
      }
    >
      <div className={loginContentClsx()}>
        <AnimatePresence initial={false} custom={state.direction}>
          {state.step === 1 ? (
            <m.div
              key={state.step}
              custom={state.direction}
              {...commonProps}
              className={loginIntroClsx()}
            >
              <div className={loginIntroHeaderClsx()}>
                <div className={loginIntroHeaderIconClsx()} />
                <Typography
                  level="h8"
                  fontWeight="lg"
                  color="neutral"
                  className="text-center"
                >
                  Connect Options
                </Typography>
                <IconButton
                  onClick={onClose}
                  label="close"
                  variant="link"
                  color="neutral"
                >
                  <CloseLgLine className={loginIntroHeaderIconClsx()} />
                </IconButton>
              </div>
              <div className={loginIntroBodyClsx()}>
                <Button
                  size="lg"
                  className={loginIntroBodyWalletButtonClsx()}
                  variant="soft"
                  color="neutral"
                  onClick={() => {
                    setState({
                      isInteractive: false,
                      step: 2,
                      direction: 1,
                      walletId: 'app.phantom',
                    })
                  }}
                >
                  <Typography fontWeight="md" level="h7" color="neutral">
                    Phantom
                  </Typography>
                  <PhantomWallet
                    className={loginIntroBodyWalletIconClsx({
                      className: 'rounded-md',
                    })}
                  />
                </Button>
                <Button
                  size="lg"
                  className={loginIntroBodyWalletButtonClsx()}
                  variant="soft"
                  color="neutral"
                  onClick={() => {
                    setState({
                      isInteractive: false,
                      step: 2,
                      direction: 1,
                      walletId: 'io.metamask',
                    })
                  }}
                >
                  <Typography fontWeight="md" level="h7" color="neutral">
                    Metamask
                  </Typography>
                  <MetamaskWallet className={loginIntroBodyWalletIconClsx()} />
                </Button>
                <Button
                  size="lg"
                  className={loginIntroBodyWalletButtonClsx()}
                  variant="soft"
                  color="neutral"
                  onClick={() => {
                    setState({
                      isInteractive: false,
                      step: 2,
                      direction: 1,
                      walletId: 'me.rainbow',
                    })
                  }}
                >
                  <Typography fontWeight="md" level="h7" color="neutral">
                    Rainbow
                  </Typography>
                  <RainbowWallet className={loginIntroBodyWalletIconClsx()} />
                </Button>
                <Button
                  size="lg"
                  className={loginIntroBodyWalletButtonClsx()}
                  variant="soft"
                  color="neutral"
                  disabled={!state.isInteractive}
                  onClick={() => {
                    setState({
                      isInteractive: false,
                      step: 2,
                      direction: 1,
                      walletId: undefined,
                    })
                  }}
                >
                  <Typography fontWeight="md" level="h7" color="neutral">
                    Connect another wallet
                  </Typography>
                  <ChevronRightLine
                    className={loginIntroBodyWalletIconClsx({
                      className: '!w-6 !h-6 text-text-icon-secondary',
                    })}
                  />
                </Button>
              </div>
              {!onchain && <ConnectSocial />}
            </m.div>
          ) : (
            <m.div
              key={state.step}
              custom={state.direction}
              {...commonProps}
              className={loginWalletListWrapperClsx()}
            >
              {!chain && (
                <div className={loginWalletListHeaderClsx()}>
                  <IconButton
                    onClick={() => {
                      setState({
                        isInteractive: false,
                        step: 1,
                        direction: -1,
                        walletId: undefined,
                      })
                    }}
                    label="close"
                    variant="link"
                    color="neutral"
                  >
                    <ArrowLeftLine className={loginIntroHeaderIconClsx()} />
                  </IconButton>
                  <Typography
                    level="h8"
                    fontWeight="lg"
                    color="neutral"
                    className="text-center"
                  >
                    {title}
                  </Typography>
                  <div className={loginIntroBodyWalletIconClsx()} />
                </div>
              )}
              <ConnectWalletWidget
                chain={chain}
                dispatch={dispatch}
                onConnectSuccess={handleAfterConnect}
                onStartConnect={(wallet) =>
                  setTitle(`Connect to ${wallet.name} Wallet`)
                }
                onEndConnect={() => setTitle('Supported Wallets')}
                walletId={state.walletId}
              />
              {/* {!chain && !isConnecting && ( */}
              {/*   <Button */}
              {/*     type="button" */}
              {/*     disabled={!isInteractive} */}
              {/*     onClick={() => { */}
              {/*       setIsInteractive(false) */}
              {/*       setState({ step: 1, direction: -1 }) */}
              {/*     }} */}
              {/*     size="lg" */}
              {/*     color="neutral" */}
              {/*     variant="outline" */}
              {/*   > */}
              {/*     <ArrowLeftLine /> */}
              {/*     Back */}
              {/*   </Button> */}
              {/* )} */}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
