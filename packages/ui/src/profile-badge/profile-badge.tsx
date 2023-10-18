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
      className="flex gap-x-2 items-center p-1 pr-2 bg-white rounded-lg border transition border-neutral-300 hover:bg-neutral-100"
      type="button"
      {...rest}
    >
      <Avatar size="sm" smallSrc={platform} src={avatar} />
      <span className="text-sm font-medium text-neutral-800">{name}</span>
    </button>
  )
}
