import UI from '@consolelabs/mochi-ui'
import MochiApi from '@consolelabs/mochi-rest'

// production endpoints
export const MOCHI_ENDPOINTS = {
  MOCHI_PROFILE_API: 'https://api.mochi-profile.console.so/api/v1',
  MOCHI_PAY_API: 'https://api.mochi-pay.console.so/api/v1',
  MOCHI_API: 'https://api.mochi.console.so/api/v1',
}

export const MOCHI_PREVIEW_ENDPOINTS = {
  MOCHI_PROFILE_API: 'https://api-preview.mochi-profile.console.so/api/v1',
  MOCHI_PAY_API: 'https://api-preview.mochi-pay.console.so/api/v1',
  MOCHI_API: 'https://api-preview.mochi.console.so/api/v1',
}

// eslint-disable-next-line import/no-mutable-exports -- singleton
let mochiAPI: MochiApi | null = null

// InitMochiAPI initializes the mochiAPI as singleton, must be called before using GetMochi
export function InitMochiAPI(
  endPoints: typeof MOCHI_ENDPOINTS,
  enableLog = false,
) {
  if (!mochiAPI) {
    mochiAPI = new MochiApi({
      payUrl: endPoints.MOCHI_PAY_API,
      profileUrl: endPoints.MOCHI_PROFILE_API,
      baseUrl: endPoints.MOCHI_API,
      log: enableLog,
    })
    mochiAPI.init()
  }
  UI.api = mochiAPI
}

// GetMochi returns the mochiAPI and UI instance
// If mochiAPI is not initialized, it will be initialized with default production config
export function GetMochi(): {
  mochiAPI: MochiApi
  UI: typeof UI
} {
  if (!mochiAPI) {
    InitMochiAPI(MOCHI_ENDPOINTS)
    console.warn('[MochiStore] mochi initialized with default config')
  }

  // At this point we already have mochiAPI instance
  return { mochiAPI: mochiAPI!, UI }
}
