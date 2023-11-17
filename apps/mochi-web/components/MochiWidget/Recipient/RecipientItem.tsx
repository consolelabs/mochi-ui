import { Avatar, Heading } from '@consolelabs/core'
import { Profile } from '@consolelabs/mochi-rest'
import { truncateWallet } from '~utils/string'
import { IconCheck, IconClose } from '@consolelabs/icons'
import { MouseEventHandler, useState } from 'react'
import PlatformIcon from '../PlatformPicker/PlatformIcon'

type CheckIconProps = {
  onRemoveClick?: MouseEventHandler<SVGSVGElement>
}

const CheckIcon: React.FC<CheckIconProps> = ({ onRemoveClick }) => {
  const [isHovering, setIsHovering] = useState(false)

  function handleRemoveClick(event: React.MouseEvent<SVGSVGElement>) {
    event.stopPropagation()
    onRemoveClick?.(event)
  }
  return isHovering ? (
    <IconClose
      className="text-red-700 text-xl"
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleRemoveClick}
    />
  ) : (
    <IconCheck
      className="text-primary-700"
      onMouseEnter={() => setIsHovering(true)}
    />
  )
}

interface ItemProps {
  profile: Profile
  isSelected?: boolean
  onSelect?: (item: Profile) => void
  onRemove?: (item: Profile) => void
}

export const RecipientItem: React.FC<ItemProps> = ({
  profile,
  isSelected,
  onSelect,
  onRemove,
}) => {
  const { id, avatar, associated_accounts } = profile
  const account = associated_accounts?.[0]

  return (
    <li
      className="flex flex-row items-center w-full min-w-[230px] p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
      key={id}
      role="presentation"
      onClick={() => onSelect?.(profile)}
    >
      <Avatar src={avatar || '/logo.png'} size="sm" />
      <div className="flex flex-col flex-1">
        <Heading as="h3" className="text-sm font-medium">
          {account?.platform_metadata.username}
        </Heading>
        <span className="text-xs text-[#848281] capitalize font-medium">
          {account?.platform} • {truncateWallet(account?.platform_identifier)}
        </span>
      </div>
      {isSelected ? (
        <CheckIcon onRemoveClick={() => onRemove?.(profile)} />
      ) : (
        <PlatformIcon
          className="text-neutral-500"
          platform={account?.platform ?? ''}
          compact
        />
      )}
    </li>
  )
}
