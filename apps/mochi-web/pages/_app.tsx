import { Inter } from 'next/font/google'
import '~styles/global.css'
import dynamic from 'next/dynamic'
import { StrictMode, useEffect } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import 'nprogress/nprogress.css'
import '~styles/nprogress.css'
import { useRouter } from 'next/router'
import { useShallow } from 'zustand/react/shallow'
import Script from 'next/script'
import { LazyMotion, domAnimation } from 'framer-motion'
import { useAuthStore } from '../store/auth'

const Header = dynamic(() => import('~cpn/Header').then((m) => m.Header))
const WalletProvider = dynamic(() =>
  import('~context/wallet-context').then((m) => m.WalletProvider),
)
const Toaster = dynamic(() => import('sonner').then((m) => m.Toaster))

const inter = Inter({ subsets: ['latin'] })

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
  const disconnect = () => {}
  const { query, asPath, replace, isReady } = useRouter()
  const { isLoggedIn, login, removeToken, hideIsLogging } = useAuthStore(
    useShallow((s) => ({
      isLoggedIn: s.isLoggedIn,
      login: s.login,
      removeToken: s.removeToken,
      hideIsLogging: s.hideIsLogging,
    })),
  )
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    if (!isReady || isLoggedIn) return
    login({
      token: query.token as string,
      showLoading: true,
    }).then(() => {
      if (!query.token) return
      replace('', undefined, {
        shallow: true,
      }).catch(handleCancelRendering)
    })
  }, [asPath, isLoggedIn, isReady, login, query.token, replace])

  useEffect(() => {
    const parts = asPath.split('#')
    const hash = parts.at(1)
    const path = parts.at(0)?.split('?').at(0)
    if (hash && hash === 'logout') {
      disconnect()
      removeToken()
      replace({ pathname: path }, undefined, {
        shallow: true,
      })
        .catch(handleCancelRendering)
        .finally(hideIsLogging)
    }
  }, [asPath, disconnect, hideIsLogging, removeToken, replace])

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Header />
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}

export default function App(props: AppPropsWithLayout) {
  return (
    <StrictMode>
      <Toaster
        position="top-right"
        closeButton
        toastOptions={{
          className: 'w-full',
        }}
      />
      <TopProgressBar />
      <Script async src="https://telegram.org/js/telegram-widget.js?22" />
      <WalletProvider>
        <LazyMotion strict features={domAnimation}>
          <InnerApp {...props} />
        </LazyMotion>
      </WalletProvider>
    </StrictMode>
  )
}
