import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ResponseUserGeneralSettingResponse } from '~types/mochi-schema'

export const SWR_KEY_FETCH_GENERAL_SETTINGS = 'SWR_KEY_FETCH_GENERAL_SETTINGS'

export const useFetchGeneralSettings = (profileId?: string) => {
  const { data, ...rest } = useSWR<ResponseUserGeneralSettingResponse>(
    profileId ? [SWR_KEY_FETCH_GENERAL_SETTINGS, profileId] : null,
    async ([_, id]: [any, string]) => {
      if (!id) return []
      return API.MOCHI.get(GET_PATHS.GET_GENERAL_SETTINGS(id)).json(
        (r) => r ?? [],
      )
    },
  )

  return {
    data: data?.data,
    ...rest,
  }
}
