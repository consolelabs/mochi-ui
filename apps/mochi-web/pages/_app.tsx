import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import '@fontsource/poppins/500.css'
import '~styles/global.css'
import dynamic from 'next/dynamic'
import { StrictMode, useEffect, useState } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import 'nprogress/nprogress.css'
// import '@consolelabs/ui-components/styles.css'
import '~styles/nprogress.css'
import '../styles/tos.css'
import { useAppWalletContext, WalletProvider } from '~context/wallet-context'
import { Toaster } from 'sonner'
import { useRouter } from 'next/router'
import { useAuthStore } from '~store'
import { shallow } from 'zustand/shallow'
import { isBeta } from '~constants'
import Button from '~cpn/base/button'
import Script from 'next/script'
import { Header } from '~cpn/header'
import { Modal, ModalContent, ModalTrigger } from '@consolelabs/ui-components'

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
  const { disconnect } = useAppWalletContext()
  const { query, asPath, replace, isReady } = useRouter()
  const { isLoggedIn, login, removeToken, hideIsLogging } = useAuthStore(
    (s) => ({
      isLoggedIn: s.isLoggedIn,
      login: s.login,
      removeToken: s.removeToken,
      hideIsLogging: s.hideIsLogging,
    }),
    shallow,
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
      <Header />
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}

export default function App(props: AppPropsWithLayout) {
  const [isOpen, setIsOpen] = useState(false)

  const hanldeOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen)
    if (!isOpen) {
      localStorage.setItem('beta-consented', 'true')
    }
  }

  useEffect(() => {
    const consented = localStorage.getItem('beta-consented')
    if (!consented && isBeta) {
      setIsOpen(true)
    }
  }, [])

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
        <InnerApp {...props} />
      </WalletProvider>
      <Modal open={isOpen} onOpenChange={hanldeOpenChange}>
        <ModalContent className="flex relative z-50 flex-col items-center max-w-sm bg-white">
          <span className="text-lg font-semibold">Warning</span>
          <span className="mt-2 font-light text-center text-dashboard-gray-8">
            You&apos;re visiting the <span className="font-semibold">beta</span>{' '}
            page of Mochi, this site is meant for internal team testing, the
            Mochi team won&apos;t be responsible for any loss of your assets on
            beta site, proceed with caution.
          </span>
          <div className="flex gap-x-2 self-stretch mt-5">
            <ModalTrigger asChild>
              <Button type="button" appearance="secondary" className="flex-1">
                I understand the risk
              </Button>
            </ModalTrigger>
          </div>
        </ModalContent>
      </Modal>
    </StrictMode>
  )
}
