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
import { Toaster, useLoginWidget } from '@mochi-ui/core'
import { LazyMotion, domAnimation } from 'framer-motion'
import { WalletProviderProps } from '~context/wallet-context'
import { apiLogin } from '~constants/api'
import { useAuthStore } from '~store/auth'

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
  import('@mochi-ui/core').then((m) => m.LoginWidgetProvider),
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

function InnerApp({ Component, pageProps }: AppPropsWithLayout) {
  const { login } = useAuthStore()
  const { isLoggedIn, token } = useLoginWidget()
  const layoutType = Component.layoutType ?? 'dashboard'

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
          <LoginWidgetProvider>
            <InnerApp {...props} />
          </LoginWidgetProvider>
        </LazyMotion>
      </WalletProvider>
    </StrictMode>
  )
}
