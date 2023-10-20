import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from '../heading'
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
    <div
      className="ui-flex ui-flex-row ui-items-center ui-w-full ui-p-2 hover:ui-bg-[#FAF9F7] ui-rounded-lg ui-space-x-2"
      key={item.id}
    >
      <span className="ui-text-sm ui-w-6 ui-h-6">{item.icon}</span>
      <div className="ui-flex ui-flex-col ui-flex-1">
        <Heading as="h3" className="ui-text-sm">
          {item.message}
        </Heading>
      </div>
    </div>
  )
}

function renderSectionHeader(section: SectionType, index?: number) {
  return (
    <div className="ui-flex ui-flex-row ui-items-center ui-w-full" key={index}>
      <Heading
        as="h2"
        className="ui-text-xs ui-font-bold ui-text-[#A19F9E] ui-uppercase"
      >
        {section.title}
      </Heading>
    </div>
  )
}

export const Default: Story = {
  args: {
    rootClassName:
      'ui-h-[300px] ui-w-[412px] ui-shadow-sm ui-p-2 ui-rounded-lg',
    sections: sectionData,
    renderItem,
    renderSectionHeader,
  },
}

export const SectionEmpty: Story = {
  args: {
    rootClassName:
      'ui-h-[300px] ui-w-[412px] ui-shadow-sm ui-p-2 ui-rounded-lg',
    sections: [],
    renderItem,
    SectionEmpty: (
      <div className="ui-w-full ui-h-full ui-flex ui-items-center ui-justify-center">
        No data
      </div>
    ),
  },
}
