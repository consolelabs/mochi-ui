import { api } from '~constants/mochi'
import { create } from 'zustand'
import { useMochi } from '@consolelabs/ui-components'
import { API, apiLogin, apiLogout } from '~constants/api'
import { useTipWidget } from '~cpn/MochiWidget/Tip/store'
import { useProfileStore } from './profile'

const STORAGE_KEY = 'mochi.token'

type LoginProps = {
  token?: string
  showLoading?: boolean
}

type State = {
  token: string | null
  isLoggedIn: boolean
  isLoadingSession: boolean
  // After login, it will take 1 or 2 seconds to redirect to /profile. Use this flag to display loading message.
  isLogging: boolean
  login: (props: LoginProps) => Promise<void>
  logout: () => void
  removeToken: () => void
  hideIsLogging: () => void
}

export const useAuthStore = create<State>((set, get) => ({
  me: undefined,
  token: null,
  isLoggedIn: false,
  isLoadingSession: true,
  isLogging: false,
  removeToken: () => {
    set({ token: null, isLoggedIn: false })
  },
  logout: () => {
    useMochi.getState().logout()
    useTipWidget.getState().reset()
    localStorage.removeItem(STORAGE_KEY)
    api.token(null)
    apiLogout()
  },
  login: async ({ token: tokenParam, showLoading = false }: LoginProps) => {
    const { logout: _logout } = get()
    function logout() {
      set({ isLoadingSession: false })
      _logout()
    }
    // on load, try to get token first from storage
    const token = tokenParam ?? localStorage.getItem(STORAGE_KEY)

    // if not found, this user has properly logged out
    if (!token) {
      set({ token: null, isLoggedIn: false, isLoadingSession: false })
    } else {
      // if found, this token could still be outdated or malformed -> try to call the /me api with this token

      set({
        ...(showLoading ? { isLoadingSession: true, isLogging: true } : {}),
      })
      api.token(token)
      await API.MOCHI_PROFILE.auth(`Bearer ${token}`)
        .get('/profiles/me')
        .badRequest(logout)
        .unauthorized(logout)
        .internalError(logout)
        .res((res) => {
          // if the code makes it here means the token is valid
          localStorage.setItem(STORAGE_KEY, token)
          set({ token, isLoggedIn: true })
          apiLogin(token)
          set({ isLoadingSession: false })
          return res.json()
        })
        .then((me) => useProfileStore.getState().setMe(me))
    }
  },
  hideIsLogging: () => {
    set({ isLogging: false })
  },
}))
