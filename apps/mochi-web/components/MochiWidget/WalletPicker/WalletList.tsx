import { List } from '@consolelabs/core'
import { Wallet } from '~store'
import { WalletItem } from './WalletItem'
import Skeleton from './Skeleton'

interface Props {
  loading: boolean
  data: Wallet[]
  onSelect?: (item: Wallet) => void
}

export const WalletList = (props: Props) => {
  const { data, onSelect } = props

  return (
    <List
      viewportClassName="max-h-[400px]"
      rootClassName="w-full"
      data={props.loading ? [{ wallet: {} }] : data}
      renderItem={(item) =>
        props.loading ? (
          <Skeleton />
        ) : (
          <WalletItem
            key={`wallet-item-${item.wallet.id}`}
            item={item}
            onSelect={onSelect}
          />
        )
      }
    />
  )
}
