import { Meta, StoryObj } from '@storybook/react'

import {
  Step,
  StepContent,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepTitle,
  Stepper,
  StepperProps,
} from '../src'

const meta: Meta<typeof Stepper> = {
  title: 'Data display/Stepper',
  component: Stepper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: {
        type: 'number',
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      },
    },
    isError: {
      control: {
        type: 'boolean',
      },
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      table: {
        defaultValue: 'vertical',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Stepper>

const Template = (args: StepperProps) => {
  const steps = [
    { title: 'First', description: 'Contact Info' },
    { title: 'Second', description: 'Date & Time' },
    { title: 'Third', description: 'Select Rooms' },
  ]

  return (
    <div>
      <Stepper {...args}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator />
            <StepContent>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </StepContent>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export const Default: Story = {
  render: Template,
  args: {},
}
