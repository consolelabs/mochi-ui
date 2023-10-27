import type { Meta, StoryObj } from '@storybook/react'
import { IconConnectWallets } from '../icons'
import Button from './button'

const meta: Meta<typeof Button> = {
  title: 'ui/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary-1',
        'secondary-2',
        'secondary-3',
        'danger',
      ],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Connect Wallet',
  },
}

export function Primary() {
  const sizes = ['small', 'medium', 'large'] as const

  return (
    <div className="space-y-4">
      {sizes.map((size) => (
        <div className="flex space-x-2" key={size}>
          <Button size={size}>Connect Wallet</Button>
          <Button size={size}>
            Connect Wallet <IconConnectWallets height={16} width={16} />
          </Button>
          <Button size={size}>
            <IconConnectWallets height={16} width={16} /> Connect Wallet
          </Button>
        </div>
      ))}
    </div>
  )
}

export function Secondary1() {
  const sizes = ['small', 'medium', 'large'] as const
  const variant = 'secondary-1'

  return (
    <div className="space-y-4">
      {sizes.map((size) => (
        <div className="flex space-x-2" key={size}>
          <Button size={size} variant={variant}>
            Connect Wallet
          </Button>
          <Button size={size} variant={variant}>
            Connect Wallet <IconConnectWallets height={16} width={16} />
          </Button>
          <Button size={size} variant={variant}>
            <IconConnectWallets height={16} width={16} /> Connect Wallet
          </Button>
        </div>
      ))}
    </div>
  )
}

export function Secondary2() {
  const sizes = ['small', 'medium', 'large'] as const
  const variant = 'secondary-2'

  return (
    <div className="space-y-4">
      {sizes.map((size) => (
        <div className="flex space-x-2" key={size}>
          <Button size={size} variant={variant}>
            Connect Wallet
          </Button>
          <Button size={size} variant={variant}>
            Connect Wallet <IconConnectWallets height={16} width={16} />
          </Button>
          <Button size={size} variant={variant}>
            <IconConnectWallets height={16} width={16} /> Connect Wallet
          </Button>
        </div>
      ))}
    </div>
  )
}

export function Secondary3() {
  const sizes = ['small', 'medium', 'large'] as const
  const variant = 'secondary-3'

  return (
    <div className="space-y-4">
      {sizes.map((size) => (
        <div className="flex space-x-2" key={size}>
          <Button size={size} variant={variant}>
            Connect Wallet
          </Button>
          <Button size={size} variant={variant}>
            Connect Wallet <IconConnectWallets height={16} width={16} />
          </Button>
          <Button size={size} variant={variant}>
            <IconConnectWallets height={16} width={16} /> Connect Wallet
          </Button>
        </div>
      ))}
    </div>
  )
}

export function Danger() {
  const sizes = ['small', 'medium', 'large'] as const
  const variant = 'danger'

  return (
    <div className="space-y-4">
      {sizes.map((size) => (
        <div className="flex space-x-2" key={size}>
          <Button size={size} variant={variant}>
            Connect Wallet
          </Button>
          <Button size={size} variant={variant}>
            Connect Wallet <IconConnectWallets height={16} width={16} />
          </Button>
          <Button size={size} variant={variant}>
            <IconConnectWallets height={16} width={16} /> Connect Wallet
          </Button>
        </div>
      ))}
    </div>
  )
}
