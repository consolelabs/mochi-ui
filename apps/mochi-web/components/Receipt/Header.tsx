import React, { SVGProps } from 'react'
import { TipSolid } from '@mochi-ui/icons'
import TemplateComp, { type TemplateProps } from './Template'
import PayRequestHeader from '../PayRequest/Header'

interface Props {
  template?: TemplateProps
  platformIcon?: string
  senderAvatar: string
  code: string
  title?: string
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

export default function Header({
  senderAvatar,
  platformIcon,
  template,
  code,
  title = 'Tip',
  icon = TipSolid,
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
      title={title}
      url={`/tx/${code}`}
      Icon={icon}
    />
  )
}
