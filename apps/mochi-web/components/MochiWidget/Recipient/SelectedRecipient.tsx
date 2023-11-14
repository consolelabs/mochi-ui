import { Avatar } from '@consolelabs/ui-components'
import { IconButton } from '@consolelabs/core'
import { ViewProfile } from '~types/mochi-profile-schema'
import { IconClose } from '@consolelabs/icons'
import PlatformIcon from '../PlatformPicker/PlatformIcon'

interface SelectedRecipientProps {
  profile: ViewProfile
  onRemove?: (item: ViewProfile) => void
}

export const SelectedRecipient: React.FC<SelectedRecipientProps> = ({
  profile,
  onRemove,
}) => (
  <li
    className="flex flex-col items-center w-[56px] gap-1"
    key={profile.id}
    role="presentation"
  >
    <div className="relative w-full">
      <div className="w-[56px] h-[56px] overflow-hidden rounded-full border-[2.5px] border-white">
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
        <IconClose />
      </IconButton>
      <PlatformIcon
        className="absolute bottom-0 left-0 w-4 h-4"
        platform={profile.associated_accounts?.[0].platform ?? ''}
      />
    </div>
    <span className="text-sm text-center w-[56px] overflow-ellipsis overflow-auto font-medium">
      {profile.associated_accounts?.[0].platform_metadata.username}
    </span>
  </li>
)
