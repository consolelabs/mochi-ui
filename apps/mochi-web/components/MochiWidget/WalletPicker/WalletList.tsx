import { List } from '@consolelabs/ui-components'
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
      renderItem={(item) => <WalletItem item={item} onSelect={onSelect} />}
    />
  )
}
