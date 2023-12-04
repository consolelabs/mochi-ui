import { List } from '@mochi-ui/core'
import { Wallet } from '~store'
import { WalletItem } from './WalletItem'
import Skeleton from '../Tip/Skeleton'

interface Props {
  loading: boolean
  data: Wallet[]
  onSelect?: (item: Wallet) => void
}

export const WalletList = (props: Props) => {
  const { data, onSelect } = props

  return (
    <List
      rootClassName="w-full"
      loading={props.loading}
      data={data}
      renderLoader={() => <Skeleton />}
      renderItem={(item, i) => (
        <WalletItem key={`wallet-item-${i}`} item={item} onSelect={onSelect} />
      )}
    />
  )
}
