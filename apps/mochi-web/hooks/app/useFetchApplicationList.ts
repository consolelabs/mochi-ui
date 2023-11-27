import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ViewApplicationListResponse } from '~types/mochi-pay-schema'

export const SWR_KEY_FETCH_APPLICATION_LIST = 'SWR_KEY_FETCH_APPLICATION_LIST'

export const useFetchApplicationList = (profileId?: string) => {
  const { data, ...rest } = useSWR<ViewApplicationListResponse>(
    [SWR_KEY_FETCH_APPLICATION_LIST, profileId],
    async ([_, id]: [any, string]) => {
      if (!id) return []
      return API.MOCHI_PAY.get(GET_PATHS.GET_APPLICATION_LIST(id)).json(
        (r) => r ?? [],
      )
    },
  )

  return {
    data: data?.data,
    ...rest,
  }
}
