import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import LoginWidget from './login-widget'

const meta: Meta<typeof LoginWidget> = {
  title: 'ui/LoginWidget',
  component: LoginWidget,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof LoginWidget>

function Widget() {
  const [open, setOpen] = useState(false)

  return (
    <LoginWidget onOpenChange={setOpen} onSuccess={console.log} open={open} />
  )
}

export const Default: Story = {
  render: Widget,
}
