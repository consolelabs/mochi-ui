import useSWR from 'swr'
import { API } from '~constants/api'

export function useDefaultMessage(profileId?: string) {
  const { data } = useSWR(
    ['tip-default-message', profileId],
    async ([_, profileId]) => {
      if (!profileId) return ''
      return API.MOCHI.get(
        `/profiles/${profileId}/settings/tip/default-message`,
      )
        .notFound(() => '')
        .json((r) => r.data.message)
    },
  )

  return data
}
