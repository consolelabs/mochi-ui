import {
  DiscordColored,
  FacebookColored,
  Github,
  GoogleColored,
  MailLine,
  SlackColored,
  TelegramColored,
  X,
} from '@mochi-ui/icons'
import MochiAPI from '@consolelabs/mochi-rest'
import qs from 'query-string'
import { Platform } from '@consolelabs/mochi-ui'
import type { Profile } from '@consolelabs/mochi-rest'
import { ChainProvider } from '@mochi-web3/connect-wallet-widget'
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import reducer from './reducer'

export const STORAGE_KEY = 'mochi.token' as const

type EventName = 'login' | 'update_wallets' | 'logout' | 'refresh'

type ActionCreator<E extends EventName, P extends any = null> = {
  type: E
  payload: P
}

const initSocialAuths = (profileBaseUrl: string, telegramBotId: string) => {
  const api = new MochiAPI({
    log: false,
    payUrl: '',
    baseUrl: '',
    profileUrl: profileBaseUrl,
  })

  return [
    {
      id: Platform.Discord,
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
      id: Platform.Telegram,
      name: 'telegram',
      icon: <TelegramColored className="w-7 h-7" />,
      onClick: (urlLocation: string) =>
        // @ts-ignore
        window.Telegram.Login.auth(
          {
            bot_id: telegramBotId,
            request_access: true,
            return_to: encodeURI(window.location.href),
            lang: 'en',
          },
          (user: any) => {
            const telegramAuth = `${profileBaseUrl}/profiles/auth/telegram?${qs.stringify(
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
      id: Platform.Twitter,
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
      id: Platform.Email,
      name: 'gmail',
      icon: <GoogleColored className="w-7 h-7" />,
      onClick: (urlLocation: string) =>
        api.profile.auth
          .byGmail({ urlLocation, platform: 'web' })
          .then((res) => {
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
}

export type Action =
  | ActionCreator<
      'login',
      {
        profile: Profile
        addresses: string[]
        chain: string
        provider?: ChainProvider | null
        isInstallChecker?: (chain: string) => Promise<boolean>
        token: string
      }
    >
  | ActionCreator<
      'update_wallets',
      {
        addresses: string[]
        chain: string
        provider?: ChainProvider | null
        isInstallChecker?: (chain: string) => Promise<boolean>
      }
    >
  | ActionCreator<'logout'>
  | ActionCreator<'refresh'>

type Payload<E extends EventName> = Extract<Action, { type: E }>['payload']

export type Wallet = {
  address: string
  connectionStatus: 'connected' | 'disconnected' | 'not_installed'
  providers: ChainProvider[]
}

export type LoginWidgetState = {
  isLoggedIn: boolean
  isLoggingIn: boolean
  setIsLoggingIn: (b: boolean) => void
  isLoadingProfile: boolean
  setIsLoadingProfile: (b: boolean) => void
  wallets: Array<Wallet>
  profile: Profile | null
  token: string

  getProviderByAddress: (address: string) => ChainProvider | null
  isAddressConnected: (address: string) => boolean

  dispatch: (action: Action) => void

  setupSocials: (params: {
    telegramBotId: string
    profileBaseUrl: string
    allowedSocials: Platform[]
  }) => void

  socials: {
    id?: string
    name: string
    icon: JSX.Element
    disabled: boolean
    onClick?: (urlLocation: string) => Promise<void>
  }[]

  profileBaseUrl: string
  //
  // socials: Array<Platform>
  // setSocials: (socials: Array<Platform>) => void
  //
  // telegramBotId: string
  // setTelegramBotId: (id: string) => void
}

export const useLoginWidget = create<LoginWidgetState>((set, get) => {
  return {
    isLoggedIn: false,
    isLoggingIn: true,
    setIsLoggingIn: (isLoggingIn) => set({ isLoggingIn }),
    isLoadingProfile: false,
    setIsLoadingProfile: (isLoadingProfile) => {
      const newState: Partial<LoginWidgetState> = {
        isLoadingProfile,
      }
      if (!isLoadingProfile) {
        newState.isLoggingIn = false
      }
      set(newState)
    },
    profile: null,
    token: '',
    wallets: [],
    isAddressConnected: (address) => {
      return (
        get().wallets.find(
          (w) => w.address.toLowerCase() === address.toLowerCase(),
        )?.connectionStatus === 'connected'
      )
    },
    getProviderByAddress: (address) => {
      const wallet = get().wallets.find(
        (w) => w.address.toLowerCase() === address.toLowerCase(),
      )
      return wallet?.providers[0] ?? null
    },
    dispatch: (action) => {
      // current state
      const state = get()

      // combine action + current state = new state
      const newState = reducer(action, state)

      // update state
      set(newState)
    },

    socials: [],
    setupSocials: (params) => {
      const socials = initSocialAuths(
        params.profileBaseUrl,
        params.telegramBotId,
      ).map((item) => ({
        ...item,
        disabled: params.allowedSocials.every((s) => s !== item.id),
      }))
      set({ socials, profileBaseUrl: params.profileBaseUrl })
    },
    profileBaseUrl: '',
  }
})

export const usePublicLoginWidget = () =>
  useLoginWidget(
    useShallow((s) => ({
      // state
      isLoggedIn: s.isLoggedIn,
      isLoggingIn: s.isLoggingIn,
      isLoadingProfile: s.isLoadingProfile,
      wallets: s.wallets,
      profile: s.profile,
      token: s.token,

      // utilities
      getProviderByAddress: s.getProviderByAddress,
      isAddressConnected: s.isAddressConnected,

      // state actions (changes state)
      login: (payload: Payload<'login'>) =>
        s.dispatch({
          type: 'login',
          payload,
        }),
      update: (payload: Payload<'update_wallets'>) =>
        s.dispatch({
          type: 'update_wallets',
          payload,
        }),
      refresh: () =>
        s.dispatch({
          type: 'refresh',
          payload: null,
        }),
      logout: () => {
        localStorage.removeItem(STORAGE_KEY)
        s.dispatch({ type: 'logout', payload: null })
      },

      socials: s.socials,
    })),
  )

export const getLoginWidgetState = () => {
  const { dispatch, ...rest } = useLoginWidget.getState()

  return {
    ...rest,

    // state actions (changes state)
    login: (payload: Payload<'login'>) =>
      dispatch({
        type: 'login',
        payload,
      }),
    update: (payload: Payload<'update_wallets'>) =>
      dispatch({
        type: 'update_wallets',
        payload,
      }),
    refresh: () =>
      dispatch({
        type: 'refresh',
        payload: null,
      }),
    logout: () => {
      localStorage.removeItem(STORAGE_KEY)
      dispatch({ type: 'logout', payload: null })
    },
  }
}
