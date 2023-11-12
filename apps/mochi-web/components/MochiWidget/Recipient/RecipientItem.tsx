import { Avatar, Heading } from '@consolelabs/ui-components'
import { ViewAssociatedAccount } from '~types/mochi-profile-schema'
import { truncateWallet } from '~utils/string'
import PlatformIcon from '../PlatformPicker/PlatformIcon'

interface ItemProps {
  account: ViewAssociatedAccount
  avatar?: string
  onSelect?: (item: ViewAssociatedAccount) => void
}

export const RecipientItem: React.FC<ItemProps> = ({
  account,
  avatar,
  onSelect,
}) => (
  <li
    className="flex flex-row items-center w-full min-w-[230px] p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
    key={account.id}
    role="presentation"
    onClick={() => onSelect?.(account)}
  >
    <Avatar src={avatar || '/logo.png'} size="sm" />
    <div className="flex flex-col flex-1">
      <Heading as="h3" className="text-sm font-medium">
        {account.platform_metadata.username}
      </Heading>
      <span className="text-xs text-[#848281] capitalize font-medium">
        {account.platform} • {truncateWallet(account.platform_identifier)}
      </span>
    </div>
    <PlatformIcon
      className="text-neutral-500"
      platform={account.platform ?? ''}
      compact
    />
  </li>
)
