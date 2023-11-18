import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { DayPicker } from '../src'
import { DayRangePickerWithInput } from '../src/day-range-picker-with-input/day-range-picker-with-input'

const meta: Meta<typeof DayPicker> = {
  title: 'Components/DayPicker',
  component: DayPicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DayPicker>

export const Default: Story = {
  render: function render() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<Date>()
    return (
      <div>
        <span className=" text-xs">{JSON.stringify(date)}</span>
        <DayPicker
          mode="single"
          selected={date}
          onSelect={setDate}
          alignCaptionCenter
        />
      </div>
    )
  },
}

export const WithInputRange: Story = {
  render: function render() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedRange, setSelectedRange] = useState<DateRange>()
    return (
      <div>
        <div className="flex flex-col text-xs mb-3">
          <button
            onClick={() => {
              setSelectedRange({
                from: new Date('1/1/2023'),
                to: new Date('2/1/2023'),
              })
            }}
          >
            Rest Range
          </button>
          <span>
            from: {selectedRange?.from && format(selectedRange.from, 'PP')}
          </span>
          <span>to: {selectedRange?.to && format(selectedRange.to, 'PP')}</span>
        </div>
        <DayRangePickerWithInput
          hasShadow
          selected={selectedRange}
          onSelect={setSelectedRange}
          inputProps={{
            placeholder: '1/1/2023',
          }}
        />
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
        <DayPicker selected={date} onSelect={setDate} alignCaptionCenter />
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
        <DayPicker
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
        <DayPicker
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
        <DayPicker
          mode="multiple"
          min={0}
          max={5}
          selected={date}
          onSelect={setDate}
          alignCaptionCenter
        />
      </div>
    )
  },
}
