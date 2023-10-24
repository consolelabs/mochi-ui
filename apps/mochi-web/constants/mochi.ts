import UI from '@consolelabs/mochi-ui'
import MochiApi from '@consolelabs/mochi-rest'
import { MOCHI_API, MOCHI_PAY_API, MOCHI_PROFILE_API } from '~envs'
const api = new MochiApi({
  payUrl: MOCHI_PAY_API,
  profileUrl: MOCHI_PROFILE_API,
  baseUrl: MOCHI_API,
  log: false,
})
api.init()

UI.api = api

export { UI, api }
