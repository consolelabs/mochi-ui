import { Avatar } from '@consolelabs/ui-components'
import Image from 'next/image'
import { hpbd, appreciation, achievement, wedding } from '~utils/image'

export type TemplateName =
  | 'happy_birthday'
  | 'appreciation'
  | 'achievement'
  | 'anniversary'

type TemplateType = { img: string; phrase: string; title: string }

export const templates: Record<TemplateName, TemplateType> = {
  happy_birthday: {
    phrase: 'sent a birthday gift',
    img: hpbd.src,
    title: 'Happy Birthday ⎯ Tip from <user> ⎯ Mochi',
  },
  appreciation: {
    phrase: 'sent a thank you gift',
    img: appreciation.src,
    title: 'Thank You ⎯ Tip from <user> ⎯ Mochi',
  },
  achievement: {
    phrase: 'sent a gift to celebrate the achievement',
    img: achievement.src,
    title: 'Celebrate Achievement ⎯ Tip from <user> ⎯ Mochi',
  },
  anniversary: {
    phrase: 'sent an anniversary gift',
    img: wedding.src,
    title: 'Happy Anniversary ⎯ Tip from <user> ⎯ Mochi',
  },
}

export default function Template({
  title,
  img,
  avatar,
  platformIcon,
}: TemplateType & { platformIcon?: string; avatar: string }) {
  return (
    <div className="relative w-full bg-inherit h-[200px]">
      <Image
        src={img}
        fill
        className="object-cover object-bottom"
        alt={title}
      />
      <div className="absolute bottom-0 left-1/2 p-1 rounded-full -translate-x-1/2 translate-y-1/2 bg-inherit">
        <Avatar size="xl" src={avatar} smallSrc={platformIcon} />
      </div>
    </div>
  )
}
