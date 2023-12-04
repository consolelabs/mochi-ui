import React, { forwardRef } from 'react'
import { Avatar } from '@mochi-ui/avatar'
import { profileBadge } from '@mochi-ui/theme'

type ProfileBadgeProps = React.HTMLAttributes<HTMLButtonElement> & {
  avatar: string
  platform: string
  name: string
}

const {
  profileBadgeClsx,
  profileBadgeAvatarWrapperClsx,
  profileBadgeNameClsx,
} = profileBadge

export const ProfileBadge = forwardRef<HTMLButtonElement, ProfileBadgeProps>(
  ({ name, avatar, platform, className, ...rest }, ref) => (
    <button
      className={profileBadgeClsx({ className })}
      style={{ maxWidth: 200 }}
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
export { type ProfileBadgeProps }
