import { Meta, StoryObj } from '@storybook/react'
import { ContentEditable } from '../src'

const meta: Meta<typeof ContentEditable> = {
  title: 'Form/ContentEditable',
  component: ContentEditable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ContentEditable>

export const Default: Story = {
  render: (props) => <ContentEditable {...props} />,
  args: {
    placeholder: 'This is a content editable',
    disabled: false,
  },
}
