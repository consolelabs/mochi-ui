import type { Meta, StoryObj } from '@storybook/react'
import {
  LoginWidget,
  LoginWidgetProvider,
  useLoginWidget,
} from '../src/login-widget'

const meta: Meta<typeof LoginWidget> = {
  title: 'Components/LoginWidget',
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

function Wrapper() {
  const state = useLoginWidget()

  return (
    <div className="flex flex-col gap-y-2 items-center">
      <LoginWidget onSuccess={() => {}} />
      <code
        style={{ height: 500, width: 1000 }}
        className="overflow-auto p-2 text-sm bg-gray-50"
      >
        <pre>
          {JSON.stringify(
            state,
            (key, value) => {
              if (key !== 'providers') return value
              if (!value.length) return value
              return '...'
            },
            2,
          )}
        </pre>
      </code>
    </div>
  )
}

function Widget() {
  return (
    <LoginWidgetProvider>
      <Wrapper />
    </LoginWidgetProvider>
  )
}

export const Default: Story = {
  render: Widget,
}
