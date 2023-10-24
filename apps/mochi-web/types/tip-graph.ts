import { Profile } from '@consolelabs/mochi-rest'
import UI from '@consolelabs/mochi-ui'
import { NodeObject } from 'react-force-graph-2d'

export type ProfileNode = {
  id: string
  profile: Profile
  parsedProfile?: ReturnType<typeof UI.render>[0]
  totalVolume: number
  neighborIds: Set<Profile['id']>
  volumeRank?: number
  volumePercent?: number
}

export type SelectedProfileNode = NodeObject & ProfileNode

export type TipNetworkData = {
  targetProfile?: ProfileNode
  spendVolume: number
  receiveVolume: number
  totalVolume: number
}
