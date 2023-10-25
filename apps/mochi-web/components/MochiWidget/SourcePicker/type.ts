// TODO: replace it with Mochi Types
import { ModelChain } from 'types/mochi-schema'

export type SourceType = {
  id: string
  platform: string
  platform_icon: string
  profile_id: string
  total_amount: string
  token_amount?: string
  chain?: ModelChain
}
