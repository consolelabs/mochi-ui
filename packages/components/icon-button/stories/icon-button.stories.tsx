import type { Meta, StoryObj } from '@storybook/react'
import { ArrowRightLine } from '@mochi-ui/icons'
import IconButton, { IconButtonProps } from '../src/icon-button'

const colors: IconButtonProps['color'][] = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'neutral',
  'info',
]
const variants: IconButtonProps['variant'][] = [
  'solid',
  'outline',
  'ghost',
  'link',
]

const meta: Meta<typeof IconButton> = {
  title: 'components/IconButton',
  component: IconButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    disabled: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: variants,
    },
    color: {
      control: 'select',
      options: colors,
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    children: <ArrowRightLine height={20} width={20} />,
  },
}

export const Colors: Story = {
  render() {
    return (
      <div className="grid grid-cols-4 gap-4">
        {colors.map((color) =>
          variants.map((variant) => (
            <div className="flex items-center justify-center w-full h-10">
              <IconButton
                key={`${color}_${variant}`}
                color={color}
                variant={variant}
              >
                <ArrowRightLine height={20} width={20} />
              </IconButton>
            </div>
          )),
        )}
      </div>
    )
  },
}

export const Disabled: Story = {
  render() {
    return (
      <div className="grid grid-cols-4 gap-4">
        {colors.map((color) =>
          variants.map((variant) => (
            <div className="flex items-center justify-center w-full h-10">
              <IconButton
                key={`${color}_${variant}`}
                color={color}
                variant={variant}
                disabled
              >
                <ArrowRightLine height={20} width={20} />
              </IconButton>
            </div>
          )),
        )}
      </div>
    )
  },
}
