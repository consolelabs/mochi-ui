import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Radio from './radio'

const meta: Meta<typeof Radio> = {
  title: 'Example/Radio',
  component: Radio,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    options: {
      type: 'array' as any,
      control: 'object',
    },
    onChange: {
      type: 'function',
    },
  },
}

export default meta
type Story = StoryObj<typeof Radio>

function RadioGroup() {
  const [value, setValue] = useState('1')

  return (
    <Radio
      value={value}
      onChange={(v) => {
        console.log('Radio changed', v)
        setValue(v)
      }}
      options={[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ]}
    />
  )
}

export const Default: Story = {
  render: RadioGroup,
}
