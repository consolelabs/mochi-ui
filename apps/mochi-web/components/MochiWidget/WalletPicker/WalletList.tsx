import { List } from '@consolelabs/ui-components'
import { ModelInAppWallet } from '~types/mochi-pay-schema'
import { WalletItem } from './WalletItem'

interface Props {
  data: ModelInAppWallet[]
  onSelect?: (item: ModelInAppWallet) => void
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
