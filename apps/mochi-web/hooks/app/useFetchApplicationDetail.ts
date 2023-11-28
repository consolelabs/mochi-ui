import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ViewApplicationResponse } from '~types/mochi-pay-schema'

export const SWR_KEY_FETCH_APPLICATION_DETAIL =
  'SWR_KEY_FETCH_APPLICATION_DETAIL'

export const useFetchApplicationDetail = (
  profileId?: string,
  appId?: string,
) => {
  const { data, ...rest } = useSWR<ViewApplicationResponse>(
    [SWR_KEY_FETCH_APPLICATION_DETAIL, profileId, appId],
    async ([_, profileId, appId]: [any, string, string]) => {
      if (!profileId || !appId) return []
      return API.MOCHI_PAY.get(
        GET_PATHS.GET_APPLICATION_DETAIL(profileId, appId),
      ).json((r) => r ?? [])
    },
  )

  return {
    data: data?.data,
    ...rest,
  }
}
