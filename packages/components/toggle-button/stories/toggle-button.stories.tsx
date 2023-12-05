import { Meta, StoryObj } from '@storybook/react'
import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonProps,
} from '../src/toggle-button'

const meta: Meta<typeof ToggleButtonGroup> = {
  title: 'Form/ToggleButtonGroup',
  component: ToggleButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    type: 'single',
    disabled: false,
    defaultChecked: false,
    className: '',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    defaultChecked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    defaultValue: {
      control: 'string',
    },
    rovingFocus: {
      control: 'boolean',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    loop: {
      control: 'boolean',
    },
  },
}

export default meta

export const Default: StoryObj<typeof ToggleButtonGroup> = {
  render() {
    return (
      <div className="flex flex-col gap-4">
        <ToggleButtonGroup type="single" defaultValue="2">
          <ToggleButton value="1">$1</ToggleButton>
          <ToggleButton value="2">$2</ToggleButton>
          <ToggleButton value="5">$5</ToggleButton>
          <ToggleButton disabled value="4">
            $4
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    )
  },
}

export const Colors: StoryObj<typeof ToggleButtonGroup> = {
  render() {
    const appearances: ToggleButtonProps['appearance'][] = [
      'primary',
      'secondary',
      'neutral',
      'success',
      'warning',
      'danger',
    ]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {appearances.map((a) => (
          <ToggleButtonGroup type="single" defaultValue="5">
            <ToggleButton appearance={a} value="1">
              $1
            </ToggleButton>
            <ToggleButton appearance={a} value="2">
              $2
            </ToggleButton>
            <ToggleButton appearance={a} value="3" disabled>
              $3
            </ToggleButton>
          </ToggleButtonGroup>
        ))}
      </div>
    )
  },
}

export const Sizes: StoryObj<typeof ToggleButtonGroup> = {
  render() {
    const sizes: ToggleButtonProps['size'][] = ['sm', 'md', 'lg']

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {sizes.map((size) => (
          <ToggleButtonGroup type="single" defaultValue="5">
            <ToggleButton size={size} value="1">
              $1
            </ToggleButton>
            <ToggleButton size={size} value="2">
              $2
            </ToggleButton>
            <ToggleButton size={size} value="3" disabled>
              $3
            </ToggleButton>
          </ToggleButtonGroup>
        ))}
      </div>
    )
  },
}

export const Disabled: StoryObj<typeof ToggleButtonGroup> = {
  render() {
    return (
      <ToggleButtonGroup type="single" defaultValue="5" disabled>
        <ToggleButton value="1">$1</ToggleButton>
        <ToggleButton value="2">$2</ToggleButton>
        <ToggleButton value="3">$3</ToggleButton>
      </ToggleButtonGroup>
    )
  },
}
