import type { Meta, StoryObj } from '@storybook/react'
import { UserSolid } from '@mochi-ui/icons'
import { Button } from '@mochi-ui/button'
import { Alert, AlertProps } from '../src/alert'
import { AlertTitle } from '../src/alert-title'
import { AlertIcon } from '../src'
import { AlertDescription } from '../src/alert-description'
import { AlertCloseButton } from '../src/alert-close'
import { AlertActionGroup } from '../src/alert-action-group'
import { AlertConfirmButton } from '../src/alert-confirm'
import { AlertCancelButton } from '../src/alert-cancel'
import { AlertLink } from '../src/alert-link'
import { AlertBody } from '../src/alert-body'

const schemes = [
  'primary',
  'secondary',
  'warning',
  'success',
  'danger',
  'neutral',
] as NonNullable<AlertProps['scheme']>[]
const layouts = ['inline', 'stack', 'auto'] as NonNullable<
  AlertProps['layout'][]
>

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      type: 'string',
      control: 'text',
    },
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

type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render(props) {
    return (
      <Alert {...props}>
        <AlertIcon />
        <AlertBody>
          <AlertTitle>labore adipisicing minim sint</AlertTitle>
          <AlertDescription>
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </AlertDescription>
          <AlertLink href="#">View More</AlertLink>
        </AlertBody>
        <AlertCloseButton />
      </Alert>
    )
  },
}

export const Layout: Story = {
  render() {
    return (
      <div className="flex flex-col gap-3">
        {layouts.map((v) => (
          <Alert layout={v}>
            <AlertIcon />
            <AlertBody>
              <AlertTitle>
                amet, qui minim labore adipisicing minim sint cillum sint
              </AlertTitle>
              <AlertDescription>
                amet, qui minim labore adipisicing minim sint cillum sint
                consectetur cupidatat.
              </AlertDescription>
            </AlertBody>
            <AlertCloseButton />
            {v === 'inline' && (
              <AlertActionGroup>
                <AlertConfirmButton>Confirm</AlertConfirmButton>
              </AlertActionGroup>
            )}
          </Alert>
        ))}
      </div>
    )
  },
}

export const Colors: Story = {
  render() {
    return (
      <div className="flex flex-col gap-3">
        {layouts.map((l) => (
          <div className="flex flex-col gap-3">
            <h3 className="uppercase semibold ">{l}</h3>
            {schemes.map((s) => (
              <Alert layout={l} scheme={s}>
                <AlertIcon />
                <AlertBody>
                  <AlertTitle>Lorem ipsum dolor sit amet</AlertTitle>
                  <AlertDescription>
                    Lorem ipsum dolor sit amet, qui minim labore adipisicing
                    minim sint cillum sint consectetur cupidatat. Lorem ipsum
                    dolor sit amet, qui minim labore adipisicing minim sint
                    cillum sint consectetur cupidatat.
                  </AlertDescription>
                </AlertBody>
                <AlertActionGroup>
                  <AlertCancelButton asChild>
                    <a href="/#">Cancel</a>
                  </AlertCancelButton>
                  <AlertConfirmButton>Confirm</AlertConfirmButton>
                </AlertActionGroup>
                <AlertCloseButton />
              </Alert>
            ))}
          </div>
        ))}
      </div>
    )
  },
}

export const Custom: Story = {
  render() {
    return (
      <Alert scheme="neutral" layout="inline">
        <AlertIcon asChild className="data-[scheme=secondary]:text-black">
          <UserSolid />
        </AlertIcon>
        <AlertBody>
          <AlertTitle>Consololab UI Library</AlertTitle>
          <AlertDescription>
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat. Lorem ipsum dolor sit
          </AlertDescription>
        </AlertBody>
        <AlertActionGroup>
          <AlertConfirmButton asChild>
            <Button>Confirm</Button>
          </AlertConfirmButton>
        </AlertActionGroup>
      </Alert>
    )
  },
}
