import useSWR from 'swr'
import { API } from '~constants/api'

export function useSolPrice() {
  const { data } = useSWR(['sol-price'], async () => {
    const data = await API.MOCHI_PAY.get('/999/tokens/sol').json((r) => r.data)
    return data.price ?? 0
  })

  return data
}
