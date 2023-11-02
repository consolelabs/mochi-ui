import Button, { button } from '~cpn/base/button'
import Text from '~cpn/base/text'
import { Icon } from '@iconify/react'
import useSWR from 'swr'
import { api } from '~constants/mochi'
import { AUTH_TELEGRAM_ID, MOCHI_PROFILE_API } from '~envs'
import { API } from '~constants/api'
import qs from 'query-string'
import { useCallback, useEffect, useState } from 'react'
import {
  LoginWidget,
  IconWalletAdd,
  useMochi,
} from '@consolelabs/ui-components'
import { useAuthStore } from '~store'
import { useRouter } from 'next/router'

const Divider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex relative justify-center items-center w-full bg-inherit">
      <div className="absolute w-full rounded-full h-[2px] bg-dashboard-gray-3" />
      <span className="relative px-3 text-sm font-normal bg-inherit text-dashboard-gray-2">
        {children}
      </span>
    </div>
  )
}

interface LoginPanelProps {
  onHideLoginPopover?: (_: boolean) => void
  onCloseLoginPopover?: (_: boolean) => void
  compact?: boolean
}

export function LoginPanel(props: LoginPanelProps) {
  const { compact = false, onHideLoginPopover, onCloseLoginPopover } = props
  const [open, setOpen] = useState(false)
  const { user } = useMochi()
  const login = useAuthStore((s) => s.login)
  const { data: discordAuthUrl } = useSWR('login-discord', async () => {
    const { data } = await api.profile.auth.byDiscord({
      urlLocation: window.location.href,
      platform: 'web',
    })
    return data?.url
  })
  const { push } = useRouter()

  const { data: twitterAuthUrl } = useSWR('login-twitter', async () => {
    const data = await API.MOCHI_PROFILE.get(
      `/profiles/auth/twitter?platform=web&url_location=${window.location.href}`,
    ).json((r) => r.data)
    return data?.url
  })

  const { data: mailAuthUrl } = useSWR('login-mail', async () => {
    const data = await API.MOCHI_PROFILE.get(
      `/profiles/auth/mail?platform=web&url_location=${window.location.href}`,
    ).json((r) => r.data)
    return data?.url
  })

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
        console.log(user)

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

  const onOpenChange = (open: boolean) => {
    setOpen(open)
    onHideLoginPopover?.(open)
    onCloseLoginPopover?.(open)
  }

  useEffect(() => {
    if (user?.token) {
      login({ token: user.token })
    }
  }, [login, user?.token])

  if (compact) {
    return (
      <div className="grid grid-cols-2 grid-rows-3 gap-3 p-3">
        <LoginWidget
          open={open}
          onOpenChange={onOpenChange}
          authUrl="https://api-preview.mochi-profile.console.so/api/v1/profiles/auth"
          meUrl="https://api-preview.mochi-profile.console.so/api/v1/profiles/me"
          trigger={
            <Button
              type="button"
              appearance="secondary"
              size="sm"
              className="col-span-2"
            >
              <IconWalletAdd className="mr-2 w-5 h-5" />
              Connect Wallet
            </Button>
          }
        />
        <a
          href={discordAuthUrl ?? ''}
          className={button({
            appearance: 'text',
          })}
        >
          <Icon
            icon="mingcute:discord-fill"
            className="flex-shrink-0 text-foreground"
          />
        </a>
        <button
          onClick={onAuthTelegram}
          className={button({
            appearance: 'text',
          })}
        >
          <Icon
            icon="mingcute:telegram-fill"
            className="flex-shrink-0 text-foreground"
          />
        </button>
        <a
          href={twitterAuthUrl ?? ''}
          className={button({
            appearance: 'text',
          })}
        >
          <Icon
            icon="mingcute:twitter-fill"
            className="flex-shrink-0 text-foreground"
          />
        </a>
        <a
          href={mailAuthUrl ?? ''}
          className={button({
            appearance: 'text',
          })}
        >
          <Icon
            icon="mingcute:google-fill"
            className="flex-shrink-0 text-foreground"
          />
        </a>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center bg-inherit">
      <Text size="lg" className="mb-6">
        Log in
      </Text>
      <div className="flex flex-col gap-y-5 bg-inherit">
        <Divider>Sign in with an extension wallet</Divider>
        <LoginWidget
          open={open}
          onOpenChange={onOpenChange}
          authUrl="https://api-preview.mochi-profile.console.so/api/v1/profiles/auth"
          meUrl="https://api-preview.mochi-profile.console.so/api/v1/profiles/me"
          onSuccess={() => push('/profile')}
          trigger={
            <button
              type="button"
              className="flex items-center self-center py-3 px-7 my-3 font-medium text-white bg-black rounded-xl"
            >
              <IconWalletAdd className="mr-2 w-5 h-5" />
              Connect Wallet
            </button>
          }
        />
        <Divider>Or connect with verified social links</Divider>
        <div className="grid grid-cols-2 grid-rows-2 gap-3 mt-3">
          <a
            href={discordAuthUrl ?? ''}
            className={button({
              appearance: 'text',
            })}
          >
            <Icon icon="mingcute:discord-fill" className="text-foreground" />
            <div>Discord</div>
          </a>
          <button
            onClick={onAuthTelegram}
            className={button({
              appearance: 'text',
            })}
          >
            <Icon icon="mingcute:telegram-fill" className="text-foreground" />
            <div>Telegram</div>
          </button>
          <a
            href={twitterAuthUrl ?? ''}
            className={button({
              appearance: 'text',
            })}
          >
            <Icon icon="mingcute:twitter-fill" className="text-foreground" />
            <div>Twitter</div>
          </a>
          <a
            href={mailAuthUrl ?? ''}
            className={button({
              appearance: 'text',
            })}
          >
            <Icon icon="mingcute:google-fill" className="text-foreground" />
            <div>Google</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <div className="flex flex-1 justify-center items-center w-full bg-dashboard-gray-1">
      <LoginPanel />
    </div>
  )
}
