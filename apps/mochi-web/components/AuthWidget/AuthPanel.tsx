import useSWR from 'swr'
import { api } from '~constants/mochi'
import {
  ReactNode,
  useCallback,
  useMemo,
  useState,
  useEffect,
  Fragment,
} from 'react'
import { AUTH_TELEGRAM_ID, MOCHI_PROFILE_API } from '~envs'
import { LoginWidget } from '@consolelabs/ui-components'
import { useMochi } from '@consolelabs/core'
import { useAuthStore } from '~store'
import {
  IconDiscordColored,
  IconTelegramColored,
  IconX,
  IconGithub,
  IconGoogleColored,
  IconSlackColored,
  IconFacebookColored,
  IconMail,
} from '@consolelabs/icons'
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

export const AuthPanel = (props: AuthPanelProps) => {
  const { variant = 'modal', onOpenConnectWalletChange } = props

  const { login } = useAuthStore()
  const { user } = useMochi()
  const [isOpenWidget, setIsOpenWidget] = useState(false)

  const onOpenLoginWidgetChange = (open: boolean) => {
    setIsOpenWidget(open)
    onOpenConnectWalletChange?.(open)
  }

  // auth platforms
  const { data: urls = [] } = useSWR('login-urls', async () => {
    const [discord, facebook, twitter, gmail] = await Promise.all([
      api.profile.auth.byDiscord({
        urlLocation: window.location.href,
        platform: 'web',
      }),
      api.profile.auth.byFacebook({
        urlLocation: window.location.href,
        platform: 'web',
      }),
      api.profile.auth.byTwitter({
        urlLocation: window.location.href,
        platform: 'web',
      }),
      api.profile.auth.byGmail({
        urlLocation: window.location.href,
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
          icon: <IconDiscordColored className="text-[#5865F2]" />,
          href: discordAuthUrl,
        },
        {
          name: 'Telegram',
          icon: <IconTelegramColored />,
          onClick: onAuthTelegram,
        },
        {
          name: 'Twitter',
          icon: <IconX />,
          href: twitterAuthUrl,
        },
        {
          name: 'Google',
          icon: <IconGoogleColored />,
          href: gmailAuthUrl,
        },
        {
          name: 'Facebook',
          icon: <IconFacebookColored />,
          href: facebookAuthUrl,
        },
        {
          name: 'Slack',
          icon: <IconSlackColored />,
        },
        {
          name: 'Github',
          icon: <IconGithub />,
        },
        {
          name: 'Mail',
          icon: <IconMail />,
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

  useEffect(() => {
    if (user?.token) {
      login({ token: user.token })
    }
  }, [user?.token, login])

  return (
    <PanelContainer variant={variant}>
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
        <LoginWidget
          open={isOpenWidget}
          onOpenChange={onOpenLoginWidgetChange}
          authUrl="https://api-preview.mochi-profile.console.so/api/v1/profiles/auth"
          meUrl="https://api-preview.mochi-profile.console.so/api/v1/profiles/me"
          trigger={<ConnectButton variant={variant} />}
        />
      </div>
    </PanelContainer>
  )
}
