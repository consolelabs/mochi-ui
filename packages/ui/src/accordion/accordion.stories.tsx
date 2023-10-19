import type { Meta, StoryObj } from '@storybook/react'
import IconQuests from '../icons/components/icon-quests'
import IconGame from '../icons/components/icon-game'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './accordion'

const meta: Meta<typeof Accordion> = {
  title: 'ui/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    type: 'single',
    collapsible: true,
    className: 'ui-px-3 ui-rounded-lg ui-shadow-md ui-divide-y ui-max-w-md',
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
          <AccordionTrigger className="ui-gap-3">
            <IconQuests fontSize={20} />
            Server Management
          </AccordionTrigger>
          <AccordionContent>
            Yes, you can try us for free for 30 days. Our friendly team will
            work with you to get you up and running as soon as possible.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger className="ui-gap-3">
            <IconGame fontSize={20} />
            Game Store
          </AccordionTrigger>
          <AccordionContent>
            <ul className="ui-space-y-3">
              <li>Pod Town</li>
              <li>Triple Pod</li>
              <li>Lottery Tower</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="4">
          <AccordionTrigger>Servers</AccordionTrigger>
          <AccordionContent>
            <ul className="ui-space-y-3">
              <li>Server 0</li>
              <li>Server 1</li>
              <li>Server 2</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  },
}
