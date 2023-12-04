import useSWR from 'swr'
import { api } from '~constants/mochi'
import React, {
  ReactNode,
  useCallback,
  useMemo,
  useState,
  Fragment,
} from 'react'
import { AUTH_TELEGRAM_ID, MOCHI_PROFILE_API } from '~envs'
import { Button, LoginWidget } from '@mochi-ui/core'
import { useAuthStore } from '~store'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { AnimatePresence, Transition, Variants, m } from 'framer-motion'
import {
  DiscordColored,
  TelegramColored,
  X,
  Github,
  GoogleColored,
  SlackColored,
  FacebookColored,
  MailLine,
  ArrowLeftLine,
} from '@mochi-ui/icons'
import qs from 'query-string'
import clsx from 'clsx'
import { PanelHeader } from './PanelHeader'
import { ConnectButton } from './ConnectButton'
import { PanelContainer } from './PanelContainer'
import type { Variant } from './types'

interface AuthPanelProps {
  variant?: Variant
  onOpenConnectWalletChange?: (open: boolean) => void
}

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

export const AuthPanel = React.forwardRef<HTMLDivElement, AuthPanelProps>(
  (props, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { variant = 'modal' } = props

    const [state, setState] = useState({ step: 1, direction: 0 })

    const { login } = useAuthStore()

    // auth platforms
    const { data: urls = [] } = useSWR('login-urls', async () => {
      const urlLocation = window.location.href.split('#')[0]
      const [discord, facebook, twitter, gmail] = await Promise.all([
        api.profile.auth.byDiscord({
          urlLocation,
          platform: 'web',
        }),
        api.profile.auth.byFacebook({
          urlLocation,
          platform: 'web',
        }),
        api.profile.auth.byTwitter({
          urlLocation,
          platform: 'web',
        }),
        api.profile.auth.byGmail({
          urlLocation,
          platform: 'web',
        }),
      ])

      return [
        discord.data?.url,
        facebook.data?.url,
        twitter.data?.url,
        gmail.data?.url,
      ]
    })

    const [discordAuthUrl, facebookAuthUrl, twitterAuthUrl, gmailAuthUrl] = urls

    const onAuthTelegram = useCallback(() => {
      // @ts-ignore
      window.Telegram.Login.auth(
        {
          bot_id: AUTH_TELEGRAM_ID,
          request_access: true,
          return_to: encodeURI(window.location.href),
          lang: 'en',
        },
        (user: any) => {
          const telegramAuth = `${MOCHI_PROFILE_API}/profiles/auth/telegram?${qs.stringify(
            {
              ...user,
              url_location: window.location.href,
            },
          )}`

          window.location.href = telegramAuth
        },
      )
    }, [])

    const socialAuths = useMemo(
      () =>
        [
          {
            name: 'Discord',
            icon: <DiscordColored className="text-[#5865F2]" />,
            href: discordAuthUrl,
          },
          {
            name: 'Telegram',
            icon: <TelegramColored />,
            onClick: onAuthTelegram,
          },
          {
            name: 'Twitter',
            icon: <X />,
            href: twitterAuthUrl,
          },
          {
            name: 'Google',
            icon: <GoogleColored />,
            href: gmailAuthUrl,
          },
          {
            name: 'Facebook',
            icon: <FacebookColored />,
            href: facebookAuthUrl,
          },
          {
            name: 'Slack',
            icon: <SlackColored />,
          },
          {
            name: 'Github',
            icon: <Github />,
          },
          {
            name: 'Mail',
            icon: <MailLine />,
          },
        ] as Array<{
          name: string
          icon: ReactNode
          href?: string
          onClick?: () => void
        }>,
      [
        discordAuthUrl,
        facebookAuthUrl,
        gmailAuthUrl,
        onAuthTelegram,
        twitterAuthUrl,
      ],
    )

    return (
      <PanelContainer ref={ref} variant={variant}>
        <AnimatePresence initial={false} custom={state.direction}>
          {state.step === 1 ? (
            <m.div key={state.step} custom={state.direction} {...commonProps}>
              <PanelHeader variant={variant} />
              <div className="flex flex-col gap-8 mt-8 text-center">
                <div className="grid grid-cols-4 grid-rows-2 gap-4 mx-auto text-3xl w-fit">
                  {socialAuths.map((item) => {
                    const LinkWrapper = item.href ? 'a' : Fragment
                    const disabled = !item.onClick && !item.href
                    return (
                      <button
                        type="button"
                        key={item.name}
                        className={clsx(
                          'w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center',
                          {
                            'opacity-40': disabled,
                            'hover:shadow-sm transition': !disabled,
                          },
                        )}
                        onClick={item.onClick}
                        disabled={disabled}
                      >
                        <LinkWrapper {...(item.href && { href: item.href })}>
                          {item.icon}
                        </LinkWrapper>
                      </button>
                    )
                  })}
                </div>
                <p className="text-sm text-neutral-800">
                  Or connect with an extension wallet
                </p>
                <ConnectButton
                  onClick={() => setState({ step: 2, direction: 1 })}
                  variant="modal"
                />
              </div>
            </m.div>
          ) : (
            <m.div
              key={state.step}
              custom={state.direction}
              {...commonProps}
              className="flex flex-col gap-y-3 items-center"
            >
              <LoginWidget
                isOpen={isOpen}
                onOpenChange={(o) => (o ? onOpen() : onClose())}
                onSuccess={(token) => {
                  onClose()
                  login({ token })
                }}
              />
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
            </m.div>
          )}
        </AnimatePresence>
      </PanelContainer>
    )
  },
)
