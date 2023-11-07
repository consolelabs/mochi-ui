import type { Meta, StoryObj } from '@storybook/react'
import { IconPhantomWallet } from '@consolelabs/icons'
import InputField from './input-field'

const meta: Meta<typeof InputField> = {
  title: 'ui/InputField',
  component: InputField,
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
    size: {
      control: 'select',
      options: ['base', 'large'],
    },
    helperText: {
      type: 'string',
      control: 'text',
    },
    startAdornment: {
      type: 'string',
      control: 'text',
    },
    endAdornment: {
      type: 'string',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof InputField>

export const Default: Story = {
  args: {},
}

export function Size() {
  return (
    <div className="space-y-4">
      <InputField label="Email" />
      <InputField label="Email" size="large" />
    </div>
  )
}

export function HelperText() {
  return (
    <div className="space-y-4">
      <InputField
        helperText="This is helper text"
        label="Email"
        placeholder="Placeholder"
      />
      <InputField
        disabled
        helperText="This is helper text"
        label="Email"
        placeholder="Placeholder"
      />
      <InputField
        error
        helperText="This is helper text"
        label="Email"
        placeholder="Placeholder"
      />
    </div>
  )
}

export function Adornment() {
  return (
    <div className="space-y-4">
      <InputField
        label="Amount"
        startAdornment={
          <div className="pl-2">
            <IconPhantomWallet height={20} width={20} />
          </div>
        }
      />
      <InputField
        endAdornment={<div className="pr-2">SOL</div>}
        label="Amount"
      />
      <InputField
        endAdornment={<div className="pr-2">SOL</div>}
        label="Amount"
        startAdornment={
          <div className="pl-2">
            <IconPhantomWallet height={20} width={20} />
          </div>
        }
      />
    </div>
  )
}
