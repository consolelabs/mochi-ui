import '~styles/global.css'
import dynamic from 'next/dynamic'
import { StrictMode, useEffect } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import 'nprogress/nprogress.css'
import '~styles/nprogress.css'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { interFont } from '~utils/next-font'
import { Toaster, useLoginWidget } from '@mochi-ui/core'
import { LazyMotion, domAnimation } from 'framer-motion'
import { useAuthStore } from '../store/auth'
import { SidebarContextProvider } from '../context/app/sidebar'

const Header = dynamic(() => import('~cpn/Header').then((m) => m.Header))
const WalletProvider = dynamic(() =>
  import('~context/wallet-context').then((m) => m.WalletProvider),
)
const LoginWidgetProvider = dynamic(() =>
  import('@mochi-ui/core').then((m) => m.LoginWidgetProvider),
)

const TopProgressBar = dynamic(() => import('~app/layout/nprogress'), {
  ssr: false,
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export function handleCancelRendering(e: any) {
  if (!e.cancelled) throw e
}

function InnerApp({ Component, pageProps }: AppPropsWithLayout) {
  const { asPath, replace } = useRouter()
  const { token, isLoggedIn } = useLoginWidget()
  const { login } = useAuthStore()
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    const parts = asPath.split('#')
    const hash = parts[1]
    const path = parts[0]?.split('?')[0]
    if (hash && hash === 'logout') {
      replace({ pathname: path }, undefined, {
        shallow: true,
      }).catch(handleCancelRendering)
    }
  }, [asPath, replace])

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
      <Header />
      {getLayout(<Component {...pageProps} />)}
    </SidebarContextProvider>
  )
}

export default function App(props: AppPropsWithLayout) {
  useEffect(() => {
    async function loadExternalScript() {
      await import('focus-visible')
      console.log('load script success')
    }

    loadExternalScript()
  }, [])
  return (
    <StrictMode>
      <div className="fixed z-50 top-3 right-3">
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
