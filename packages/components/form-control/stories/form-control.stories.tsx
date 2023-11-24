import { StoryObj, Meta } from '@storybook/react'
import { Input } from '@consolelabs/input'
import { UserSolid } from '@consolelabs/icons'
import { FormControl } from '../src'
import { FormLabel } from '../src/form-label'
import { FormHelperText } from '../src/form-helper-text'

const meta: Meta<typeof FormControl> = {
  title: 'Components/FormControl',
  component: FormControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof FormControl>

export const Default: Story = {
  render(props) {
    return (
      <FormControl {...props}>
        <FormLabel>Username</FormLabel>
        <Input.Root>
          <Input.Slot>
            <UserSolid />
          </Input.Slot>
          <Input.InputField />
        </Input.Root>
        <FormHelperText>This is helper text</FormHelperText>
      </FormControl>
    )
  },
}
