import React from 'react'
import { Icon } from '@iconify/react'
import TemplateComp, { type TemplateProps } from './Template'

interface Props {
  template?: TemplateProps
  platformIcon?: string
  senderAvatar: string
}

export default function Header({
  senderAvatar,
  platformIcon,
  template,
}: Props) {
  return template ? (
    <TemplateComp
      {...template}
      platformIcon={platformIcon}
      avatar={senderAvatar}
    />
  ) : (
    <>
      <div
        className="w-1/2 -translate-x-1/2"
        style={{
          display: 'flex',
          top: 10,
          left: '50%',
          position: 'absolute',
          height: 200,
          background:
            'linear-gradient(0deg, #f4c4c2 0%, #eec3fd 48.96%, #8fc6e4 100%)',
          filter: 'blur(60px)',
          opacity: 0.7,
        }}
      />
      <Icon
        icon="solar:gift-linear"
        className="relative mt-3 w-full h-24 text-gray-700 drop-shadow-2xl"
      />
    </>
  )
}
