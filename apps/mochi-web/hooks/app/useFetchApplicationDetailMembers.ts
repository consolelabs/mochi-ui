import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ViewApplicationMemberListWithPaginationResponse } from '~types/mochi-pay-schema'

export const SWR_KEY_FETCH_APPLICATION_DETAIL_MEMBERS =
  'SWR_KEY_FETCH_APPLICATION_DETAIL_MEMBERS'

export const useFetchApplicationDetailMembers = (
  profileId?: string,
  appId?: string,
) => {
  const { data, ...rest } =
    useSWR<ViewApplicationMemberListWithPaginationResponse>(
      [SWR_KEY_FETCH_APPLICATION_DETAIL_MEMBERS, profileId, appId],
      async ([_, profileId, appId]: [any, string, string]) => {
        if (!profileId || !appId) return []
        return API.MOCHI_PAY.get(
          GET_PATHS.GET_APPLICATION_DETAIL_MEMBERS(profileId, appId),
        ).json((r) => r ?? [])
      },
    )

  return {
    data: data?.data,
    pagination: data?.pagination,
    ...rest,
  }
}
