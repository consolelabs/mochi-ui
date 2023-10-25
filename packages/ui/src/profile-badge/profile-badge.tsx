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
      className="ui-flex ui-gap-x-2 ui-items-center ui-p-1 ui-pr-2 ui-bg-white ui-rounded-lg ui-border ui-transition ui-border-neutral-300 hover:ui-bg-neutral-100"
      style={{ minWidth: 150, maxWidth: 200 }}
      type="button"
      ref={ref}
      {...rest}
    >
      <div className="ui-shrink-0">
        <Avatar fallback={name} size="sm" smallSrc={platform} src={avatar} />
      </div>
      <span className="ui-whitespace-nowrap ui-truncate ui-text-sm ui-font-medium ui-text-neutral-800">
        {name}
      </span>
    </button>
  ),
)

export default ProfileBadge
