import { StoryObj, Meta } from '@storybook/react'
import { Input } from '@consolelabs/input'
import { UserSolid } from '@consolelabs/icons'
import { FormControl } from '../src'

const meta: Meta<typeof FormControl> = {
  title: 'Components/FormControl',
  component: FormControl,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof FormControl>

export const Default: Story = {
  render() {
    return (
      <FormControl>
        <label>This is label Text</label>
        <Input.Root>
          <Input.Slot>
            <UserSolid />
          </Input.Slot>
          <Input.InputField />
        </Input.Root>
      </FormControl>
    )
  },
}
