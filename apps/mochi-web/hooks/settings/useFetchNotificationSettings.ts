import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ResponseUserNotificationSettingResponse } from '~types/mochi-schema'

export const NOTIFICATION_SETTING_KEY = 'NOTIFICATION_SETTING_KEY'

export const useFetchNotificationSettings = (id?: string) => {
  const { data, ...rest } = useSWR<ResponseUserNotificationSettingResponse>(
    id ? [NOTIFICATION_SETTING_KEY, id] : null,
    async () =>
      API.MOCHI.get(GET_PATHS.PROFILE_SETTING_NOTIFICATION(id as string)).json(
        (r) => r,
      ),
  )
  return {
    settings: data?.data,
    ...rest,
  }
}
