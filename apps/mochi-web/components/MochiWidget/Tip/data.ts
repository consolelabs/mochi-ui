import {
  appreciation,
  mochiSnowman,
  mochiWelcome,
  mochiQilin,
} from 'utils/image'

export type Theme = {
  id: number
  group: string
  src: string
}
export const ThemeList: Theme[] = [
  {
    id: 1,
    group: 'New Year',
    src: appreciation.src,
  },
  {
    id: 2,
    group: 'New Year',
    src: mochiSnowman.src,
  },
  {
    id: 3,
    group: 'New Year',
    src: mochiWelcome.src,
  },
  {
    id: 4,
    group: 'New Year',
    src: mochiQilin.src,
  },
  {
    id: 5,
    group: 'Christmas',
    src: '',
  },
  {
    id: 6,
    group: 'Birthday',
    src: '',
  },
  {
    id: 7,
    group: 'Valentine',
    src: '',
  },
  {
    id: 8,
    group: 'Anniversary',
    src: '',
  },
]

export type Message = {
  id: number
  group: string
  content: string
}
export const MessageList: Message[] = [
  {
    id: 1,
    content: '☕️ Coffee treat for you',
    group: 'eat & drink',
  },
  {
    id: 2,
    content: '🍕 Pizza on me tonight!',
    group: 'eat & drink',
  },
  {
    id: 3,
    content: '🍦 Icecream treat for you!',
    group: 'eat & drink',
  },
  {
    id: 4,
    content: '🌲 Festive cheer your way!',
    group: 'holiday',
  },
  {
    id: 5,
    content: '🐰 Bunny-sent joy!',
    group: 'holiday',
  },
  {
    id: 6,
    content: '💘 Sending love!',
    group: 'valentine',
  },
  {
    id: 7,
    content: '🎈 Happy trip around the sun!',
    group: 'birthday',
  },
  {
    id: 8,
    content: '🎁 Birthday wishes & treats',
    group: 'birthday',
  },
  {
    id: 9,
    content: '🏆 Cheers to your win!',
    group: 'achievement',
  },
  {
    id: 10,
    content: '🌟 Kudos on your milestone!',
    group: 'achievement',
  },
  {
    id: 11,
    content: '💵 Debt settled. Thank you!',
    group: 'paying debt',
  },
  {
    id: 12,
    content: '⚖️  Balancing our scales',
    group: 'paying debt',
  },
]
