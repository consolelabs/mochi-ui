import { IconButton, Avatar } from '@consolelabs/core'
import { Profile } from '@consolelabs/mochi-rest'
import { CloseLine } from '@consolelabs/icons'
import PlatformIcon from '../PlatformPicker/PlatformIcon'

interface SelectedRecipientProps {
  profile: Profile
  onRemove?: (item: Profile) => void
}

export const SelectedRecipient: React.FC<SelectedRecipientProps> = ({
  profile,
  onRemove,
}) => (
  <li
    className="flex flex-col gap-1 items-center w-[56px]"
    key={profile.id}
    role="presentation"
  >
    <div className="relative w-full">
      <div className="overflow-hidden rounded-full border-white w-[56px] h-[56px] border-[2.5px]">
        <Avatar src={profile.avatar || '/logo.png'} size="sm" />
      </div>
      <IconButton
        style={{
          width: 15,
          height: 15,
          padding: 0,
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        variant="solid"
        color="info"
        onClick={() => onRemove?.(profile)}
      >
        <CloseLine />
      </IconButton>
      <PlatformIcon
        className="absolute bottom-0 left-0 w-4 h-4"
        platform={profile.associated_accounts?.[0].platform ?? ''}
      />
    </div>
    <span className="text-xs font-medium text-center w-[56px] truncate">
      {profile.associated_accounts?.[0].platform_metadata.username}
    </span>
  </li>
)
