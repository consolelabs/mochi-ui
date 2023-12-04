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

const schemes = [
  'primary',
  'secondary',
  'warning',
  'success',
  'danger',
  'neutral',
] as NonNullable<AlertProps['scheme']>[]
const variants = ['default', 'outlined', 'action'] as NonNullable<
  AlertProps['variant'][]
>

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
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
    variant: {
      control: 'select',
      options: variants,
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    responsive: {
      control: 'select',
      options: ['auto', 'shrink', 'expand'],
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
        <AlertTitle>labore adipisicing minim sint</AlertTitle>
        <AlertDescription>
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          cillum sint consectetur cupidatat.
        </AlertDescription>
        <AlertLink href="#">View More</AlertLink>
        <AlertCloseButton />
      </Alert>
    )
  },
}

export const Variants: Story = {
  render() {
    return (
      <div className="flex flex-col gap-3">
        {variants.map((v) => (
          <Alert variant={v}>
            <AlertIcon />
            <AlertTitle>
              amet, qui minim labore adipisicing minim sint cillum sint
            </AlertTitle>
            <AlertDescription>
              amet, qui minim labore adipisicing minim sint cillum sint
              consectetur cupidatat.
            </AlertDescription>
            {v === 'action' && (
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
        {variants.map((v) => (
          <div className="flex flex-col gap-3">
            <h3 className="uppercase semibold ">{v}</h3>
            {schemes.map((s) => (
              <Alert variant={v} scheme={s}>
                <AlertIcon />
                <AlertTitle>Lorem ipsum dolor sit amet</AlertTitle>
                <AlertDescription>
                  Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
                  sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit
                  amet, qui minim labore adipisicing minim sint cillum sint
                  consectetur cupidatat.
                </AlertDescription>
                <AlertCloseButton />
                {v === 'action' && (
                  <AlertActionGroup>
                    <AlertCancelButton>Confirm</AlertCancelButton>
                    <AlertConfirmButton>Confirm</AlertConfirmButton>
                  </AlertActionGroup>
                )}
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
      <Alert scheme="neutral" variant="action">
        <AlertTitle>Consololab UI Library</AlertTitle>
        <AlertIcon asChild className="data-[scheme=secondary]:text-black">
          <UserSolid />
        </AlertIcon>
        <AlertDescription>
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          cillum sint consectetur cupidatat. Lorem ipsum dolor sit
        </AlertDescription>
        <AlertActionGroup>
          <AlertConfirmButton asChild>
            <Button>Confirm</Button>
          </AlertConfirmButton>
        </AlertActionGroup>
      </Alert>
    )
  },
}
