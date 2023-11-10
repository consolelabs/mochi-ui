import React, { forwardRef } from 'react'
import { Avatar } from '@consolelabs/avatar'
import { profileBadge } from '@consolelabs/theme'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  avatar: string
  platform: string
  name: string
}

const {
  profileBadgeClsx,
  profileBadgeAvatarWrapperClsx,
  profileBadgeNameClsx,
} = profileBadge

export const ProfileBadge = forwardRef<HTMLButtonElement, Props>(
  ({ name, avatar, platform, ...rest }, ref) => (
    <button
      className={profileBadgeClsx()}
      style={{ minWidth: 150, maxWidth: 200 }}
      type="button"
      ref={ref}
      {...rest}
    >
      <div className={profileBadgeAvatarWrapperClsx()}>
        <Avatar fallback={name} size="sm" smallSrc={platform} src={avatar} />
      </div>
      <span className={profileBadgeNameClsx()}>{name}</span>
    </button>
  ),
)

export default ProfileBadge
