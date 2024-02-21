import { useDisclosure } from '@dwarvesf/react-hooks'
import clsx from 'clsx'
import { Avatar } from '@mochi-ui/core'
import { CheckLine, CloseLine } from '@mochi-ui/icons'
import PlatformIcon from '../PlatformPicker/PlatformIcon'

type CheckIconProps = {
  isHovering: boolean
  isSelected: boolean
}

const CheckIcon: React.FC<CheckIconProps> = ({ isSelected, isHovering }) => {
  return (isSelected && !isHovering) || (!isSelected && isHovering) ? (
    <CheckLine className="p-1 w-6 h-6 text-primary-plain-fg" />
  ) : (
    <CloseLine className="w-6 h-6 text-xl text-danger-plain-fg" />
  )
}

interface ItemProps {
  avatar: string
  profileName?: string
  platform?: string
  isSelected?: boolean
  active: boolean
}

export const RecipientItem: React.FC<ItemProps> = ({
  avatar,
  profileName,
  platform,
  isSelected = false,
  active,
}) => {
  const {
    isOpen: isHovering,
    onOpen: setIsHovering,
    onClose: setIsNotHovering,
  } = useDisclosure()

  const right: React.ReactNode =
    isSelected || isHovering || active ? (
      <CheckIcon isSelected={isSelected} isHovering={isHovering || active} />
    ) : (
      <PlatformIcon
        className="p-1 w-6 h-6 text-text-icon-secondary"
        platform={platform ?? ''}
        compact
      />
    )

  return (
    <div
      className={clsx(
        'group flex flex-row items-center w-full min-w-[230px] p-2 rounded-lg space-x-2 cursor-pointer',
        {
          'bg-background-level2': active,
          'hover:bg-background-level2': !active || !isSelected,
        },
      )}
      onMouseEnter={setIsHovering}
      onMouseLeave={setIsNotHovering}
    >
      <Avatar src={avatar} fallback={profileName} size="sm" />
      <div className="flex flex-col flex-1">
        <h3 className="text-sm font-medium">{profileName}</h3>
      </div>
      {right}
    </div>
  )
}
