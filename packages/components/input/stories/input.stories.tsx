import { DiscordColored, PasswordLockColored, Slack } from '@consolelabs/icons'
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '@consolelabs/avatar'
import {
  TextFieldRoot,
  TextFieldInput,
  TextFieldDecorator,
} from '../src/textfield'

const meta: Meta<typeof TextFieldInput> = {
  title: 'Components/TextField',
  component: TextFieldInput,
  parameters: {
    layout: 'centered',
  },
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
type Story = StoryObj<typeof TextFieldInput>

export const Default: Story = {
  args: {},
}

export function Size() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextFieldInput id="username" placeholder="Default" />

      <TextFieldInput placeholder="Large size" size="lg" />
    </div>
  )
}

export function Disabled() {
  return <TextFieldInput placeholder="Search the docs…" disabled />
}

export function Error() {
  return <TextFieldInput placeholder="Search the docs…" error />
}

export function Slot() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextFieldRoot>
        <TextFieldDecorator>
          <Avatar
            size="xs"
            smallSrc="https://cdn.discordapp.com/emojis/1093923016691421205.png?size=240&quality=lossless"
            src="https://mochi.gg/logo.png"
          />
        </TextFieldDecorator>
        <TextFieldInput placeholder="Search the docs…" />
      </TextFieldRoot>

      <TextFieldRoot size="lg">
        <TextFieldDecorator>
          <DiscordColored />
        </TextFieldDecorator>
        <TextFieldInput placeholder="Search the docs…" />
      </TextFieldRoot>

      <TextFieldRoot disabled>
        <TextFieldDecorator>
          <Slack />
        </TextFieldDecorator>
        <TextFieldInput placeholder="Search the docs…" />
      </TextFieldRoot>

      <TextFieldRoot error>
        <TextFieldInput placeholder="Search the docs…" />
        <TextFieldDecorator>
          <PasswordLockColored />
        </TextFieldDecorator>
      </TextFieldRoot>
    </div>
  )
}
