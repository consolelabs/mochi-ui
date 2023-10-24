import Button, { button } from '~cpn/base/button'
import Text from '~cpn/base/text'
import { Icon } from '@iconify/react'
import useSWR from 'swr'
import { api } from '~constants/mochi'
import { AUTH_TELEGRAM_ID, MOCHI_PROFILE_API } from '~envs'
import { API } from '~constants/api'
import qs from 'query-string'
import { useCallback, useEffect, useState } from 'react'
import { LoginWidget, useMochi } from '@consolelabs/ui-components'
import { useAuthStore } from '~store'

const WalletAddIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.1519 7.25771C12.9788 7.19869 12.7932 7.16667 12.6002 7.16667C11.6567 7.16667 10.8918 7.93151 10.8918 8.875V9.29167H10.4752C9.53168 9.29167 8.76683 10.0565 8.76683 11C8.76683 11.9435 9.53168 12.7083 10.4752 12.7083H10.8918V13.125C10.8918 13.2345 10.9021 13.3416 10.9218 13.4454C10.094 13.7325 8.98194 13.8333 7.50016 13.8333C3.83543 13.8333 2.43187 13.2165 1.99815 10.6915C1.98348 10.6061 2.04976 10.5278 2.13641 10.5278H5.13905C5.44912 10.5278 5.75613 10.4667 6.0426 10.348C6.32906 10.2294 6.58935 10.0555 6.8086 9.83622C7.02785 9.61697 7.20177 9.35668 7.32043 9.07021C7.43909 8.78375 7.50016 8.47674 7.50016 8.16667C7.50016 7.8566 7.43909 7.54958 7.32043 7.26312C7.20177 6.97666 7.02785 6.71636 6.8086 6.49711C6.58935 6.27786 6.32906 6.10395 6.0426 5.98529C5.75613 5.86663 5.44912 5.80556 5.13905 5.80556H2.13641C2.04976 5.80556 1.98348 5.72726 1.99815 5.64186C2.43187 3.11684 3.83543 2.5 7.50016 2.5C11.8467 2.5 13.0125 3.36773 13.1519 7.25771ZM11.8918 12.923V12.7083V11.7083H10.8918H10.4752C10.084 11.7083 9.76683 11.3912 9.76683 11C9.76683 10.6088 10.084 10.2917 10.4752 10.2917H10.8918H11.8918V9.29167V8.875C11.8918 8.4838 12.209 8.16667 12.6002 8.16667C12.8311 8.16667 13.0362 8.27719 13.1656 8.44824C13.1439 10.7794 12.8414 12.1488 11.8918 12.923ZM1.86569 9.45088C1.84336 9.05721 1.8335 8.63001 1.8335 8.16667C1.8335 7.70332 1.84336 7.27612 1.86569 6.88246C1.86992 6.80792 1.93182 6.75 2.00648 6.75H5.13905C5.3251 6.75 5.5093 6.78663 5.6812 6.85782C5.85306 6.92904 6.00925 7.03338 6.14079 7.16492C6.27234 7.29647 6.37668 7.45266 6.4479 7.62452C6.51909 7.79642 6.55572 7.98062 6.55572 8.16667C6.55572 8.35271 6.51909 8.53692 6.4479 8.70881C6.37668 8.88068 6.27234 9.03687 6.14079 9.16841C6.00925 9.29995 5.85306 9.40429 5.6812 9.47551C5.5093 9.5467 5.3251 9.58333 5.13905 9.58333H2.00648C1.93182 9.58333 1.86992 9.52542 1.86569 9.45088ZM5.13905 8.16667C5.13905 7.90587 4.92763 7.69444 4.66683 7.69444H3.72239C3.46158 7.69444 3.25016 7.90587 3.25016 8.16667C3.25016 8.42747 3.46158 8.63889 3.72239 8.63889H4.66683C4.92763 8.63889 5.13905 8.42747 5.13905 8.16667Z"
      fill="white"
    />
    <path
      d="M12.6001 8.875V13.125"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M14.7251 11L10.4751 11"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

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

export function LoginPanel({ compact = false }: { compact?: boolean }) {
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
          onOpenChange={setOpen}
          authUrl="https://api-preview.mochi-profile.console.so/api/v1/profiles/auth"
          meUrl="https://api-preview.mochi-profile.console.so/api/v1/profiles/me"
          trigger={
            <Button
              type="button"
              appearance="secondary"
              size="sm"
              className="col-span-2"
            >
              <WalletAddIcon className="mr-2 w-5 h-5" />
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
          onOpenChange={setOpen}
          authUrl="https://api-preview.mochi-profile.console.so/api/v1/profiles/auth"
          meUrl="https://api-preview.mochi-profile.console.so/api/v1/profiles/me"
          trigger={
            <button
              type="button"
              className="flex items-center self-center py-3 px-7 my-3 font-medium text-white bg-black rounded-xl"
            >
              <WalletAddIcon className="mr-2 w-5 h-5" />
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
