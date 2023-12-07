import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ViewApplicationListWithPaginationResponse } from '~types/mochi-pay-schema'

export const SWR_KEY_FETCH_APPLICATION_LIST = 'SWR_KEY_FETCH_APPLICATION_LIST'

interface QueryParams {
  slug?: string
  page?: number
  size?: number
}

export const useFetchApplicationList = (
  profileId?: string,
  queryParams?: QueryParams,
) => {
  const { data, ...rest } = useSWR<ViewApplicationListWithPaginationResponse>(
    [SWR_KEY_FETCH_APPLICATION_LIST, profileId, queryParams],
    async ([_, id, queryParams]: [any, string, QueryParams]) => {
      if (!id || !queryParams) return []
      return API.MOCHI_PAY.query(queryParams)
        .get(GET_PATHS.GET_APPLICATION_LIST(id))
        .json((r) => r ?? [])
    },
  )

  return {
    data: data?.data,
    pagination: data?.pagination,
    ...rest,
  }
}
