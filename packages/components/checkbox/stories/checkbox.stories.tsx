import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox, CheckedState } from '../src/checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'ui/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta

export const Default: StoryObj<typeof Checkbox> = {
  render(props) {
    return (
      <div className="flex gap-4">
        <Checkbox {...props} defaultChecked={false} />
        <Checkbox {...props} defaultChecked />
        <Checkbox {...props} defaultChecked="indeterminate" />
      </div>
    )
  },
}

export const SizeLg: StoryObj<typeof Checkbox> = {
  render() {
    return (
      <div className="flex gap-4">
        <Checkbox size="lg" defaultChecked={false} />
        <Checkbox size="lg" defaultChecked />
        <Checkbox size="lg" defaultChecked="indeterminate" />
      </div>
    )
  },
}

export const WithControll: StoryObj<typeof Checkbox> = {
  render: function Render() {
    const [isChecked, setIsChecked] = useState<CheckedState>(false)
    return (
      <div className="flex gap-4">
        <Checkbox checked={isChecked} onChange={setIsChecked} />
      </div>
    )
  },
}
