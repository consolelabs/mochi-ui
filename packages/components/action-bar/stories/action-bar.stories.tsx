import type { Meta, StoryObj } from '@storybook/react'
import { ActionBar } from '../src/action-bar'
import { ActionBarTrigger } from '../src/action-bar-trigger'
import { ActionBarContent } from '../src/action-bar-content'
import { ActionBarTitle } from '../src/action-bar-title'
import { ActionBarBody } from '../src/action-bar-body'
import { ActionBarDescription } from '../src/action-bar-description'
// import { ActionBarActionGroup } from '../src/action-bar-action-group'
// import { ActionBarConfirmButton } from '../src/action-bar-confirm'
// import { ActionBarCancelButton } from '../src/action-bar-cancel'
import { ActionBarCloseButton } from '../src/action-bar-close'

const meta: Meta<typeof ActionBar> = {
  title: 'Feedback/ActionBar',
  component: ActionBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      type: 'string',
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof ActionBar>

export const Default: Story = {
  render() {
    return (
      <ActionBar>
        <ActionBarTrigger>Trigger</ActionBarTrigger>
        <ActionBarContent>
          <ActionBarBody>
            <ActionBarTitle>LoresumLoresum Loresum</ActionBarTitle>
            <ActionBarDescription>
              Loresum Loresum Loresum Loresum Loresum Loresum Loresum Loresum
              cpoLoresum
            </ActionBarDescription>
          </ActionBarBody>
          {/* <ActionBarActionGroup>
            <ActionBarCancelButton>Cancel</ActionBarCancelButton>
            <ActionBarConfirmButton>Confirm</ActionBarConfirmButton>
          </ActionBarActionGroup> */}
          <ActionBarCloseButton />
        </ActionBarContent>
      </ActionBar>
    )
  },
}
