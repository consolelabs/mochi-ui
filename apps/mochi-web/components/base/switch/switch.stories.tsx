import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Switch from './switch'

const meta: Meta<typeof Switch> = {
  title: 'Example/Switch',
  component: Switch,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    label: {
      type: 'string',
      control: 'text',
    },
    checked: {
      type: 'boolean',
    },
    onChange: {
      type: 'function',
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

function SwitchDefault() {
  const [value, setValue] = useState(false)

  return (
    <Switch
      checked={value}
      onChange={(v) => {
        console.log('Switch changed', v)
        setValue(v)
      }}
    />
  )
}

function SwitchLabel() {
  const [value, setValue] = useState(false)

  return (
    <Switch
      label=""
      checked={value}
      onChange={(v) => {
        console.log('Switch changed', v)
        setValue(v)
      }}
    />
  )
}

export const Default: Story = {
  render: SwitchDefault,
}

export const Label: Story = {
  render: SwitchLabel,
}
