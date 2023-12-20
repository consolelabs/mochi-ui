import React from 'react'
import { TipSolid } from '@mochi-ui/icons'
import TemplateComp, { type TemplateProps } from './Template'
import PayRequestHeader from '../PayRequest/Header'

interface Props {
  template?: TemplateProps
  platformIcon?: string
  senderAvatar: string
  code: string
}

export default function Header({
  senderAvatar,
  platformIcon,
  template,
  code,
}: Props) {
  return template ? (
    <TemplateComp
      {...template}
      platformIcon={platformIcon}
      avatar={senderAvatar}
    />
  ) : (
    <PayRequestHeader
      color="blue"
      title="Tip"
      url={`/tx/${code}`}
      Icon={TipSolid}
    />
  )
}
