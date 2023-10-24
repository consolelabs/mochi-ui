import type { Meta, StoryObj } from '@storybook/react'
import Alert from './alert'

const meta: Meta<typeof Alert> = {
  title: 'Example/Alert',
  component: Alert,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    title: {
      type: 'string',
      control: 'text',
    },
    children: {
      type: 'string',
      control: 'text',
    },
    appearance: {
      control: 'select',
      options: ['info', 'warn', 'success', 'error'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Info: Story = {
  args: {
    appearance: 'info',
    title: 'Alert title',
    children:
      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
  },
}

export const Warn: Story = {
  args: {
    appearance: 'warn',
    title: 'Alert title',
    children:
      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
  },
}

export const Success: Story = {
  args: {
    appearance: 'success',
    title: 'Alert title',
    children:
      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
  },
}

export const Error: Story = {
  args: {
    appearance: 'error',
    title: 'Alert title',
    children:
      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
  },
}
