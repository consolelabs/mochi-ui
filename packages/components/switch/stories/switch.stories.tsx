import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Switch from '../src/Switch'

const meta: Meta<typeof Switch> = {
  title: 'components/Switch',
  component: Switch,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    checked: {
      type: 'boolean',
    },
    size: {
      type: 'string',
      control: 'select',
      options: ['sm', 'md'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

function Controlled() {
  const [checked, setChecked] = useState(false)

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2">
      <span className="text-sm">Default</span>
      <span className="text-sm">Disabled</span>
      <Switch checked={checked} onChange={setChecked} />
      <Switch checked disabled />
      <Switch checked={checked} onChange={setChecked} size="md" />
      <Switch checked disabled size="md" />
    </div>
  )
}

export const Default: Story = {
  render: () => <Controlled />,
}
