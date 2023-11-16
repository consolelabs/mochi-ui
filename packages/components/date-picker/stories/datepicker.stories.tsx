import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DatePicker, DateRange } from '../src'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: function render() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<Date>()

    return (
      <div>
        <span className=" text-xs">{JSON.stringify(date)}</span>
        <DatePicker mode="single" selected={date} onSelect={setDate} />
      </div>
    )
  },
}

export const AlignCenter: Story = {
  render: function render() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<Date>()
    return (
      <div>
        <span className=" text-xs">{JSON.stringify(date)}</span>
        <DatePicker
          mode="single"
          selected={date}
          onSelect={setDate}
          alignCaptionCenter
        />
      </div>
    )
  },
}

export const DropdownCaption: Story = {
  render: function render() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<Date>()
    return (
      <div>
        <span className=" text-xs">{JSON.stringify(date)}</span>
        <DatePicker
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
          fromDate={new Date('1/1/2023')}
          toDate={new Date('1/10/2023')}
        />
      </div>
    )
  },
}

export const RangeSelector: Story = {
  render: function render() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<DateRange>()
    return (
      <div>
        <span className=" text-xs">{JSON.stringify(date)}</span>
        <DatePicker
          mode="range"
          min={2}
          max={30}
          selected={date}
          onSelect={setDate}
        />
      </div>
    )
  },
}

export const MultipleMode: Story = {
  render: function render() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<Date[]>()
    return (
      <div>
        <span className=" text-xs">{JSON.stringify(date)}</span>
        <DatePicker
          mode="multiple"
          selected={date}
          onSelect={setDate}
          alignCaptionCenter
        />
      </div>
    )
  },
}
