import type { Meta } from '@storybook/react'
import { MinusLine, PlusLine } from '@mochi-ui/icons'
import { ValueChange, ValueChangeIndicator } from '../src'

const meta: Meta = {
  title: 'Data & Display/ValueChange',
  component: ValueChange,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const Default = {
  render: () => {
    return (
      <div className="gap-4 flex">
        <ValueChange trend="up">
          <ValueChangeIndicator />
          40%
        </ValueChange>

        <ValueChange trend="down">
          <ValueChangeIndicator />
          10%
        </ValueChange>
      </div>
    )
  },
}

export const CustomIndicator = {
  render: () => {
    return (
      <div className="gap-4 flex">
        <ValueChange trend="up" className="!gap-0.5">
          <ValueChangeIndicator>
            <PlusLine className="h-3 w-3" />
          </ValueChangeIndicator>
          $10,214.21
        </ValueChange>

        <ValueChange trend="down" className="!gap-0.5">
          <ValueChangeIndicator>
            <MinusLine className="h-2 w-2" />
          </ValueChangeIndicator>
          $0.001
        </ValueChange>
      </div>
    )
  },
}
