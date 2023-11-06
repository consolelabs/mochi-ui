import React, { forwardRef } from 'react'
import { Avatar } from '../avatar'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  avatar: string
  platform: string
  name: string
}

export const ProfileBadge = forwardRef<HTMLButtonElement, Props>(
  ({ name, avatar, platform, ...rest }, ref) => (
    <button
      className="flex gap-x-2 items-center p-1 pr-2 bg-white rounded-lg border transition border-neutral-300 hover:bg-neutral-100"
      style={{ maxWidth: 200 }}
      type="button"
      ref={ref}
      {...rest}
    >
      <div className="shrink-0">
        <Avatar fallback={name} size="sm" smallSrc={platform} src={avatar} />
      </div>
      <span className="text-sm font-medium whitespace-nowrap truncate text-neutral-800">
        {name}
      </span>
    </button>
  ),
)

export default ProfileBadge
