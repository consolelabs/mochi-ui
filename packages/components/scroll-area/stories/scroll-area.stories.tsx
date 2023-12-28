import { Meta } from '@storybook/react'
import clsx from 'clsx'
import { ScrollArea, ScrollAreaProps } from '../src'

const meta: Meta<typeof ScrollArea> = {
  title: 'Layout/ScrollArea',
  component: ScrollArea,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    scrollbars: {
      defaultValue: 'both',
      control: {
        type: 'radio',
        options: ['vertical', 'horizontal', 'both'],
      },
    },
  },
}

export default meta

export function Default({ scrollbars }: ScrollAreaProps) {
  return (
    <ScrollArea
      rootProps={{
        className: 'w-96 h-96',
      }}
    >
      <div
        className={clsx(
          'grid min-w-max gap-4',
          scrollbars === 'horizontal' ? 'grid-cols-2' : 'grid-cols-1',
        )}
      >
        <div className="w-80">
          <p>What is Lorem Ipsum?</p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="w-80">
          <p>Where does it come from?</p>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source.
          </p>
        </div>
      </div>
    </ScrollArea>
  )
}
