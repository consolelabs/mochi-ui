import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ResponseGetGlobalProfileInfoResponse } from '~types/mochi-schema'

export const SWR_KEY_FETCH_PROFILE_GLOBAL_INFO =
  'SWR_KEY_FETCH_PROFILE_GLOBAL_INFO'

export const useFetchProfileGlobalInfo = (profileId?: string) => {
  const { data } = useSWR<{ data: ResponseGetGlobalProfileInfoResponse }>(
    profileId ? [SWR_KEY_FETCH_PROFILE_GLOBAL_INFO, profileId] : null,
    async ([_, id]: [any, string]) => {
      if (!id) return {}
      return API.MOCHI.get(GET_PATHS.GET_PROFILE_GLOBAL_INFO(id)).json(
        (r) => r ?? {},
      )
    },
  )

  return {
    data: data?.data,
  }
}
