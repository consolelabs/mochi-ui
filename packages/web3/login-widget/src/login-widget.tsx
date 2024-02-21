import { Platform } from '@consolelabs/mochi-ui'
import React, { useEffect } from 'react'
import qs from 'query-string'
import { LazyMotion, domAnimation } from 'framer-motion'
import fetchers from './fetchers'
import {
  useLoginWidget,
  usePublicLoginWidget,
  getLoginWidgetState,
  STORAGE_KEY,
} from './store'
import LoginContent from './login-content'

interface LoginWidgetProps {
  raw?: boolean
  chain?: string
  onchain?: boolean
  onWalletConnectSuccess?: (data: {
    signature: string
    platform: string
    address: string
  }) => Promise<void>
  onClose?: () => void
}

function LoginWidget(props: LoginWidgetProps) {
  return <LoginContent {...props} />
}

interface LoginWidgetProviderProps {
  children?: React.ReactNode
  profileApi?: string
  socials?: Array<Platform>
  telegramBotId?: string
}

const LoginWidgetProvider = ({
  profileApi,
  children,
  socials = [],
  telegramBotId,
}: LoginWidgetProviderProps) => {
  // reducer for main state
  const {
    isLoggedIn,
    setIsLoadingProfile,
    dispatch,
    setupSocials,
    profileBaseUrl,
  } = useLoginWidget()

  // handle login from url query `token`
  useEffect(() => {
    if (isLoggedIn || !profileBaseUrl) return
    const { token: _token, ...rest } = qs.parse(window.location.search)
    let token = _token
    if (!token) {
      token = localStorage.getItem(STORAGE_KEY)
      if (!token) {
        setIsLoadingProfile(false)
        return
      }
    }

    setIsLoadingProfile(true)
    fetchers
      .getOwnProfile(token as string, profileBaseUrl)
      .then((profile) => {
        const hasParams = Object.keys(rest).length > 0

        window.history.replaceState(
          '',
          '',
          `${window.location.href.replace(window.location.search, '')}${
            hasParams ? `?${qs.stringify(rest)}` : ''
          }`,
        )

        if (!profile) return

        localStorage.setItem(STORAGE_KEY, token as string)
        dispatch({
          type: 'login',
          payload: {
            addresses: [],
            chain: '',
            profile,
            token: token as string,
          },
        })
      })
      .finally(() => setIsLoadingProfile(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, profileBaseUrl])

  useEffect(() => {
    setupSocials({
      profileBaseUrl:
        profileApi || 'https://api.mochi-profile.console.so/api/v1',
      telegramBotId: telegramBotId || '6298380973',
      allowedSocials: socials,
    })
  }, [profileApi, telegramBotId, socials, setupSocials])

  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}

export {
  LoginWidgetProvider,
  LoginWidget,
  // is a hook, for react
  usePublicLoginWidget as useLoginWidget,
  // for non-react
  getLoginWidgetState,
}
