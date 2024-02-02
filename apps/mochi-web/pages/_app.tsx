import '~styles/global.css'
import dynamic from 'next/dynamic'
import { FC, StrictMode, useEffect } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import 'nprogress/nprogress.css'
import '~styles/nprogress.css'
import Script from 'next/script'
import { interFont } from '~utils/next-font'
import {
  Alert,
  AlertBody,
  AlertDescription,
  AlertIcon,
  AlertLink,
  AlertTitle,
  Toaster,
} from '@mochi-ui/core'
import { LazyMotion, domAnimation } from 'framer-motion'
import { WalletProviderProps } from '~context/wallet-context'
import { useAuthStore } from '~store/auth'
import { useLoginWidget } from '@mochi-web3/login-widget'
import { AUTH_TELEGRAM_ID, MOCHI_PROFILE_API } from '~envs'
import { Platform } from '@consolelabs/mochi-formatter'
import { useRouter } from 'next/router'
import { ROUTES } from '~constants/routes'
import { useFetchChangelogLatest } from '~hooks/app/useFetchChangelogLatest'
import { CheckCircleOutlined } from '@mochi-ui/icons'

const SidebarContextProvider = dynamic(() =>
  import('../context/app/sidebar').then((m) => m.SidebarContextProvider),
)
const DashboardLayout = dynamic(() =>
  import('~cpn/DashboardLayout').then((m) => m.default),
)
const Header = dynamic(() =>
  import('~cpn/Header').then((m) => m.Header),
) as FC<{ layoutType?: 'dashboard' | 'landing' }>
const WalletProvider = dynamic(() =>
  import('~context/wallet-context').then((m) => m.WalletProvider),
) as FC<WalletProviderProps>
const LoginWidgetProvider = dynamic(() =>
  import('@mochi-web3/login-widget').then((m) => m.LoginWidgetProvider),
) as FC<{ children: ReactNode }>

const TopProgressBar = dynamic(() => import('~app/layout/nprogress'), {
  ssr: false,
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
  layoutType?: 'dashboard' | 'landing'
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export function handleCancelRendering(e: any) {
  if (!e.cancelled) throw e
}

function ChangelogAlert() {
  const { data } = useFetchChangelogLatest()

  if (!data) {
    return null
  }

  return (
    <Alert className="!p-0 h-14 rounded-none transition-[height] animate-show-changelog-alert">
      <AlertBody className="landing-container !flex-row !items-center">
        <AlertIcon asChild>
          <CheckCircleOutlined />
        </AlertIcon>
        <AlertTitle className="pl-[26px] truncate">{`Mochi version ${data.version} is now available!`}</AlertTitle>
        <AlertDescription className="truncate !block pr-6">
          {data.title}
        </AlertDescription>
        <AlertLink
          href={ROUTES.CHANGELOG_DETAIL(data.version || '')}
          target="_blank"
        >
          View More
        </AlertLink>
      </AlertBody>
    </Alert>
  )
}

function InnerApp({ Component, pageProps }: AppPropsWithLayout) {
  const { login } = useAuthStore()
  const { isLoggedIn, token } = useLoginWidget()
  const { pathname } = useRouter()

  const layoutType = Component.layoutType ?? 'dashboard'
  const shouldShowChangelogAlert = pathname === ROUTES.HOME

  useEffect(() => {
    if (!isLoggedIn || !token) return
    login({ token })
  }, [isLoggedIn, login, token])

  return (
    <SidebarContextProvider>
      <style jsx global>{`
        html {
          font-family: ${interFont.style.fontFamily};
        }
      `}</style>
      {shouldShowChangelogAlert && <ChangelogAlert />}
      <Header layoutType={Component?.layoutType || 'dashboard'} />
      {layoutType === 'landing' ? (
        <Component {...pageProps} />
      ) : (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      )}
    </SidebarContextProvider>
  )
}

export default function App(props: AppPropsWithLayout) {
  useEffect(() => {
    async function loadExternalScript() {
      await import('focus-visible')
    }

    loadExternalScript()
  }, [])
  return (
    <StrictMode>
      <div className="fixed top-3 right-3 z-50">
        <Toaster />
      </div>
      <TopProgressBar />
      <Script async src="https://telegram.org/js/telegram-widget.js?22" />
      <WalletProvider>
        <LazyMotion strict features={domAnimation}>
          <LoginWidgetProvider
            // @ts-ignore
            socials={[
              Platform.Discord,
              Platform.Telegram,
              Platform.Email,
              Platform.Twitter,
            ]}
            telegramBotId={AUTH_TELEGRAM_ID}
            profileApi={MOCHI_PROFILE_API}
          >
            <InnerApp {...props} />
          </LoginWidgetProvider>
        </LazyMotion>
      </WalletProvider>
    </StrictMode>
  )
}
