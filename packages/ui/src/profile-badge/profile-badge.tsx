import React from 'react'
import { Avatar } from '../avatar'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  avatar: string
  platform: string
  name: string
}

export default function ProfileBadge({
  name,
  avatar,
  platform,
  ...rest
}: Props) {
  return (
    <button
      className="ui-flex ui-gap-x-2 ui-items-center ui-p-1 ui-pr-2 ui-bg-white ui-rounded-lg ui-border ui-transition ui-border-neutral-300 hover:ui-bg-neutral-100"
      type="button"
      {...rest}
    >
      <Avatar size="sm" smallSrc={platform} src={avatar} />
      <span className="ui-text-sm ui-font-medium ui-text-neutral-800">
        {name}
      </span>
    </button>
  )
}
