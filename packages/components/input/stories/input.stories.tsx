import {
  IconDiscordColored,
  IconPasswordLockColored,
  IconSlack,
} from '@consolelabs/icons'
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '@consolelabs/avatar'
import Input from '../src/input'

const meta: Meta<typeof Input.InputField> = {
  title: 'Components/Input',
  component: Input.InputField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'lg'],
    },
    error: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {},
}

export function Size() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input.InputField placeholder="Default" />

      <Input.InputField placeholder="Large size" size="lg" />
    </div>
  )
}

export function Disabled() {
  return <Input.InputField placeholder="Search the docs…" disabled />
}

export function Error() {
  return <Input.InputField placeholder="Search the docs…" error />
}

export function Slot() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input.Root>
        <Input.Slot>
          <Avatar
            size="xs"
            smallSrc="https://cdn.discordapp.com/emojis/1093923016691421205.png?size=240&quality=lossless"
            src="https://mochi.gg/logo.png"
          />
        </Input.Slot>
        <Input.InputField placeholder="Search the docs…" />
      </Input.Root>

      <Input.Root size="lg">
        <Input.Slot>
          <IconDiscordColored />
        </Input.Slot>
        <Input.InputField placeholder="Search the docs…" />
      </Input.Root>

      <Input.Root disabled>
        <Input.Slot>
          <IconSlack />
        </Input.Slot>
        <Input.InputField placeholder="Search the docs…" />
      </Input.Root>

      <Input.Root error>
        <Input.InputField placeholder="Search the docs…" />
        <Input.Slot>
          <IconPasswordLockColored />
        </Input.Slot>
      </Input.Root>
    </div>
  )
}
