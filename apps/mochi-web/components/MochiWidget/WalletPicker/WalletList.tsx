import { List } from '@consolelabs/core'
import { Wallet } from '~store'
import { WalletItem } from './WalletItem'

interface Props {
  data: Wallet[]
  onSelect?: (item: Wallet) => void
}

export const WalletList = (props: Props) => {
  const { data, onSelect } = props
  return (
    <List
      rootClassName="w-full"
      data={data}
      renderItem={(item) => (
        <WalletItem
          key={`wallet-item-${item.wallet.id}`}
          item={item}
          onSelect={onSelect}
        />
      )}
    />
  )
}
