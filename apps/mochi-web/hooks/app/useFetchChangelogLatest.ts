import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ResponseProductChangelogLatest } from '~types/mochi-schema'

export const SWR_KEY_FETCH_CHANGELOG_LATEST = 'SWR_KEY_FETCH_CHANGELOG_LATEST'

export const useFetchChangelogLatest = () => {
  const { data, ...rest } = useSWR<ResponseProductChangelogLatest>(
    [SWR_KEY_FETCH_CHANGELOG_LATEST],
    async () => {
      return API.MOCHI.get(GET_PATHS.CHANGELOGS_LATEST).json((r) => r ?? [])
    },
  )

  return {
    data: data?.data,
    ...rest,
  }
}
