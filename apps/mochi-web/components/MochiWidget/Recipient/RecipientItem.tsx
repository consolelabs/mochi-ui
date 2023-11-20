import { useDisclosure } from '@dwarvesf/react-hooks'
import clsx from 'clsx'
import { Avatar, Heading } from '@consolelabs/core'
import { Profile } from '@consolelabs/mochi-rest'
import { IconCheck, IconClose } from '@consolelabs/icons'
import PlatformIcon from '../PlatformPicker/PlatformIcon'

type CheckIconProps = {
  isHovering: boolean
  isSelected: boolean
}

const CheckIcon: React.FC<CheckIconProps> = ({ isSelected, isHovering }) => {
  return (isSelected && !isHovering) || (!isSelected && isHovering) ? (
    <IconCheck className="p-1 w-6 h-6 text-primary-700" />
  ) : (
    <IconClose className="w-6 h-6 text-xl text-red-700" />
  )
}

interface ItemProps {
  profile: Profile
  isSelected?: boolean
  active: boolean
}

export const RecipientItem: React.FC<ItemProps> = ({
  profile,
  isSelected = false,
  active,
}) => {
  const { avatar, associated_accounts } = profile
  const account = associated_accounts?.[0]
  const {
    isOpen: isHovering,
    onOpen: setIsHovering,
    onClose: setIsNotHovering,
  } = useDisclosure()

  return (
    <div
      className={clsx(
        'group flex flex-row items-center w-full min-w-[230px] p-2 rounded-lg space-x-2 cursor-pointer',
        {
          'bg-neutral-100': active,
          'hover:bg-neutral-100': !active || !isSelected,
        },
      )}
      onMouseEnter={setIsHovering}
      onMouseLeave={setIsNotHovering}
    >
      <Avatar src={avatar || '/logo.png'} size="sm" />
      <div className="flex flex-col flex-1">
        <Heading as="h3" className="text-sm font-medium">
          {account?.platform_metadata.username}
        </Heading>
      </div>
      {isSelected || isHovering || active ? (
        <CheckIcon isSelected={isSelected} isHovering={isHovering || active} />
      ) : (
        <PlatformIcon
          className="p-1 w-6 h-6 text-neutral-500"
          platform={account?.platform ?? ''}
          compact
        />
      )}
    </div>
  )
}
