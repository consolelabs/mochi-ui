import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { button } from '~cpn/base/button'
import { PAGES } from '~constants'
import { useHasMounted } from '@dwarvesf/react-hooks'
import { GetServerSideProps } from 'next'
import { Icon } from '@iconify/react'
import Script from 'next/script'
import { HOME_URL } from '~envs'
import { useAuthStore, useProfileStore } from '~store'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { username = '', code, error = '', done } = ctx.query

  if (!code && !done)
    return {
      notFound: true,
    }

  return {
    props: {
      username,
      code,
      error: decodeURIComponent(error as string),
      done: !!done,
    },
  }
}

export default function ConnectTelegram({
  code,
  error,
  done,
  username,
}: {
  code?: string
  error?: string
  done: boolean
  username: string
}) {
  const isLoading = useAuthStore((s) => s.isLoadingSession)
  const profile = useProfileStore((s) => s.me)
  const hasTelegramAccount =
    profile?.associated_accounts?.some(
      (aa) => aa.platform?.toLowerCase() === 'telegram',
    ) ?? false
  const mounted = useHasMounted()

  if (!mounted) return null

  return (
    <Layout>
      <Script
        async
        src="https://telegram.org/js/telegram-widget.js?22"
        data-telegram-login="dmmochibot"
        data-size="large"
        data-auth-url={`https://api.mochi-profile.console.so/api/v1/profiles/auth/telegram?code=${code}`}
        data-request-access="write"
      ></Script>
      <SEO title={PAGES.CONNECT_TELEGRAM.title} tailTitle />
      <div className="flex relative flex-col items-center">
        <div className="py-16 px-12 mx-auto max-w-7xl">
          <div className="py-24 md:py-48">
            {isLoading ? null : error ? (
              <div className="py-8 px-8 mx-auto md:px-16 md:max-w-2xl">
                <div className="mb-2 font-medium text-center md:text-xl">
                  Something went wrong with error
                </div>
                <div className="py-2 px-4 w-full font-mono rounded bg-stone-200">
                  &ldquo;{error}&rdquo;
                </div>
              </div>
            ) : hasTelegramAccount && username && done ? (
              <div className="py-8 px-8 mx-auto md:px-16 md:max-w-2xl">
                <div className="text-2xl font-black text-center md:text-3xl">
                  <span className="uppercase text-mochi-gradient">
                    Your Telegram <span className="font-mono">@{username}</span>{' '}
                    is linked! You can close this window
                  </span>{' '}
                  ✨
                  <p className="mt-4 text-sm uppercase md:text-base">
                    To connect with a different account, please disconnet the
                    mochi.gg app via Telegram and try again.
                  </p>
                </div>
              </div>
            ) : (
              <a
                className={button({
                  className: '!shadow-none font-semibold',
                  appearance: 'secondary',
                })}
                href={`https://oauth.telegram.org/auth?bot_id=6298380973&origin=${encodeURI(
                  HOME_URL,
                )}&embed=1&request_access=write&return_to=${encodeURI(
                  `${HOME_URL}/connect-telegram?code=${code ?? ''}`,
                )}`}
              >
                <Icon icon="ic:baseline-telegram" />
                <div>Connect Telegram</div>
              </a>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
