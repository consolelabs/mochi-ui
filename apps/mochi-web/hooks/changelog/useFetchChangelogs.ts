import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ResponseProductChangelogs } from '~types/mochi-schema'

export const SWR_KEY_FETCH_CHANGELOGS = 'SWR_KEY_FETCH_CHANGELOGS'

export const useFetchChangelogs = (
  query: { page?: number; size?: number } = {},
) => {
  const { data } = useSWR<ResponseProductChangelogs>(
    [SWR_KEY_FETCH_CHANGELOGS, query],
    async ([_, id]: [any, string]) => {
      if (!id) return {}
      return API.MOCHI.query(query)
        .get(GET_PATHS.CHANGELOGS)
        .json((r) => r ?? {})
    },
  )

  return {
    data: data?.data,
    pagination: data?.pagination,
  }
}
