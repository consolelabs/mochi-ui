import { create } from 'zustand'
import { useMochi } from '@consolelabs/ui-components'
import { API, apiLogin, apiLogout } from '~constants/api'
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
  login: (props: LoginProps) => Promise<void>
  logout: () => void
  removeToken: () => void
}

export const useAuthStore = create<State>((set, get) => ({
  me: undefined,
  token: null,
  isLoggedIn: false,
  isLoadingSession: true,
  removeToken: () => {
    set({ token: null, isLoggedIn: false })
  },
  logout: () => {
    useMochi.getState().logout()
    localStorage.removeItem(STORAGE_KEY)
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

      set({ ...(showLoading ? { isLoadingSession: true } : {}) })
      await API.MOCHI_PROFILE.auth(`Bearer ${token}`)
        .get('/profiles/me')
        .badRequest(logout)
        .unauthorized(logout)
        .internalError(logout)
        .res((res) => {
          set({ isLoadingSession: false })
          // if the code makes it here means the token is valid
          localStorage.setItem(STORAGE_KEY, token)
          set({ token, isLoggedIn: true })
          apiLogin(token)

          return res.json()
        })
        .then((me) => useProfileStore.getState().setMe(me))
    }
  },
}))
