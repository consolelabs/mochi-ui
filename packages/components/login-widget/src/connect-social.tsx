import { Button } from '@mochi-ui/button'
import {
  DiscordColored,
  FacebookColored,
  Github,
  GoogleColored,
  MailLine,
  SlackColored,
  TelegramColored,
  WalletSolid,
  X,
} from '@mochi-ui/icons'
import { Typography } from '@mochi-ui/typography'
import { loginWidget } from '@mochi-ui/theme'
import { IconButton } from '@mochi-ui/icon-button'
import qs from 'query-string'
import { api } from './fetchers'

const { loginContentSocialGridWrapperClsx, loginContentSocialGridClsx } =
  loginWidget

const socialAuths = [
  {
    name: 'discord',
    icon: <DiscordColored className="w-7 h-7" />,
    onClick: (urlLocation: string) =>
      api.profile.auth
        .byDiscord({ urlLocation, platform: 'web' })
        .then((res) => {
          if (!res.ok) return
          window.location.href = res.data.url
        }),
  },
  {
    name: 'telegram',
    icon: <TelegramColored className="w-7 h-7" />,
    onClick: (urlLocation: string) =>
      // @ts-ignore
      window.Telegram.Login.auth(
        {
          bot_id: '6518249764',
          request_access: true,
          return_to: encodeURI(window.location.href),
          lang: 'en',
        },
        (user: any) => {
          const telegramAuth = `https://api-preview.mochi-profile.console.so/api/v1/profiles/auth/telegram?${qs.stringify(
            {
              ...user,
              url_location: urlLocation,
            },
          )}`

          window.location.href = telegramAuth
        },
      ),
  },
  {
    name: 'twitter',
    icon: <X className="w-7 h-7" />,
    onClick: (urlLocation: string) =>
      api.profile.auth
        .byTwitter({ urlLocation, platform: 'web' })
        .then((res) => {
          if (!res.ok) return
          window.location.href = res.data.url
        }),
  },
  {
    name: 'gmail',
    icon: <GoogleColored className="w-7 h-7" />,
    onClick: (urlLocation: string) =>
      api.profile.auth.byGmail({ urlLocation, platform: 'web' }).then((res) => {
        if (!res.ok) return
        window.location.href = res.data.url
      }),
  },
  {
    name: 'facebook',
    icon: <FacebookColored className="w-7 h-7" />,
    onClick: (urlLocation: string) =>
      api.profile.auth
        .byFacebook({ urlLocation, platform: 'web' })
        .then((res) => {
          if (!res.ok) return
          window.location.href = res.data.url
        }),
  },
  {
    name: 'slack',
    icon: <SlackColored className="w-7 h-7 opacity-50" />,
  },
  {
    name: 'github',
    icon: <Github className="w-7 h-7 opacity-50" />,
  },
  {
    name: 'mail',
    icon: <MailLine className="w-7 h-7" />,
  },
]

export default function ConnectSocial({
  setState,
}: {
  setState: (...args: any) => void
}) {
  return (
    <>
      <Typography
        level="h5"
        fontWeight="md"
        color="neutral"
        className="text-center"
      >
        Welcome back!
      </Typography>
      <Typography level="p5" color="neutral" className="text-center">
        Great to see you again! Sign in your account to continue.
      </Typography>
      <div className={loginContentSocialGridWrapperClsx()}>
        <div className={loginContentSocialGridClsx()}>
          {socialAuths.map((item) => {
            const disabled = !item.onClick
            return (
              <IconButton
                label=""
                type="button"
                key={item.name}
                onClick={() =>
                  item.onClick?.(window.location.href.split('#')[0])
                }
                disabled={disabled}
                variant="outline"
                color="info"
                size="lg"
                className="!p-2"
              >
                {item.icon}
              </IconButton>
            )
          })}
        </div>
        <Typography level="p5" color="neutral">
          Or connect with an extension wallet
        </Typography>
        <Button size="lg" onClick={() => setState({ step: 2, direction: 1 })}>
          <WalletSolid className="text-xl" />
          Connect Wallet
        </Button>
      </div>
    </>
  )
}
