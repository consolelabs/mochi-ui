import type { Meta, StoryObj } from '@storybook/react'
import { GameSolid, QuestsSolid } from '@mochi-ui/icons'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../src/accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Disclosure/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    type: 'single',
    collapsible: true,
    className: 'max-w-md',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: (props) => {
    return (
      <Accordion {...props}>
        <AccordionItem value="2">
          <AccordionTrigger leftIcon={<QuestsSolid />}>
            Server Management
          </AccordionTrigger>
          <AccordionContent>
            Yes, you can try us for free for 30 days. Our friendly team will
            work with you to get you up and running as soon as possible.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger leftIcon={<GameSolid />}>
            Game Store
          </AccordionTrigger>
          <AccordionContent hasPadding>PodTown</AccordionContent>
          <AccordionContent hasPadding>Tripple Pod</AccordionContent>
          <AccordionContent hasPadding>Lottery Tower</AccordionContent>
        </AccordionItem>
        <AccordionItem value="4">
          <AccordionTrigger>Servers</AccordionTrigger>
          <AccordionContent className="!py-0">
            <div className="py-2">Server 0</div>
            <div className="py-2">Server 1</div>
            <div className="py-2">Server 2</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  },
}
