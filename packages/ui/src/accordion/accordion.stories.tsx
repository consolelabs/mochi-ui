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
    className: 'ui-max-w-md',
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
                    <AccordionTrigger leftIcon={<IconQuests/>}> 
                        Server Management
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes, you can try us for free for 30 days. Our friendly team will work with you to get you up and running as soon as possible.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="3">
                    <AccordionTrigger leftIcon={<IconGame/>}>
                        Game Store
                    </AccordionTrigger>
                    <AccordionContent hasPadding>
                        PodTown
                    </AccordionContent>
                    <AccordionContent hasPadding>
                        Tripple Pod
                    </AccordionContent>
                    <AccordionContent hasPadding>
                        Lottery Tower
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="4">
                    <AccordionTrigger>
                        Servers
                    </AccordionTrigger>
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
    }
}
