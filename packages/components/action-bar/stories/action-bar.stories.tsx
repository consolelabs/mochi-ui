import type { Meta, StoryObj } from '@storybook/react'
import { ActionBar } from '../src/action-bar'
import { ActionBarTrigger } from '../src/action-bar-trigger'
import {
  ActionBarContent,
  type ActionBarContentProps,
} from '../src/action-bar-content'
import { ActionBarTitle } from '../src/action-bar-title'
import { ActionBarBody } from '../src/action-bar-body'
import { ActionBarDescription } from '../src/action-bar-description'
import { ActionBarActionGroup } from '../src/action-bar-action-group'
import { ActionBarConfirmButton } from '../src/action-bar-confirm'
import { ActionBarCancelButton } from '../src/action-bar-cancel'
import { ActionBarIcon } from '../src/action-bar-icon'

const schemes = [
  'primary',
  'secondary',
  'warning',
  'success',
  'danger',
  'neutral',
] as NonNullable<ActionBarContentProps['scheme']>[]
const layouts = ['inline', 'stack', 'auto'] as NonNullable<
  ActionBarContentProps['layout'][]
>

const meta: Meta<typeof ActionBarContent> = {
  title: 'Feedback/ActionBar',
  component: ActionBarContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    scheme: {
      control: 'select',
      options: schemes,
    },
    layout: {
      control: 'select',
      options: layouts,
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    paddingSize: {
      control: 'select',
      options: ['large', 'default'],
    },
  },
}

export default meta

type Story = StoryObj<typeof ActionBar>

export const Default: Story = {
  render(props) {
    return (
      <div className="relative w-[600px] h-[400px] border">
        <div className="h-full w-full overflow-y-auto flex flex-col items-center p-4">
          <ActionBar>
            <ActionBarTrigger asChild>
              <button>Trigger Actionbar</button>
            </ActionBarTrigger>
            <ActionBarContent {...props}>
              <ActionBarIcon />
              <ActionBarBody>
                <ActionBarTitle>labore adipisicing minim sint</ActionBarTitle>
                <ActionBarDescription>
                  Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
                  sint cillum sint consectetur cupidatat.
                </ActionBarDescription>
              </ActionBarBody>
              <ActionBarActionGroup>
                <ActionBarCancelButton>Cancel</ActionBarCancelButton>
                <ActionBarConfirmButton>Confirm</ActionBarConfirmButton>
              </ActionBarActionGroup>
            </ActionBarContent>
          </ActionBar>
          <div className="h-[1000px] shrink-0" />
        </div>
      </div>
    )
  },
}
