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
