import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from '@consolelabs/heading'
import SectionList from './section-list'

const meta: Meta<typeof SectionList> = {
  title: 'ui/SectionList',
  component: SectionList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

interface DataType {
  id: number
  icon: string
  message: string
}

interface SectionType {
  title: string
  data: DataType[]
}

type Story = StoryObj<typeof SectionList<DataType, SectionType>>

const eatNDrink: DataType[] = [
  {
    id: 1,
    icon: '☕',
    message: 'Coffee treat for you',
  },
  {
    id: 2,
    icon: '🍕',
    message: 'Pizza on me tonight!',
  },
  {
    id: 3,
    icon: '🍦',
    message: 'Ice cream treat for you!',
  },
]

const holiday: DataType[] = [
  {
    id: 1,
    icon: '🎄',
    message: 'Festive cheer your way!',
  },
  {
    id: 2,
    icon: '🐰',
    message: 'Bunny-sent joy! ',
  },
]

const valentine: DataType[] = [
  {
    id: 1,
    icon: '💕',
    message: 'Sending love!',
  },
]

const birthday: DataType[] = [
  {
    id: 1,
    icon: '🎂',
    message: 'Happy birthday!',
  },
  {
    id: 2,
    icon: '🎈',
    message: 'Happy trip around the sun!',
  },
  {
    id: 3,
    icon: '🎁',
    message: 'Birthday wishes & treats',
  },
]

const sectionData: SectionType[] = [
  {
    title: 'EAT & DRINK',
    data: eatNDrink,
  },
  {
    title: 'HOLIDAY',
    data: holiday,
  },
  {
    title: 'VALENTINE',
    data: valentine,
  },
  {
    title: 'BIRTHDAY',
    data: birthday,
  },
]

function renderItem(item: DataType) {
  return (
    <li
      className="flex flex-row items-center w-full p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2"
      key={item.id}
    >
      <span className="text-sm w-6 h-6">{item.icon}</span>
      <div className="flex flex-col flex-1">
        <Heading as="h3" className="text-sm">
          {item.message}
        </Heading>
      </div>
    </li>
  )
}

function renderSectionHeader(section: SectionType, index?: number) {
  return (
    <div className="flex flex-row items-center w-full" key={index}>
      <Heading as="h2" className="text-xs font-bold text-[#A19F9E] uppercase">
        {section.title}
      </Heading>
    </div>
  )
}

export const Default: Story = {
  args: {
    rootClassName: 'h-[300px] w-[412px] shadow-sm p-2 rounded-lg',
    sections: sectionData,
    renderItem,
    renderSectionHeader,
  },
}

export const SectionEmpty: Story = {
  args: {
    rootClassName: 'h-[300px] w-[412px] shadow-sm p-2 rounded-lg',
    sections: [],
    renderItem,
    SectionEmpty: (
      <div className="w-full h-full flex items-center justify-center">
        No data
      </div>
    ),
  },
}
