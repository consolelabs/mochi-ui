import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ViewApplicationWebhookLogsResponse } from '~types/mochi-pay-schema'

export const SWR_KEY_FETCH_APPLICATION_DETAIL_WEBHOOK_LOGS =
  'SWR_KEY_FETCH_APPLICATION_DETAIL_WEBHOOK_LOGS'

export const useFetchApplicationDetailWebhookLogs = (
  profileId?: string,
  appId?: string,
) => {
  const { data, ...rest } = useSWR<ViewApplicationWebhookLogsResponse>(
    [SWR_KEY_FETCH_APPLICATION_DETAIL_WEBHOOK_LOGS, profileId, appId],
    async ([_, profileId, appId]: [any, string, string]) => {
      if (!profileId || !appId) return []
      return API.MOCHI_PAY.get(
        GET_PATHS.GET_APPLICATION_DETAIL_WEBHOOK_LOGS(profileId, appId),
      ).json((r) => r ?? [])
    },
  )

  return {
    data: data?.data,
    ...rest,
  }
}
